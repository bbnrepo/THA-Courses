import { ethers } from "ethers";
import abi from "../../contracts/abi.js";

async function tokenAssociateFcn(walletData, tokenAddress) {
	console.log(`\n=======================================`);
	console.log(`- Associating token...🟠`);

	let txHash;
	let outText;

	try {
		const gasLimit = 1000000;

		// Use correct provider and signer
		const browserProvider = new ethers.BrowserProvider(window.ethereum);
		const signer = await browserProvider.getSigner();

		// Create contract instance
		const myContract = new ethers.Contract(tokenAddress, abi, signer);
		const associateTx = await myContract.associate({ gasLimit });
		const associateRx = await associateTx.wait();

		txHash = associateRx.hash;
		outText = "🔗Token association complete ✅";
		console.log(`- Done! Here's the transaction hash: \n${txHash} ✅`);
	} catch (deployError) {
		console.log(`- ${deployError.message}`);
	}

	return [txHash, outText];
}

export default tokenAssociateFcn;
