# Hedera NFT DApp

This DApp showcases NFT interaction using the Hedera network. Users can connect their wallet (MetaMask), associate NFTs with their Hedera-compatible account, and fetch associated token details using the Mirror Node API.

---

## 🧩 Features

- ✅ Connect Hedera-compatible EVM wallet (e.g., MetaMask)
- 🎯 Associate NFTs to your account via smart contract
- 🔍 Fetch and display associated NFTs using Mirror Node REST API
- 💼 Clean, modular React components for easy integration

---

## 🛠️ Prerequisites

- Node.js v16+ and npm installed
- MetaMask wallet with an ECDSA key (Hedera Testnet-compatible)
- A valid Hedera NFT Token ID (or use the demo one provided below)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <add-final-THA-repo-link>
````

### 2. Navigate to the Project

```bash
cd hedera-interoperability/hedera-nft-dapp
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment

Create a `.env` file in the root directory and add the following:

```env
REACT_APP_TOKEN_ID=<your-nft-token-id>
```

If you don’t have a token yet, use the demo token:

```env
REACT_APP_TOKEN_ID=0.0.5157054
```

### 5. Start the Development Server

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---
<img width="1919" height="1017" alt="Screenshot 2025-08-01 092559" src="https://github.com/user-attachments/assets/358c4e05-8ff4-4881-93ba-8e2631df00c0" />



<img width="1919" height="1013" alt="Screenshot 2025-08-01 092638" src="https://github.com/user-attachments/assets/d7fab7b5-786a-4df0-a2d0-2217924410b2" />

## 📁 Project Structure
```
hedera-nft-dapp/
├── public/
├── src/
│   ├── components/
│   │   ├── hedera/
│   │   │   ├── walletConnect.js   # Wallet connect logic
│   ├── pages/
│   │   ├── AssociateToken.jsx     # NFT association screen
│   │   └── Dashboard.jsx          # Displays NFT cards
│   ├── App.js                     # App layout with sidebar and routing
│   └── index.js
├── .env
└── package.json
```


## 🧪 Example

Once the app is up:

* Click **Connect Wallet** (top-right)
* On the left, use **Associate NFT** to call the transcation
* View NFT cards and metadata directly in the main section

---

## 🧠 Learn More

* [Hedera Docs](https://docs.hedera.com/)
* [Mirror Node API Reference](https://docs.hedera.com/hedera/mirror-node/mirror-node-api)


