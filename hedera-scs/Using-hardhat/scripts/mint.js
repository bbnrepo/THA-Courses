async function main() {
    const [deployer] = await ethers.getSigners();
    
    // Get the ContractFactory of your MyToken ERC-721 contract
    const MyToken = await ethers.getContractFactory("MyToken", deployer);
    
    // Connect to the deployed contract 
    // (REPLACE WITH YOUR CONTRACT ADDRESS)
    const contractAddress = "0xCd6b7EDdE6Dc2a0CcD5202518F2b4180859502D0";
    const contract = await MyToken.attach(contractAddress);
    
    // Mint a token to ourselves
    const mintTx = await contract.safeMint(deployer.address);
    const receipt = await mintTx.wait();
    const mintedTokenId = receipt.logs[0].topics[3];
    console.log('Minted token ID:', mintedTokenId);
    
    // Check the balance of the token
    const balance = await contract.balanceOf(deployer.address);
    console.log('Balance:', balance.toString(), "NFTs");
}

main().catch(console.error);

// $ npx hardhat run scripts/mint.js --network testnet
// [dotenv@17.2.0] injecting env (2) from .env (tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild)
// [dotenv@17.2.0] injecting env (0) from .env (tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`)
// Minted token ID: 0x0000000000000000000000000000000000000000000000000000000000000000
// Balance: 1 NFTs