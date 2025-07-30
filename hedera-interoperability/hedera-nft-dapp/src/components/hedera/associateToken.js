import { BrowserProvider, Contract, id, Interface } from "ethers";

// Hedera Token Service (HTS) System Contract Address
const HTS_SYSTEM_CONTRACT = "0x167";

// Interface for associateToken(address account, address token)
const htsAbi = [
  "function associateToken(address account, address token) external returns (int64)"
];

// Convert Hedera token ID to EVM-style address
function hederaTokenIdToEvmAddress(tokenId) {

  // Extract the numeric part (assumes input like "0.0.12345")
  const parts = tokenId.split(".");
  const num = parseInt(parts[2], 10);

  // Convert to hex and pad to 40 chars
  const hex = num.toString(16).padStart(40, "0");
  const add = `0x${hex}`
          console.log("EVMADDRESS",add);
  // Return with 0x prefix
  return `0x${hex}`;
}
async function getAssociatedTokens(accountId) {
  const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}/tokens`);
  const data = await response.json();
  return data.tokens;
}


export async function associateToken() {
  try {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const tokenId = "0.0.5661109";
    const tokenAddress = hederaTokenIdToEvmAddress(tokenId);

    const contract = new Contract(tokenAddress, htsAbi, signer);

    console.log(`Associating token ${tokenId} for account ${userAddress}`);

    const tx = await contract.associateToken(userAddress, tokenAddress, {
      gasLimit: 300000
    });

    const receipt = await tx.wait();
    console.log("✅ Token association successful:", receipt.hash);
  } catch (err) {
    console.error("❌ Error during token association:", err);
  }
}
