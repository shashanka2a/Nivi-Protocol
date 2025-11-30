#!/bin/bash

# Deploy Nivi Protocol Contract to Aptos Testnet
# Usage: ./scripts/deploy-contract.sh

set -e

echo "🚀 Deploying Nivi Protocol Contract to Aptos Testnet"
echo ""

# Check if aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo "❌ Aptos CLI not found. Please install it first:"
    echo "   curl -fsSL 'https://aptos.dev/scripts/install_cli.py' | python3"
    exit 1
fi

# Get account address from config
ACCOUNT=$(aptos config show-profiles --profile default 2>/dev/null | grep "account" | awk '{print $2}' || echo "")

if [ -z "$ACCOUNT" ]; then
    echo "⚠️  No default profile found. Initializing..."
    aptos init --network testnet
    ACCOUNT=$(aptos config show-profiles --profile default | grep "account" | awk '{print $2}')
fi

echo "📋 Account: $ACCOUNT"
echo "🌐 Network: testnet"
echo ""

# Check if account has funds
BALANCE=$(aptos account list --account $ACCOUNT --network testnet 2>/dev/null | grep "APT" | awk '{print $1}' || echo "0")

if [ "$BALANCE" = "0" ] || [ -z "$BALANCE" ]; then
    echo "💰 Funding account with testnet APT..."
    aptos account fund-with-faucet --account default --amount 100000000
    echo ""
fi

# Check if Move.toml exists
if [ ! -f "Move.toml" ]; then
    echo "📝 Creating Move.toml..."
    aptos move init --name nivi_protocol --address nivi
    echo ""
fi

# Update Move.toml with account address
if [ -f "Move.toml" ]; then
    # Update the address in Move.toml
    sed -i.bak "s/nivi = \".*\"/nivi = \"$ACCOUNT\"/" Move.toml 2>/dev/null || \
    sed -i '' "s/nivi = \".*\"/nivi = \"$ACCOUNT\"/" Move.toml
fi

# Compile first to check for errors
echo "🔨 Compiling contract..."
aptos move compile --named-addresses nivi=$ACCOUNT || {
    echo "❌ Compilation failed. Please fix errors and try again."
    exit 1
}
echo "✅ Compilation successful"
echo ""

# Deploy
echo "📤 Deploying to testnet..."
aptos move publish \
  --named-addresses nivi=$ACCOUNT \
  --network testnet \
  --assume-yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Update src/components/CreatorStudio.tsx with your module address:"
echo "      const moduleAddress = AccountAddress.fromString(\"$ACCOUNT\");"
echo ""
echo "   2. Verify on Aptos Explorer:"
echo "      https://explorer.aptoslabs.com/account/$ACCOUNT?network=testnet"
echo ""

