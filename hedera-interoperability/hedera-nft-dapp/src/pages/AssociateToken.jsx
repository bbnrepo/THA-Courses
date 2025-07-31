import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrowserProvider, Contract } from "ethers";
import walletConnectFcn from "../components/hedera/walletConnect";

const HTS_SYSTEM_CONTRACT = "0x167";
const htsAbi = [
  "function associateToken(address account, address token) external returns (int64)",
];

function hederaTokenIdToEvmAddress(tokenId) {
  const parts = tokenId.split(".");
  const num = parseInt(parts[2], 10);

  const hex = num.toString(16).padStart(40, "0");
  const add = `0x${hex}`;
  console.log("EVMADDRESS", add);
  return `0x${hex}`;
}
async function getAssociatedTokens(accountId) {
  const response = await fetch(
    `https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}/tokens`
  );
  const data = await response.json();
  console.log("Associated Tokens:", data.tokens);
  console.log("Account ID:", accountId);
  return data.tokens;
}

const AssociateToken = () => {
  const [tokenId] = useState(process.env.AssociateToken || "0.0.5661109");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [userAccount, setUserAccount] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const connect = async () => {
      const [account] = await walletConnectFcn();
      setUserAccount(account);
      const tokens = await getAssociatedTokens(account);
      setTokens(tokens);
    };
    connect();
  }, []);

  // Associate token function
  const associateToken = async (tokenId) => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const tokenAddress = hederaTokenIdToEvmAddress(tokenId);
    const contract = new Contract(tokenAddress, htsAbi, signer);

    const tx = await contract.associateToken(userAddress, tokenAddress, {
      gasLimit: 300000,
    });

    return await tx.wait();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await associateToken(tokenId);
      setMessage({
        text: "✅ Token associated successfully!",
        type: "success",
      });

      // Refresh token list
      if (userAccount) {
        const updatedTokens = await getAssociatedTokens(userAccount);
        setTokens(updatedTokens);
      }

      setShowForm(false);
    } catch (error) {
      console.error(error);
      setMessage({
        text: error?.message || "❌ Failed to associate token.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshTokens = async () => {
    if (!userAccount) return;

    setIsLoading(true);
    try {
      const updatedTokens = await getAssociatedTokens(userAccount);
      setTokens(updatedTokens);
      setMessage({ text: "Token list refreshed!", type: "success" });
    } catch (error) {
      setMessage({ text: "Failed to refresh tokens", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="mb-8 text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
        >
          <span className="text-2xl text-white">🔗</span>
        </motion.div>
        <motion.h1
          className="text-2xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Token Association
        </motion.h1>
      </div>

      {/* Associated Tokens List */}
      <motion.div
        className="mb-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Associated Tokens
          </h2>
          <button
            onClick={handleRefreshTokens}
            disabled={isLoading}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mr-1"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            )}
            Refresh
          </button>
        </div>

        {tokens.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No tokens associated yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Token ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tokens.map((token) => (
                  <tr key={token.token_id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        href={`https://hashscan.io/testnet/token/${token.token_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {token.token_id}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {token.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {token.symbol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6">
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showForm ? "Cancel Association" : "Associate New Token"}
          </motion.button>
        </div>
      </motion.div>

      {/* Association Form */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          className="mb-6 space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div>
            <label
              htmlFor="tokenId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Token ID
            </label>
            <motion.input
              type="text"
              id="tokenId"
              value={tokenId}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed text-gray-600"
              placeholder="0.0.5661109"
            />
            <p className="mt-1 text-xs text-gray-500">
              Token is fixed and cannot be changed.
            </p>
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-sm font-medium text-white transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              }`}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                  Associating...
                </>
              ) : (
                "Associate Token"
              )}
            </motion.button>
          </div>

          {message && (
            <motion.div
              className={`p-4 rounded-xl text-sm overflow-hidden ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-100"
                  : "bg-red-50 text-red-800 border border-red-100"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {message.text}
            </motion.div>
          )}
        </motion.form>
      )}

      <motion.div
        className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 border border-blue-100 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-bold text-blue-700 mb-2">
          Need to find a Token ID?
        </h3>
        <p className="text-sm text-blue-600 mb-4">
          Search for tokens on HashScan explorer
        </p>
        <motion.a
          href="https://hashscan.io/testnet/home"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-white text-blue-600 rounded-xl text-sm font-medium border border-blue-200 hover:bg-blue-50 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open HashScan Explorer
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default AssociateToken;
