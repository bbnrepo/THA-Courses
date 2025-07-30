// pages/AssociateToken.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AssociateToken = () => {
  const [tokenId, setTokenId] = useState('');
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
        text: 'Token associated successfully!',
        type: 'success'
      });
      // Reset form
      setTokenId('');
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to associate token',
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
          <span className="text-2xl text-white">🔗</span>
        </motion.div>
        <motion.h1 
          className="text-2xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Associate Token
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Associate a token with your account
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
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="0.0.123456"
            required
            whileFocus={{ scale: 1.01 }}
          />
          <p className="mt-1 text-xs text-gray-500">Enter the token ID you want to associate with your account</p>
        </div>
        
        <div>
          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-sm font-medium text-white transition ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            }`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                Associating...
              </>
            ) : 'Associate Token'}
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
      
      <motion.div 
        className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 border border-blue-100 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-bold text-blue-700 mb-2">Need to find a Token ID?</h3>
        <p className="text-sm text-blue-600 mb-4">Search for tokens on HashScan explorer</p>
        <motion.button
          className="px-4 py-2 bg-white text-blue-600 rounded-xl text-sm font-medium border border-blue-200 hover:bg-blue-50 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open HashScan Explorer
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AssociateToken;