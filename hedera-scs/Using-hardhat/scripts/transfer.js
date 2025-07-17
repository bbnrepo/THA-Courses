const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();


    // Get the recipient address from command-line args
    const recipientAddress = "0x00000000000000000000000000000000004b6b8a";
    const tokenId = process.argv[3]; // Optional: pass tokenId as well

    if (!recipientAddress) {
        console.error("Please provide a recipient address as the first argument.");
        process.exit(1);
    }

    const tokenIdToTransfer = tokenId || 0; // default to tokenId 0 if not provided

    const MyToken = await ethers.getContractFactory("MyToken", deployer);

    const contractAddress = "0xCd6b7EDdE6Dc2a0CcD5202518F2b4180859502D0";
    const contract = await MyToken.attach(contractAddress);

    console.log(`Transferring tokenId ${tokenIdToTransfer} to ${recipientAddress}`);

    const transferTx = await contract["safeTransferFrom(address,address,uint256)"](
        deployer.address,
        recipientAddress,
        tokenIdToTransfer
    );

    await transferTx.wait();

    console.log(`Token ID ${tokenIdToTransfer} transferred to ${recipientAddress}`);

    const newOwner = await contract.ownerOf(tokenIdToTransfer);
    console.log("New owner of token:", newOwner);
}

main().catch(console.error);

// $ npx hardhat run scripts/transfer.js --network testnet
// [dotenv@17.2.0] injecting env (2) from .env (tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] })
// [dotenv@17.2.0] injecting env (0) from .env (tip: ⚙️  enable debug logging with { debug: true })
// Transferring tokenId 0 to 0x00000000000000000000000000000000004b6b8a
// ✅ Token ID 0 transferred to 0x00000000000000000000000000000000004b6b8a
// New owner of token: 0x00000000000000000000000000000000004b6B8A
