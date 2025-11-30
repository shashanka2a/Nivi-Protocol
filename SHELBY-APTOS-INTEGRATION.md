# Shelby x Aptos Integration

## ✅ Implementation Complete

### 1. **Shelby AI Service** (`src/services/shelby.ts`)

- ✅ Hashes uploaded files using SHA-256
- ✅ Returns mocked async response after 2-second delay
- ✅ Response format: `{ verified: true, trustScore: 99, lineageId: "hash_xyz" }`

**Usage:**
```typescript
import { verify } from '@/services/shelby';

const result = await verify(file);
// Returns: { verified: true, trustScore: 99, lineageId: "hash_..." }
```

### 2. **Move Contract** (`sources/nivi.move`)

- ✅ `LicenseToken` struct stores `lineageId` and `trustScore` from Shelby
- ✅ `mint_license` function accepts lineageId as strict argument
- ✅ Proves on-chain authenticity using Shelby verification data

**Key Functions:**
- `mint_license(creator, lineage_id, trust_score, monthly_fee)` - Mints license with Shelby data
- `verify_license(creator, license_id, expected_lineage_id)` - Verifies authenticity
- `get_license(creator, license_id)` - Retrieves license data

### 3. **Frontend Logic** (`src/components/CreatorStudio.tsx`)

- ✅ **State Flow:**
  - `verificationState`: "idle" | "scanning" | "verified" | "error"
  - `verificationResult`: Stores Shelby response (lineageId, trustScore)
  - Mint button **disabled** until `shelby.verify()` returns success

- ✅ **File Upload:**
  - Real file input with video file selection
  - Calls `shelby.verify(file)` on upload
  - 2-second scanning delay as per spec

### 4. **Aptos Wallet Integration**

- ✅ Uses `@aptos-labs/wallet-adapter-react` for wallet connection
- ✅ Constructs transaction payload for `mint_license`
- ✅ Passes `lineageId` as strict argument (converted to bytes)
- ✅ Signs and submits transaction via wallet

**Transaction Payload:**
```typescript
{
  function: `${moduleAddress}::nivi::mint_license`,
  typeArguments: [],
  functionArguments: [
    Array.from(lineageIdBytes),  // lineageId from Shelby
    trustScore,                  // trustScore from Shelby
    monthlyFeeOctas,            // License fee in octas
  ],
}
```

### 5. **UI Feedback**

- ✅ **Pulsing Gold Shield Animation** during "AI Analysis" phase:
  - Gold shield icon with pulsing scale animation
  - Glowing effect with blur
  - Smooth transitions

- ✅ **Verified Badge** after verification:
  - Green checkmark with yellow shield badge
  - "Verified" hallmark badge
  - Displays trust score and lineage ID

- ✅ **Wallet Connection Prompt:**
  - Shows info message if wallet not connected
  - Mint button disabled until wallet connected AND verification complete

## 🎯 User Flow

1. **Upload Video** → File selected
2. **AI Analysis** → Pulsing gold shield animation (2 seconds)
3. **Verification Complete** → Verified badge appears with trust score
4. **Connect Wallet** → Aptos wallet connection (if not connected)
5. **Mint License** → Transaction signed and submitted
6. **Success** → Confetti animation + transaction hash displayed

## 📁 Files Created/Modified

### New Files:
- `src/services/shelby.ts` - Shelby AI service
- `sources/nivi.move` - Move contract with LicenseToken
- `src/lib/aptos/wallet.tsx` - Aptos wallet adapter setup

### Modified Files:
- `src/components/CreatorStudio.tsx` - Full integration with state flow
- `src/app/layout.tsx` - Added AptosWalletProvider wrapper

## 🔧 Configuration

### Move Contract Deployment:
1. Deploy `sources/nivi.move` to Aptos
2. Update module address in `CreatorStudio.tsx`:
   ```typescript
   const moduleAddress = AccountAddress.fromString("YOUR_DEPLOYED_ADDRESS");
   ```

### Network Configuration:
Currently set to `Network.DEVNET`. Configured in `CreatorStudio.tsx`:
```typescript
const aptosConfig = new AptosConfig({ network: Network.DEVNET });
```

## 🚀 Next Steps

1. **Deploy Move Contract:**
   ```bash
   aptos move publish --named-addresses nivi=YOUR_ADDRESS
   ```

2. **Update Module Address:**
   - Replace module address in `CreatorStudio.tsx` with deployed address

3. **Test Integration:**
   - Upload a video file
   - Verify Shelby verification works
   - Connect Aptos wallet
   - Mint license NFT

4. **Production:**
   - Replace mocked Shelby service with real API
   - Update network to MAINNET
   - Add error handling and retry logic

## 📝 Notes

- **Shelby Service**: Currently mocked. Replace `verify()` function with actual API call in production.
- **Move Contract**: Uses simplified timestamp. In production, use proper timestamp module.
- **Wallet Adapter**: Auto-detects installed wallets (Petra, Pontem, etc.)
- **Transaction Fees**: ~0.01 APT as estimated in UI

## ✨ Features

- ✅ Real file upload and hashing
- ✅ Shelby AI verification integration
- ✅ Pulsing gold shield animation
- ✅ Verified badge with trust score
- ✅ Aptos wallet connection
- ✅ On-chain license minting
- ✅ Transaction confirmation
- ✅ Error handling

All requirements from the 5 precise lines have been implemented! 🎉

