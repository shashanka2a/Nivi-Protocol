#!/bin/bash

# Deploy Nivi Protocol Smart Contract to Aptos Testnet
# This script will:
# 1. Check/initialize Aptos CLI
# 2. Fund the account if needed
# 3. Compile the contract
# 4. Deploy to testnet
# 5. Update README with deployed address

set -e

echo "🚀 Nivi Protocol Contract Deployment Script"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo -e "${RED}❌ Aptos CLI not found.${NC}"
    echo "Please install it first:"
    echo "  brew install aptos"
    exit 1
fi

echo -e "${GREEN}✅ Aptos CLI found${NC}"
echo ""

# Get or create account
ACCOUNT=$(aptos config show-profiles --profile default 2>/dev/null | grep "account" | awk '{print $2}' | tr -d '",' || echo "")

# Use provided address
ACCOUNT="0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df"
NETWORK="devnet"

# Clean account address
ACCOUNT=$(echo "$ACCOUNT" | tr -d '", ')

echo "📋 Account Address: $ACCOUNT"
echo "🌐 Network: $NETWORK"
echo ""

# Try to fund account from devnet faucet
echo "💰 Attempting to fund account from devnet faucet..."
aptos account fund-with-faucet \
    --account $ACCOUNT \
    --amount 100000000 \
    --faucet-url https://faucet.devnet.aptoslabs.com 2>&1 | grep -v "Error" || {
    echo -e "${YELLOW}⚠️  Faucet request failed or account already funded${NC}"
}

echo ""

# Ensure Move.toml exists with correct address
if [ ! -f "Move.toml" ]; then
    echo "📝 Creating Move.toml..."
    aptos move init --name nivi_protocol --address nivi
fi

# Update Move.toml with account address
echo "📝 Updating Move.toml with account address..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/nivi = \".*\"/nivi = \"$ACCOUNT\"/" Move.toml 2>/dev/null || true
else
    # Linux
    sed -i "s/nivi = \".*\"/nivi = \"$ACCOUNT\"/" Move.toml 2>/dev/null || true
fi

# Add address if not present
if ! grep -q "nivi = " Move.toml; then
    echo "" >> Move.toml
    echo "[addresses]" >> Move.toml
    echo "nivi = \"$ACCOUNT\"" >> Move.toml
fi

# Update dependencies to use testnet
if grep -q 'rev = "mainnet"' Move.toml; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' 's/rev = "mainnet"/rev = "testnet"/' Move.toml
    else
        sed -i 's/rev = "mainnet"/rev = "testnet"/' Move.toml
    fi
fi

echo -e "${GREEN}✅ Move.toml configured${NC}"
echo ""

# Compile contract
echo "🔨 Compiling contract..."
if aptos move compile --named-addresses nivi=$ACCOUNT 2>&1 | tee /tmp/compile.log; then
    echo -e "${GREEN}✅ Compilation successful${NC}"
    echo ""
else
    echo -e "${RED}❌ Compilation failed. Check errors above.${NC}"
    exit 1
fi

# Deploy contract
echo "📤 Deploying contract to devnet..."
echo ""

DEPLOY_OUTPUT=$(aptos move publish \
    --named-addresses nivi=$ACCOUNT \
    --network devnet \
    --assume-yes 2>&1)

echo "$DEPLOY_OUTPUT"

# Extract transaction hash
TX_HASH=$(echo "$DEPLOY_OUTPUT" | grep -i "transaction hash" | grep -oE '[0-9a-f]{64}' | head -1 || echo "")

if [ -z "$TX_HASH" ]; then
    TX_HASH=$(echo "$DEPLOY_OUTPUT" | grep -oE '"hash":"[0-9a-f]{64}"' | grep -oE '[0-9a-f]{64}' | head -1 || echo "")
fi

if [ -z "$TX_HASH" ]; then
    # Try to find any 64-char hex string
    TX_HASH=$(echo "$DEPLOY_OUTPUT" | grep -oE '[0-9a-f]{64}' | head -1 || echo "")
fi

if [ -z "$TX_HASH" ]; then
    echo -e "${RED}❌ Could not extract transaction hash from deployment output${NC}"
    echo "Deployment output saved above. Please check manually."
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deployment successful!${NC}"
echo ""
echo "📊 Deployment Details:"
echo "   Account: $ACCOUNT"
echo "   Transaction Hash: $TX_HASH"
echo "   Explorer URL: https://explorer.aptoslabs.com/txn/$TX_HASH?network=devnet"
echo "   Module Address: $ACCOUNT"
echo ""

# Update README
echo "📝 Updating README.md with deployment information..."

# Create deployment info section
DEPLOYMENT_INFO="## 🚀 Smart Contract Deployment

### Aptos Devnet

- **Contract Address**: \`$ACCOUNT\`
- **Module Name**: \`nivi::license_token\`
- **Deployment Transaction**: [View on Explorer](https://explorer.aptoslabs.com/txn/$TX_HASH?network=devnet)
- **Account Explorer**: [View Account](https://explorer.aptoslabs.com/account/$ACCOUNT?network=devnet)

### Contract Functions

- \`mint_license(creator, lineage_id, trust_score, monthly_fee)\` - Mint a new license token
- \`get_license(creator, license_id)\` - Get license details
- \`verify_license(creator, license_id, expected_lineage_id)\` - Verify license authenticity
- \`deactivate_license(creator, license_id)\` - Deactivate a license

### Usage in Frontend

Update \`src/components/CreatorStudio.tsx\`:

\`\`\`typescript
const moduleAddress = AccountAddress.fromString(\"$ACCOUNT\");
\`\`\`

### Contract Source

- **Move Contract**: \`sources/nivi.move\`
- **Deployed Network**: Aptos Devnet
- **Last Deployed**: $(date +"%Y-%m-%d %H:%M:%S UTC")"

# Check if README already has deployment section
if grep -q "## 🚀 Smart Contract Deployment" README.md; then
    # Update existing section
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' '/## 🚀 Smart Contract Deployment/,/### Contract Source/{ 
            /### Contract Source/r /dev/stdin
            d
        }' README.md <<< "$DEPLOYMENT_INFO"
    else
        # Linux - more complex sed needed
        awk -v info="$DEPLOYMENT_INFO" '
            /## 🚀 Smart Contract Deployment/ { 
                print; 
                print ""; 
                print info; 
                skip=1; 
                next 
            } 
            skip && /^## / { skip=0 } 
            !skip 
        ' README.md > README.md.tmp && mv README.md.tmp README.md
    fi
else
    # Append to README
    echo "" >> README.md
    echo "$DEPLOYMENT_INFO" >> README.md
fi

echo -e "${GREEN}✅ README.md updated${NC}"
echo ""

# Summary
echo "============================================"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "============================================"
echo ""
echo "📋 Summary:"
echo "   ✅ Contract deployed to Aptos Testnet"
echo "   ✅ Module address: $ACCOUNT"
echo "   ✅ Transaction: $TX_HASH"
echo "   ✅ README.md updated"
echo ""
echo "🔗 Links:"
echo "   Explorer: https://explorer.aptoslabs.com/txn/$TX_HASH?network=devnet"
echo "   Account: https://explorer.aptoslabs.com/account/$ACCOUNT?network=devnet"
echo ""
echo "📝 Next Steps:"
echo "   1. Update CreatorStudio.tsx with module address: $ACCOUNT"
echo "   2. Test minting a license through the UI"
echo "   3. Verify transactions on Aptos Explorer"
echo ""

