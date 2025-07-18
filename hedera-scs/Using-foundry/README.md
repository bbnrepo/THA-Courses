# Using Foundry on Hedera Testnet

In this tutorial, you'll learn how to deploy, mint, and transfer ERC-20 tokens using Foundry and OpenZeppelin contracts on the Hedera Testnet. We'll cover setting up your project, writing and deploying an ERC-20 smart contract, minting tokens, transferring them, and verifying the contract using the Foundry CLI.

---

## 📦 To Run the Project

```bash
cd Using-foundry
forge install
````

---

## 🔐 Create `.env` file with the below parameters:

```env
OPERATOR_KEY=your-operator-key
RPC_URL=https://testnet.hashio.io/api
```

Replace `your-operator-key` with the **HEX-encoded Private Key** of your **ECDSA account** from the Hedera Portal.

---

## 🛠 Compile the Contract

```bash
forge build
```

This will compile the contracts inside the `src` directory and place the artifacts inside `out/`.

---

## 🚀 Deploy the Contract

To deploy the contract using Foundry, use the pre-written script:

```bash
forge script script/HederaToken.s.sol:HederaTokenScript --rpc-url testnet --broadcast
```

> ⚠️ Copy the deployed contract address — you’ll need it in the following steps.

---

## 🧪 Interact with the Contract

### ✅ Load environment variables

```bash
source .env
```

### ✅ Export useful variables

```bash
# Replace with the contract address you just deployed
export CONTRACT_ADDRESS=<your-contract-address>

# Get your public address from private key
export MY_ADDRESS=$(cast wallet address $OPERATOR_KEY)
```

### ✅ Check your token balance

```bash
cast call $CONTRACT_ADDRESS "balanceOf(address)" $MY_ADDRESS --rpc-url $RPC_URL
```

---

## 🔁 Transfer Tokens

```bash
# Generate a new random address (recipient)
export RECIPIENT_ADDRESS=$(cast wallet address $(openssl rand -hex 32))
echo "Recipient Address: $RECIPIENT_ADDRESS"

# Transfer 100 tokens (100e18 = 100 * 10^18)
cast send $CONTRACT_ADDRESS "transfer(address,uint256)" $RECIPIENT_ADDRESS 100e18 \
  --private-key $OPERATOR_KEY \
  --rpc-url $RPC_URL
```

### ✅ Verify recipient balance:

```bash
cast call $CONTRACT_ADDRESS "balanceOf(address)" $RECIPIENT_ADDRESS --rpc-url $RPC_URL
```

---

## 🔍 To Check on Hashscan

1. Visit [https://hashscan.io/testnet/home](https://hashscan.io/testnet/home)
2. Paste the deployed contract address in the search bar to see transactions and balances.

---

## ✅ Verify Contract Source on Hashscan

```bash
forge verify-contract $CONTRACT_ADDRESS src/HederaToken.sol:HederaToken \
  --chain-id 296 \
  --verifier sourcify \
  --verifier-url "https://server-verify.hashscan.io/" \
  --constructor-args $(cast abi-encode "constructor(address)" $MY_ADDRESS)
```

You should see a success message if verification is complete.

---

## 🏁 Done!

You’ve successfully:

* Set up a Foundry project
* Deployed an ERC-20 smart contract
* Minted and transferred tokens
* Verified contract on Hashscan

For more advanced usage and fuzz testing, refer to the official [Foundry Book](https://book.getfoundry.sh/).



### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
