import React, { useState } from 'react';
import MyGroup from "./components/MyGroup.jsx";
import './App.css';
import walletConnectFcn from "./components/hedera/walletConnect.js";
import NFTDetails from "./components/hedera/nftdetails.js";
import { associateToken } from "./components/hedera/associateToken";


function App() {
  

  const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();

  const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
	const [contractTextSt, setContractTextSt] = useState();
	const [executeTextSt, setExecuteTextSt] = useState();

	const [connectLinkSt, setConnectLinkSt] = useState("");
	const [contractLinkSt, setContractLinkSt] = useState();
	const [executeLinkSt, setExecuteLinkSt] = useState();

	async function connectWallet() {
		if (account !== undefined) {
			setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			let newNetwork = wData[2];
			if (newAccount !== undefined) {
				setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLinkSt(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
				setContractTextSt();
			}
		}
	}
  return (
    <div className="app-container">
      {/* Left Navigation Bar */}
      <aside className="sidebar">
        <h2>NFT Dapp</h2>
        <ul>
   <li onClick={associateToken} style={{ cursor: "pointer" }}>
    Associate NFT
  </li>
          <li>Transfer NFT</li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="header">
          <div />
          <MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectTextSt} link={connectLinkSt} />
        </header>

        {/* NFT Display Area */}
        <div className="gallery-container">
         {account && <NFTDetails account={account} />}
        </div>
      </div>
    </div>
  );
}

export default App;
