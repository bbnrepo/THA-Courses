
# 🎓 Sample Hardhat Project — Deploy & Manage NFTs on Hedera

In this tutorial, you'll learn how to **deploy, mint, and transfer ERC-721 tokens (NFTs)** using **Hardhat**, **Ethers.js**, and **OpenZeppelin contracts** on the **Hedera Testnet**.

We’ll walk through:

- Setting up your environment
- Writing and deploying an ERC-721 smart contract
- Minting an NFT to your account
- Transferring an NFT to another address
- Viewing your activity on [Hashscan](https://hashscan.io/testnet/home)

---

## 🚀 Getting Started

### 1. Clone and Install Dependencies
```bash
cd Using-Hardhat
npm install
````

### 2. Configure Environment Variables

Create a `.env` file in the project root with the following:

```env
OPERATOR_KEY=your-operator-key
RPC_URL=https://testnet.hashio.io/api
```

> ✅ Replace `your-operator-key` with the **HEX-encoded private key** of your ECDSA account (from the Hedera Developer Portal).

---

## 🛠️ Run the Project

### ✅ Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network testnet
```

> Copy the deployed contract address for use in the next steps.

---

### 🖼️ Mint NFT

1. Open `scripts/mint.js`
2. Replace `<your-contract-address>` with the address from the previous step.
3. Run the script:

```bash
npx hardhat run scripts/mint.js --network testnet
```

---

### 🔁 Transfer NFT

1. Open `scripts/transfer.js`

2. Replace:

   * `<your-contract-address>` with the deployed address
   * `<recipient-address>` with the address of the recipient

3. Run the script:

```bash
npx hardhat run scripts/transfer.js --network testnet <recipient-address> <token-id>
```

> If no `token-id` is passed, it defaults to `0`.

---

## 🔍 Verify on Hashscan

Visit [https://hashscan.io/testnet/home](https://hashscan.io/testnet/home)

* Paste your **contract address** in the search bar to view all related transactions and NFT activity.

---

## 📦 Tech Stack

* Hardhat
* Ethers.js
* OpenZeppelin
* Hedera Hashgraph Testnet
* Hashscan for contract explorer

---


