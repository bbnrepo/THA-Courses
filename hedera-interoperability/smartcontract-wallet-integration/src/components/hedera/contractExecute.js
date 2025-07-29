import abi from "../../contracts/abi.js";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function contractExecuteFcn(walletData, contractAddress) {
	console.log(`\n=======================================`);
	console.log(`- Executing the smart contract...🟠`);

	let txHash;
	let finalCount;

	try {
		const gasLimit = 100000;

		// SETUP PROVIDER AND SIGNER
		const browserProvider = new ethers.BrowserProvider(window.ethereum);
		const signer = await browserProvider.getSigner();

		// CHECK SMART CONTRACT STATE (before execution)
		const initialCount = await getCountState();
		console.log(`- Initial count: ${initialCount}`);

		// EXECUTE CONTRACT FUNCTION
		const myContract = new ethers.Contract(contractAddress, abi, signer);
		const incrementTx = await myContract.increment({ gasLimit });
		const receipt = await incrementTx.wait();
		txHash = receipt.hash;

		// WAIT TO ALLOW MIRROR NODE TO SYNC
		await delay(5000);

		// CHECK SMART CONTRACT STATE (after execution)
		finalCount = await getCountState();
		console.log(`- Final count: ${finalCount}`);
		console.log(`- Contract executed. Transaction hash: \n${txHash} ✅`);
	} catch (executeError) {
		console.log(`- ${executeError.message}`);
	}

	return [txHash, finalCount];

	// === Inner function to get contract state ===
	async function getCountState() {
		let countDec = 0;
		try {
			const response = await fetch(
				`https://${walletData[2]}.mirrornode.hedera.com/api/v1/contracts/${contractAddress}/state`
			);
			const countInfo = await response.json();

			if (countInfo.state && countInfo.state[0]?.value) {
				const countHex = countInfo.state[0].value;
				countDec = parseInt(countHex, 16);
			}
		} catch (e) {
			console.log("- Error fetching contract state:", e.message);
		}
		return countDec;
	}
}

export default contractExecuteFcn;
