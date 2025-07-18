// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Script, console} from "forge-std/Script.sol";
import {HederaToken} from "../src/HederaToken.sol";

contract HederaTokenScript is Script {
    function run() external returns (address) {
        // Load the private key from the .env file
        uint256 deployerPrivateKey = vm.envUint("OPERATOR_KEY");
        
        // Start broadcasting transactions with the loaded private key
        vm.startBroadcast(deployerPrivateKey);

        // Get the deployer's address to use as the initial owner
        address deployerAddress = vm.addr(deployerPrivateKey);

        // Deploy the contract
        HederaToken hederaToken = new HederaToken(deployerAddress);

        // Stop broadcasting
        vm.stopBroadcast();

        console.log("HederaToken deployed to:", address(hederaToken));

        return address(hederaToken);
    }
}
// -------------------------------------Contract Deploy---------------------------
// [⠊] Compiling...
// [⠊] Compiling 16 files with Solc 0.8.30
// [⠢] Solc 0.8.30 finished in 932.26ms
// Compiler run successful!
// Script ran successfully.

// == Return ==
// 0: address 0xF58a13b87F4E0aca09a4854f4d409e1962aE2E66

// == Logs ==
//   HederaToken deployed to: 0xF58a13b87F4E0aca09a4854f4d409e1962aE2E66

// ## Setting up 1 EVM.

// ==========================

// Chain 296

// Estimated gas price: 600.000000001 gwei

// Estimated total gas used for script: 1504488

// Estimated amount required: 0.902692800001504488 ETH

// ==========================

// ##### 296
// ✅  [Success] Hash: 0x22fd233c678ba22f821e0b706d2f09785b6ec360169469afa0ced75a6434b8b5
// Contract Address: 0xF58a13b87F4E0aca09a4854f4d409e1962aE2E66
// Block: 22389335
// Paid: 0.34904139 ETH (1203591 gas * 290 gwei)

// ✅ Sequence #1 on 296 | Total Paid: 0.34904139 ETH (1203591 gas * avg 290 gwei)                                                       
                                                                                                                                      
                                                                                                                                      
// ==========================

// ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.

// Transactions saved to: C:/Users/teami/Desktop/Work/Hedera/THA Course Materials/THA-Courses/hedera-scs/Using-foundry\broadcast\HederaToken.s.sol\296\run-latest.json

// Sensitive values saved to: C:/Users/teami/Desktop/Work/Hedera/THA Course Materials/THA-Courses/hedera-scs/Using-foundry/cache\HederaToken.s.sol\296\run-latest.json

// -------------------------------------Contract Trasfer Call---------------------------


// blockHash            0xe7ae6ec88550a98e85bab2e2d7ad003392459fb5c66cce128d9812cf536b65d0
// blockNumber          22390000
// contractAddress      0xF58a13b87F4E0aca09a4854f4d409e1962aE2E66
// cumulativeGasUsed    52167
// effectiveGasPrice    290000000000
// from                 0x8867Fd959Dc59Bcb2059796D414937614Ec790A1
// gasUsed              52167
// logs                 [{"address":"0xf58a13b87f4e0aca09a4854f4d409e1962ae2e66","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000008867fd959dc59bcb2059796d414937614ec790a1","0x000000000000000000000000e6a877f313fcaf1f05bf72d2f49d26c2eb2cfbb7"],"data":"0x0000000000000000000000000000000000000000000000056bc75e2d63100000","blockHash":"0xe7ae6ec88550a98e85bab2e2d7ad003392459fb5c66cce128d9812cf536b65d0","blockNumber":"0x155a4f0","transactionHash":"0xafc9ef679ef6edaad010e929c546051371f75b558a4f11d131c07d73331f2131","transactionIndex":"0x7","logIndex":"0x0","removed":false}]
// logsBloom            0x01000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080008000000000000000000000000000000000002000000000000000000000000000000000000000000100000000000000012000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000 
// root
// status               1 (success)
// transactionHash      0xafc9ef679ef6edaad010e929c546051371f75b558a4f11d131c07d73331f2131
// transactionIndex     7
// type                 2
// blobGasPrice
// blobGasUsed
// to                   0xF58a13b87F4E0aca09a4854f4d409e1962aE2E66
// root                 39309028074332508661983559455579427211983204215636056653337583610388178777121
