async function main() {
  // Get the signer of the tx and address for minting the token
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // The deployer will also be the owner of our NFT contract
  const MyToken = await ethers.getContractFactory("MyToken", deployer);
  const contract = await MyToken.deploy(deployer.address);

  console.log("Contract deployed at:", contract.address);//if contract.address doesnt work try contract.target 

}

main().catch(console.error);
// $ npx hardhat run scripts/deploy.js --network testnet
// Deploying contracts with the account: 0x8867Fd959Dc59Bcb2059796D414937614Ec790A1
// Contract deployed at: 0xCd6b7EDdE6Dc2a0CcD5202518F2b4180859502D0