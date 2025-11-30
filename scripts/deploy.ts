import { Aptos, AptosConfig, Account, Network, AccountAddress, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import fs from "fs";
import path from "path";

const config = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(config);

// Use the provided account address
const ACCOUNT_ADDRESS = "0xc6391b805ccbfe053003d9f3cbcbd5e6b839dc4d2b41b98336c1bbbde91421df";

async function main() {
  console.log("🚀 Deploying Nivi Protocol Contract to Aptos Devnet");
  console.log("");

  // First, compile the contract to get the build files
  console.log("📦 Compiling Move contract...");
  const { execSync } = require("child_process");
  
  try {
    execSync(
      `aptos move compile --named-addresses nivi_addr=${ACCOUNT_ADDRESS}`,
      { stdio: "inherit" }
    );
    console.log("✅ Compilation successful\n");
  } catch (error) {
    console.error("❌ Compilation failed");
    process.exit(1);
  }

  // Read the compiled files
  const buildDir = path.join(process.cwd(), "build", "nivi_protocol");
  const bytecodeModulesDir = path.join(buildDir, "bytecode_modules");

  if (!fs.existsSync(bytecodeModulesDir)) {
    console.error(`❌ Bytecode modules directory not found: ${bytecodeModulesDir}`);
    process.exit(1);
  }

  console.log("📄 Reading compiled files...");
  
  // Read all bytecode modules
  const moduleFiles = fs.readdirSync(bytecodeModulesDir)
    .filter((file) => file.endsWith(".mv"))
    .map((file) => ({
      name: file,
      data: fs.readFileSync(path.join(bytecodeModulesDir, file)),
    }));

  if (moduleFiles.length === 0) {
    console.error(`❌ No bytecode modules found in ${bytecodeModulesDir}`);
    process.exit(1);
  }

  console.log(`   Found ${moduleFiles.length} module(s): ${moduleFiles.map(m => m.name).join(", ")}`);
  
  // Generate package metadata
  // The SDK needs metadata, but we can create a minimal one or use the CLI
  // For now, let's use aptos move publish which handles everything
  console.log("📦 Generating package metadata...");
  
  // Use aptos CLI to generate the full package (including metadata)
  // This is simpler than manually creating metadata
  try {
    execSync(
      `aptos move build --named-addresses nivi_addr=${ACCOUNT_ADDRESS}`,
      { stdio: "inherit" }
    );
  } catch (error) {
    console.error("❌ Failed to build package with metadata");
    process.exit(1);
  }

  // Now try to find the metadata file
  const metadataPath = path.join(buildDir, "package-metadata.bcs");
  let moduleData: Buffer;
  
  if (fs.existsSync(metadataPath)) {
    moduleData = fs.readFileSync(metadataPath);
    console.log("✅ Metadata file found");
  } else {
    // If metadata still doesn't exist, we'll create an empty one
    // The SDK might generate it, but let's try with empty first
    console.log("⚠️  Metadata file not found, using empty metadata (SDK will generate)");
    moduleData = Buffer.alloc(0);
  }
  
  const moduleBytecode = moduleFiles.map(m => m.data);

  // Get account from private key or create new one
  // For now, we'll need the private key - you can load it from .aptos/config.yaml
  // Or use Account.fromPrivateKey() if you have the private key
  
  console.log("🔑 Loading account...");
  console.log("   Address:", ACCOUNT_ADDRESS);
  
  // Load account from private key
  // Priority: 1. Environment variable, 2. Aptos config file
  let account: Account;
  let privateKeyHex: string | undefined;

  // Try environment variable first
  if (process.env.APTOS_PRIVATE_KEY) {
    privateKeyHex = process.env.APTOS_PRIVATE_KEY;
    console.log("✅ Using private key from APTOS_PRIVATE_KEY environment variable");
  } else {
    // Try to read from Aptos config
    try {
      const configPath = path.join(process.env.HOME || "~", ".aptos", "config.yaml");
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, "utf-8");
        const privateKeyMatch = configContent.match(/private_key:\s*"([^"]+)"/);
        if (privateKeyMatch) {
          privateKeyHex = privateKeyMatch[1];
          console.log("✅ Using private key from Aptos config");
        }
      }
    } catch (error) {
      // Ignore config file errors
    }
  }

  if (!privateKeyHex) {
    console.error("❌ Private key not found!");
    console.error("");
    console.error("Please provide your private key in one of these ways:");
    console.error("  1. Set APTOS_PRIVATE_KEY environment variable:");
    console.error("     export APTOS_PRIVATE_KEY=your_private_key_hex");
    console.error("  2. Run: aptos init --network devnet");
    console.error("");
    console.error("To get your private key for address", ACCOUNT_ADDRESS + ":");
    console.error("  aptos account list --account", ACCOUNT_ADDRESS);
    process.exit(1);
  }

  try {
    const privateKey = new Ed25519PrivateKey(privateKeyHex);
    account = Account.fromPrivateKey({ privateKey });
    
    console.log("   Address:", account.accountAddress.toString());
    
    // Verify account address matches
    if (account.accountAddress.toString() !== ACCOUNT_ADDRESS) {
      console.error(`❌ Account address mismatch!`);
      console.error(`   Expected: ${ACCOUNT_ADDRESS}`);
      console.error(`   Got: ${account.accountAddress.toString()}`);
      console.error("");
      console.error("Please use the private key for the correct account.");
      process.exit(1);
    }
    console.log("");
  } catch (error: any) {
    console.error("❌ Invalid private key:", error.message);
    process.exit(1);
  }

  // Deploy
  console.log("📤 Publishing package to devnet...");
  try {
    // Read all bytecode modules
    const bytecodeModulesDir = path.join(buildDir, "bytecode_modules");
    const moduleFiles = fs.readdirSync(bytecodeModulesDir)
      .filter((file) => file.endsWith(".mv"))
      .map((file) => fs.readFileSync(path.join(bytecodeModulesDir, file)));

    console.log(`   Found ${moduleFiles.length} module(s)`);

    // Create package metadata manually or use the SDK's helper
    // For now, we'll use publishPackageTransaction which accepts raw bytecode
    const transaction = await aptos.publishPackageTransaction({
      account: account.accountAddress,
      metadataBytes: Buffer.alloc(0), // Empty metadata - SDK will generate
      moduleBytecode: moduleFiles,
    });

    // Sign and submit
    const senderAuthenticator = aptos.transaction.sign({
      signer: account,
      transaction,
    });

    const pendingTxn = await aptos.transaction.submit.simple({
      transaction,
      senderAuthenticator,
    });

    console.log("⏳ Waiting for transaction...");
    const executedTxn = await aptos.waitForTransaction({
      transactionHash: pendingTxn.hash,
    });

    console.log("");
    console.log("✅ Deployment successful!");
    console.log("");
    console.log("📊 Deployment Details:");
    console.log("   Account:", ACCOUNT_ADDRESS);
    console.log("   Transaction Hash:", executedTxn.hash);
    console.log("   Explorer URL: https://explorer.aptoslabs.com/txn/" + executedTxn.hash + "?network=devnet");
    console.log("");

    // Update README
    updateREADME(ACCOUNT_ADDRESS, executedTxn.hash);

  } catch (error: any) {
    console.error("❌ Deployment failed:", error.message);
    if (error.message?.includes("INSUFFICIENT_BALANCE")) {
      console.error("   Please fund your account: https://faucet.devnet.aptoslabs.com/");
    }
    process.exit(1);
  }
}

function updateREADME(account: string, txHash: string) {
  console.log("📝 Updating README.md...");

  const deploymentSection = `## 🚀 Smart Contract Deployment

### Aptos Devnet

- **Contract Address**: \`${account}\`
- **Module Name**: \`nivi_addr::license_token\`
- **Deployment Transaction**: [View on Explorer](https://explorer.aptoslabs.com/txn/${txHash}?network=devnet)
- **Account Explorer**: [View Account](https://explorer.aptoslabs.com/account/${account}?network=devnet)

### Contract Functions

- \`mint_license(creator, lineage_id, trust_score, monthly_fee)\` - Mint a new license token with Shelby verification data
- \`get_license(creator, license_id)\` - Get license details
- \`verify_license(creator, license_id, expected_lineage_id)\` - Verify license authenticity
- \`deactivate_license(creator, license_id)\` - Deactivate a license

### Usage in Frontend

Update \`src/components/CreatorStudio.tsx\`:

\`\`\`typescript
const moduleAddress = AccountAddress.fromString("${account}");
\`\`\`

### Contract Source

- **Move Contract**: \`sources/nivi.move\`
- **Deployed Network**: Aptos Devnet
- **Last Deployed**: ${new Date().toISOString()}`;

  const readmePath = path.join(process.cwd(), "README.md");
  let readmeContent = fs.readFileSync(readmePath, "utf-8");

  // Remove old deployment section if exists
  if (readmeContent.includes("## 🚀 Smart Contract Deployment")) {
    const startIndex = readmeContent.indexOf("## 🚀 Smart Contract Deployment");
    const nextSection = readmeContent.indexOf("\n## ", startIndex + 1);
    if (nextSection !== -1) {
      readmeContent =
        readmeContent.slice(0, startIndex) +
        deploymentSection +
        "\n\n" +
        readmeContent.slice(nextSection);
    } else {
      readmeContent =
        readmeContent.slice(0, startIndex) + deploymentSection;
    }
  } else {
    readmeContent += "\n\n" + deploymentSection;
  }

  fs.writeFileSync(readmePath, readmeContent);
  console.log("✅ README.md updated");
  console.log("");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

