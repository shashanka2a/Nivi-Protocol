# Nivi Protocol - Next.js Application

A production-ready Next.js application for the Nivi Protocol platform, featuring content verification, minting, and rental capabilities.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Getting Started

### Installation

Install all dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

Start the production server:

```bash
npm start
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout with fonts and metadata
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── ui/          # UI component library
│   │   └── ...          # Feature components
│   ├── data/            # Mock data and types
│   └── styles/          # Global styles
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript support
- ✅ Tailwind CSS v4
- ✅ ESLint configuration
- ✅ Optimized font loading with `next/font`
- ✅ Image optimization with `next/image`
- ✅ Client components properly marked
- ✅ SEO metadata configured
- ✅ Production-ready build configuration

## Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Notes

- All client components are marked with `"use client"` directive
- Images use Next.js Image component for optimization
- Fonts are loaded via `next/font` for optimal performance
- ESLint is configured to ignore during builds (can be adjusted)

## 🚀 Smart Contract Deployment

### Aptos Devnet Contract

- **Contract Address**: `0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df`
- **Module Name**: `license_token`
- **Full Module Path**: `0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df::license_token`
- **Network**: Aptos Devnet

### Contract Explorer Links

Once deployed, the contract will be available at:

- **Account Explorer**: [View Account on Aptos Explorer](https://explorer.aptoslabs.com/account/0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df?network=devnet)
- **Module Explorer**: [View Module Code](https://explorer.aptoslabs.com/account/0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df/modules/code/license_token?network=devnet)

**Note**: The contract is configured and ready for deployment. Deploy using the commands below.

### Contract Functions

- `mint_license(creator, lineage_id, trust_score, monthly_fee)` - Mint a new license token with Shelby verification data
- `get_license(creator, license_id)` - Get license details by ID
- `verify_license(creator, license_id, expected_lineage_id)` - Verify license authenticity using lineage ID
- `deactivate_license(creator, license_id)` - Deactivate a license

### Deployment Instructions

**Prerequisites**: The account must have sufficient APT balance for gas fees (~0.01 APT).

#### Step 1: Fund the Account (if needed)

Fund the account from the Aptos Devnet faucet:

```bash
# Option 1: Using Aptos CLI
aptos account fund-with-faucet \
  --account 0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df \
  --amount 100000000 \
  --faucet-url https://faucet.devnet.aptoslabs.com

# Option 2: Use the web faucet
# Visit: https://faucet.devnet.aptoslabs.com/
# Enter address: 0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df
```

#### Step 2: Deploy the Contract

```bash
# Option 1: Using Aptos CLI
aptos move publish \
  --named-addresses nivi_addr=0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df \
  --assume-yes \
  --private-key 0x93e17a437a8130267cfa1ba70d75efb913182c5571169c795102bf71f409edfb \
  --max-gas 100000

# Option 2: Using npm script
APTOS_PRIVATE_KEY=0x93e17a437a8130267cfa1ba70d75efb913182c5571169c795102bf71f409edfb npm run deploy-contract
```

**Note**: 
- If you encounter rate limit errors, wait 5-10 minutes for the rate limit to reset (40000 compute units per 300 seconds window)
- Alternatively, configure an API key for the Aptos node to avoid rate limits
- The contract address is pre-configured, so once deployed it will be immediately available at the links above
- Check account balance: `aptos account list --account 0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df`

**Current Status**: 
- ⚠️ Account needs funding (check balance with: `aptos account list --account 0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df`)
- ⏳ Rate limit may be active (40000 compute units per 300 seconds)
- 📦 Contract is compiled and ready to deploy (2972 bytes)
- 🔑 API Key available: Use `--node-api-key` flag to bypass rate limits (if configured)

### Contract Source

- **Move Contract**: `sources/nivi.move`
- **Move Configuration**: `Move.toml`
- **Deployed Network**: Aptos Devnet

### Frontend Integration

The frontend is already configured to use this contract address. See `src/components/CreatorStudio.tsx` for the integration.

## License

Private - All rights reserved
