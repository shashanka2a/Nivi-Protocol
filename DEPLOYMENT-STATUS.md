# Deployment Status

## Current Configuration

- **Wallet Address**: `0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df`
- **Network**: Aptos Devnet
- **Module Name**: `license_token`
- **Full Module Path**: `0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df::license_token`

## Deployment Command

To deploy the contract, run:

```bash
aptos move publish \
  --named-addresses nivi_addr=0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df \
  --assume-yes \
  --private-key 0x93e17a437a8130267cfa1ba70d75efb913182c5571169c795102bf71f409edfb \
  --max-gas 100000
```

Or use the npm script:

```bash
APTOS_PRIVATE_KEY=0x93e17a437a8130267cfa1ba70d75efb913182c5571169c795102bf71f409edfb npm run deploy-contract
```

## Rate Limit Issue

If you encounter rate limit errors, wait a few minutes and try again, or use an API key for the Aptos node.

## Files Updated

- ✅ `Move.toml` - Updated address
- ✅ `scripts/deploy.ts` - Updated address
- ✅ `src/components/CreatorStudio.tsx` - Updated to use new address and correct module name
- ✅ All deployment scripts updated

## Next Steps

1. Wait for rate limit to reset (if applicable)
2. Run deployment command
3. Update README.md with deployment transaction hash after successful deployment

