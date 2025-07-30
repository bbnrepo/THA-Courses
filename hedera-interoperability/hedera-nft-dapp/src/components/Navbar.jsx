// components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import walletConnectFcn from './hedera/walletConnect';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!account) {
      setIsConnecting(true);
      try {
        const [userAcc, , net] = await walletConnectFcn();
        if (userAcc) {
          setAccount(userAcc);
          setNetwork(net);
        }
      } catch (error) {
        console.error("Connection error:", error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <motion.header 
      className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent flex items-center">
            <span className="mr-2">🖼️</span> NFT DApp
          </Link>

          <div className="flex items-center space-x-4">
            {account ? (
              <motion.div 
                className="text-sm text-gray-600 truncate max-w-[160px] bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span title={account} className="font-medium text-indigo-700">{account.substring(0, 10)}...</span>
                <a
                  href={`https://hashscan.io/${network}/account/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-indigo-500 hover:text-indigo-700"
                >
                  <motion.span whileHover={{ scale: 1.1 }}>🔗</motion.span>
                </a>
              </motion.div>
            ) : (
              <motion.button
                onClick={connectWallet}
                className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <span className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-white mr-2 animate-ping"></span>
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">🔗</span> Connect Wallet
                  </span>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;