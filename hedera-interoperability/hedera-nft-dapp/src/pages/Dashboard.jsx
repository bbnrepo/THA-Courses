// pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NFTCard from "../components/NFTCard";

function Dashboard() {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tokenId = "0.0.5661109";

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts`);
        const data = await res.json();
        const nftList = data.nfts || [];

        const nftPromises = nftList.map(async (nft) => {
          try {
            const base64 = nft.metadata;
            const decodedUrl = atob(base64);
            const metadataUrl = decodedUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
            const metaRes = await fetch(metadataUrl);
            const metaJson = await metaRes.json();
            const image = metaJson.image.replace("ipfs://", "https://ipfs.io/ipfs/");
            return {
              serial: nft.serial_number,
              owner: nft.account_id,
              image,
            };
          } catch (err) {
            console.error("Error fetching NFT metadata:", err);
            return {
              serial: nft.serial_number,
              owner: nft.account_id,
              image: null,
            };
          }
        });

        const nftData = await Promise.all(nftPromises);
        setNfts(nftData.reverse());
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          NFT Dashboard
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Manage your Hedera NFT collection
        </motion.p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading NFTs...</p>
          </div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {nfts.map((nft, idx) => (
            <NFTCard 
              key={idx} 
              serial={nft.serial} 
              owner={nft.owner} 
              image={nft.image} 
            />
          ))}
        </motion.div>
      )}

      {!isLoading && nfts.length === 0 && (
        <motion.div 
          className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 text-center border border-indigo-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No NFTs Found</h3>
          <p className="text-gray-600">You don't own any NFTs yet. Associate tokens to get started.</p>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;