// components/NFTCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const NFTCard = ({ serial, owner, image }) => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden relative">
        {image ? (
          <motion.img 
            src={image} 
            alt="NFT" 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="text-indigo-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-600 border border-purple-200">
          #{serial}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800">NFT Serial</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200">
            HEDERA NFT
          </span>
        </div>
        
        <div className="mt-3">
          <p className="text-xs text-gray-500 font-medium">Owner</p>
          <p className="text-sm font-medium text-gray-700 truncate bg-gray-50 p-2 rounded-lg mt-1 font-mono">{owner}</p>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <motion.button 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm transition shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
          <motion.button 
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-3 rounded-lg text-sm transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Transfer
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NFTCard;