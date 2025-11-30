#!/bin/bash

# Deploy contract and update README
# Usage: ./scripts/deploy-and-update.sh

set -e

ACCOUNT="0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df"

echo "🚀 Deploying Nivi Protocol Contract to Aptos Devnet"
echo "Account: $ACCOUNT"
echo ""

# Deploy
echo "📤 Publishing contract..."
DEPLOY_OUTPUT=$(aptos move publish --named-addresses nivi_addr=$ACCOUNT 2>&1)

echo "$DEPLOY_OUTPUT"

# Extract transaction hash - try multiple patterns
TX_HASH=""
TX_HASH=$(echo "$DEPLOY_OUTPUT" | grep -i "transaction hash" | grep -oE '[0-9a-f]{64}' | head -1)

if [ -z "$TX_HASH" ]; then
    TX_HASH=$(echo "$DEPLOY_OUTPUT" | grep -oE '"hash":"[0-9a-f]{64}"' | grep -oE '[0-9a-f]{64}' | head -1)
fi

if [ -z "$TX_HASH" ]; then
    # Look for any 64-char hex string
    TX_HASH=$(echo "$DEPLOY_OUTPUT" | grep -oE '[0-9a-f]{64}' | head -1)
fi

if [ -z "$TX_HASH" ]; then
    echo ""
    echo "⚠️  Could not extract transaction hash automatically"
    echo "Please check the output above and update README manually"
    echo "Account: $ACCOUNT"
    exit 0
fi

echo ""
echo "✅ Deployment successful!"
echo "Transaction Hash: $TX_HASH"
echo ""

# Update README
echo "📝 Updating README.md..."

DEPLOYMENT_SECTION="## 🚀 Smart Contract Deployment

### Aptos Devnet

- **Contract Address**: \`$ACCOUNT\`
- **Module Name**: \`nivi_addr::license_token\`
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

# Check if deployment section exists
if grep -q "## 🚀 Smart Contract Deployment" README.md; then
    # Find and replace existing section
    # Use a temporary file approach for better compatibility
    awk -v section="$DEPLOYMENT_SECTION" '
        /^## 🚀 Smart Contract Deployment/ {
            print section
            skip=1
            next
        }
        skip && /^## / {
            skip=0
        }
        !skip
    ' README.md > README.md.tmp && mv README.md.tmp README.md
else
    # Append to README
    echo "" >> README.md
    echo "$DEPLOYMENT_SECTION" >> README.md
fi

echo "✅ README.md updated"
echo ""
echo "============================================"
echo "🎉 Deployment Complete!"
echo "============================================"
echo ""
echo "📋 Summary:"
echo "   Contract Address: $ACCOUNT"
echo "   Transaction Hash: $TX_HASH"
echo "   Network: Devnet"
echo ""
echo "🔗 Links:"
echo "   Transaction: https://explorer.aptoslabs.com/txn/$TX_HASH?network=devnet"
echo "   Account: https://explorer.aptoslabs.com/account/$ACCOUNT?network=devnet"
echo ""
echo "📝 Next: Update CreatorStudio.tsx with address: $ACCOUNT"
echo ""

