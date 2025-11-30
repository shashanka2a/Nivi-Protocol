#!/bin/bash

# Simple deployment script for Nivi Protocol contract
# Account is already funded

set -e

ACCOUNT="0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df"
NETWORK="devnet"

echo "🚀 Deploying Nivi Protocol Contract"
echo "Account: $ACCOUNT"
echo "Network: $NETWORK"
echo ""

# Deploy
echo "📤 Publishing contract..."
DEPLOY_OUTPUT=$(aptos move publish \
    --named-addresses nivi=$ACCOUNT \
    --assume-yes 2>&1)

echo "$DEPLOY_OUTPUT"

# Extract transaction hash
TX_HASH=$(echo "$DEPLOY_OUTPUT" | grep -i "transaction" | grep -oE '[0-9a-f]{64}' | head -1)

if [ -z "$TX_HASH" ]; then
    TX_HASH=$(echo "$DEPLOY_OUTPUT" | grep -oE '[0-9a-f]{64}' | head -1)
fi

if [ -z "$TX_HASH" ]; then
    echo "❌ Could not extract transaction hash"
    exit 1
fi

echo ""
echo "✅ Deployment successful!"
echo "Transaction: $TX_HASH"
echo ""

# Update README
echo "📝 Updating README.md..."

DEPLOYMENT_SECTION="## 🚀 Smart Contract Deployment

### Aptos Devnet

- **Contract Address**: \`$ACCOUNT\`
- **Module Name**: \`nivi::license_token\`
- **Deployment Transaction**: [View on Explorer](https://explorer.aptoslabs.com/txn/$TX_HASH?network=devnet)
- **Account Explorer**: [View Account](https://explorer.aptoslabs.com/account/$ACCOUNT?network=devnet)

### Contract Functions

- \`mint_license(creator, lineage_id, trust_score, monthly_fee)\` - Mint a new license token with Shelby verification data
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

# Remove old deployment section if exists
if grep -q "## 🚀 Smart Contract Deployment" README.md; then
    # Find line numbers
    START_LINE=$(grep -n "## 🚀 Smart Contract Deployment" README.md | cut -d: -f1)
    if [ ! -z "$START_LINE" ]; then
        # Find next ## section
        END_LINE=$(tail -n +$((START_LINE+1)) README.md | grep -n "^## " | head -1 | cut -d: -f1)
        if [ ! -z "$END_LINE" ]; then
            END_LINE=$((START_LINE + END_LINE - 1))
            # Delete old section and insert new one
            sed -i.bak "${START_LINE},${END_LINE}d" README.md
            sed -i.bak "${START_LINE}i\\
$DEPLOYMENT_SECTION
" README.md
        else
            # No next section, replace to end
            sed -i.bak "${START_LINE},\$d" README.md
            echo "$DEPLOYMENT_SECTION" >> README.md
        fi
        rm -f README.md.bak
    fi
else
    # Append to README
    echo "" >> README.md
    echo "$DEPLOYMENT_SECTION" >> README.md
fi

echo "✅ README.md updated"
echo ""
echo "🔗 Explorer: https://explorer.aptoslabs.com/txn/$TX_HASH?network=devnet"

