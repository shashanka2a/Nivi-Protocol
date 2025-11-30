# Deploy Nivi Protocol Contract to Aptos Testnet

## Prerequisites

1. **Install Aptos CLI:**
   ```bash
   # macOS/Linux
   curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
   
   # Or using Homebrew (macOS)
   brew install aptos
   
   # Verify installation
   aptos --version
   ```

2. **Create Aptos Account:**
   ```bash
   # Create a new account for testnet
   aptos init --network testnet
   ```
   
   This will:
   - Generate a new account
   - Fund it with testnet APT (via faucet)
   - Save credentials to `~/.aptos/config.yaml`

## Deployment Steps

### 1. Initialize Move Project

```bash
# Navigate to your project root
cd /Users/shashank/Downloads/Nivi\ Protocol

# Create Move.toml if it doesn't exist
aptos move init --name nivi_protocol --address nivi
```

### 2. Create Move.toml Configuration

Create or update `Move.toml` in your project root:

```toml
[package]
name = "nivi_protocol"
version = "1.0.0"

[addresses]
nivi = "YOUR_ACCOUNT_ADDRESS"  # Replace with your account address from `aptos init`

[dependencies.AptosFramework]
git = "https://github.com/aptos-labs/aptos-core.git"
rev = "mainnet"
subdir = "aptos-move/framework/aptos-framework"
```

### 3. Update Contract Address

Update `sources/nivi.move` to use your address:

```move
module nivi::license_token {
    // ... rest of the code
}
```

Make sure the module name matches your address in `Move.toml`.

### 4. Compile the Contract

```bash
# Compile to check for errors
aptos move compile --named-addresses nivi=YOUR_ACCOUNT_ADDRESS
```

### 5. Test the Contract (Optional)

```bash
# Run tests if you have any
aptos move test --named-addresses nivi=YOUR_ACCOUNT_ADDRESS
```

### 6. Deploy to Testnet

```bash
# Deploy the contract
aptos move publish \
  --named-addresses nivi=YOUR_ACCOUNT_ADDRESS \
  --network testnet \
  --assume-yes
```

This will:
- Compile the contract
- Sign the transaction with your account
- Submit to Aptos testnet
- Return the transaction hash

### 7. Verify Deployment

After deployment, you'll get a transaction hash. Verify it:

```bash
# View transaction details
aptos account list --account YOUR_ACCOUNT_ADDRESS --network testnet

# Or check on Aptos Explorer
# https://explorer.aptoslabs.com/txn/YOUR_TX_HASH?network=testnet
```

### 8. Update Frontend Code

Update `src/components/CreatorStudio.tsx` with your deployed module address:

```typescript
// Replace this line:
const moduleAddress = AccountAddress.fromString(accountAddress);

// With your deployed address:
const moduleAddress = AccountAddress.fromString("YOUR_DEPLOYED_ADDRESS");
```

## Quick Deployment Script

Create `scripts/deploy-contract.sh`:

```bash
#!/bin/bash

# Get account address from config
ACCOUNT=$(aptos config show-profiles --profile default | grep "account" | awk '{print $2}')

echo "Deploying Nivi Protocol contract..."
echo "Account: $ACCOUNT"
echo "Network: testnet"

aptos move publish \
  --named-addresses nivi=$ACCOUNT \
  --network testnet \
  --assume-yes

echo "Deployment complete!"
echo "Update CreatorStudio.tsx with address: $ACCOUNT"
```

Make it executable:
```bash
chmod +x scripts/deploy-contract.sh
./scripts/deploy-contract.sh
```

## Troubleshooting

### Error: Account not found
```bash
# Fund your account with testnet APT
aptos account fund-with-faucet --account default --amount 100000000
```

### Error: Module address mismatch
- Make sure the address in `Move.toml` matches your account address
- Update `--named-addresses` flag to use your account address

### Error: Insufficient gas
```bash
# Request more testnet APT
aptos account fund-with-faucet --account default --amount 100000000
```

## Post-Deployment

1. **Save your module address** - You'll need it in the frontend
2. **Test the contract** - Call `mint_license` function
3. **Update frontend** - Replace module address in `CreatorStudio.tsx`
4. **Verify on Explorer** - Check your contract on Aptos Explorer

## Example Transaction

After deployment, test minting a license:

```bash
aptos move run \
  --function-id "$ACCOUNT::nivi::mint_license" \
  --args vector:0x686173685f78797a, u8:99, u64:1000000000 \
  --network testnet
```

Where:
- `vector:0x686173685f78797a` = lineageId bytes (hex)
- `u8:99` = trustScore
- `u64:1000000000` = monthlyFee in octas (10 APT)

## Resources

- [Aptos CLI Documentation](https://aptos.dev/tools/aptos-cli/)
- [Aptos Move Guide](https://aptos.dev/move/move-on-aptos/)
- [Aptos Testnet Explorer](https://explorer.aptoslabs.com/?network=testnet)
- [Aptos Testnet Faucet](https://faucet.testnet.aptoslabs.com/)

