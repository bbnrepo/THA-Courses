// pages/TransferToken.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TransferToken = () => {
  const [tokenId, setTokenId] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage({
        text: 'Token transferred successfully!',
        type: 'success'
      });
      // Reset form
      setTokenId('');
      setSerialNumber('');
      setRecipient('');
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to transfer token',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="max-w-md mx-auto"
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
          <span className="text-2xl text-white">🔄</span>
        </motion.div>
        <motion.h1 
          className="text-2xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Transfer Token
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Transfer an NFT to another account
        </motion.p>
      </div>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div>
          <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700 mb-1">
            Token ID
          </label>
          <motion.input
            type="text"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="0.0.123456"
            required
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        
        <div>
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Serial Number
          </label>
          <motion.input
            type="text"
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="12345"
            required
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address
          </label>
          <motion.input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="0.0.987654"
            required
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        
        <div>
          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-sm font-medium text-white transition ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            }`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                Processing...
              </>
            ) : 'Transfer Token'}
          </motion.button>
        </div>
        
        {message && (
          <motion.div 
            className={`p-4 rounded-xl text-sm ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-100' 
                : 'bg-red-50 text-red-800 border border-red-100'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message.text}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default TransferToken;