# THA-Courses

## Folder hedera-sdk

### 1. 01_accountCreation.js
   This exercise demonstrates how to programmatically create a new Hedera account on the Testnet using the Hedera JavaScript SDK.

### 2. 02_generateKey.js
   This exercise focuses purely on generating different types of cryptographic key pairs supported by Hedera: ED25519 and ECDSA (secp256k1). Understanding how to generate these keys is fundamental, as they are used to secure and control Hedera accounts and transactions.

### 3. 03_transferHBAR.js
   This section provides hands-on exercises for sending HBAR and querying the Hedera Mirror Node.

## Folder hedera-hts
### 1. 01_FToken.js
   It is a complete walkthrough of creating, minting, burning, transferring, associating, and wiping fungible tokens on the Hedera Testnet using the JavaScript SDK. It covers essential token lifecycle actions including account creation, balance queries, and token management with real-time HashScan traceability. 

### 2. 02_NFToken.js
   It demonstrates the creation and lifecycle of Non-Fungible Tokens (NFTs) on the Hedera Testnet, including minting NFTs with metadata (IPFS), burning, transferring, and associating them with user accounts. It provides hands-on experience in managing NFT collections using the Hedera JavaScript SDK with real-time traceability via HashScan. 

## Folder hedera-hcs
An example web app which demonstrates how you can use decentralized pub-sub messaging on the Hedera Consensus Service.
For More Details: Check the \hedera-hcs\README.md

## Folder hedera-scs
Hands-on to demonstrate Hedera Contract Service using SDK, Hardhat and Foundary.
### Using-SDK
#### 01_contractTransaction.js
      This section provides hands-on exercises for deploying simple HelloHedera contract and interacting with contract using Hedera SDK.
      To Run the file make sure to create .env as per below istructions.
### Using-hardhat
   In this tutorial, you'll learn how to **deploy, mint, and transfer ERC-721 tokens (NFTs)** using **Hardhat**, **Ethers.js**, and **OpenZeppelin contracts** on the **Hedera Testnet**.
   For More Details: Check the \hedera-scs\Using-hardhat\README.md
## How To Run
```bash
$ cd <folder-name>
$ npm i
```

Create File .env
Add content to .env:

# .env

MY_ACCOUNT_ID=0.0.XXXXXX (ECDSA Account ID from Hedera Portal)
MY_PRIVATE_KEY=<Your Testnet Private Key (DER Encoded Private Key) from Hedera Portal>

```bash
$ node <file-name>
```
