import abi from "../../contracts/abi.js";
import bytecode from "../../contracts/bytecode.js";
import { ContractFactory, ethers } from "ethers";

async function contractDeployFcn(walletData) {
	console.log(`\n=======================================`);
	console.log(`- Deploying smart contract on Hedera...🟠`);

	let contractAddress;
	try {
		const gasLimit = 4000000;

		// Setup provider and signer properly
		const browserProvider = new ethers.BrowserProvider(window.ethereum);
		const signer = await browserProvider.getSigner();

		// Deploy the contract
		const myContract = new ContractFactory(abi, bytecode, signer);
		const contractDeployTx = await myContract.deploy({ gasLimit });
		const contractDeployRx = await contractDeployTx.waitForDeployment();
		console.log("TRn",contractDeployRx)
		contractAddress = contractDeployRx.target;

		console.log(`- Contract deployed to address: \n${contractAddress} ✅`);
	} catch (deployError) {
		console.log(`- ${deployError.message}`);
	}
	return contractAddress;
}

export default contractDeployFcn;
