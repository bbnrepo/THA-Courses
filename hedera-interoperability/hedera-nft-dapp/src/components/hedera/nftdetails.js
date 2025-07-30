import React, { useEffect, useState } from "react";

function NFTDetails() {
  const [nfts, setNfts] = useState([]);
  const [images, setImages] = useState([]);
  const tokenId = "0.0.5661109";

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const res = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts`);
        const data = await res.json();
        const nftList = data.nfts || [];

        // Decode metadata & fetch image
        const imagePromises = nftList.map(async (nft) => {
          const base64 = nft.metadata;
          const decodedUrl = atob(base64); // ipfs://...
          const metadataUrl = decodedUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
          
          const metaRes = await fetch(metadataUrl);
          const metaJson = await metaRes.json();
          const image = metaJson.image.replace("ipfs://", "https://ipfs.io/ipfs/");
          
          return {
            serial: nft.serial_number,
            owner: nft.account_id,
            image,
          };
        });

        const images = await Promise.all(imagePromises);
        setImages(images);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="nft-gallery">
      {images.map((nft, idx) => (
        <div key={idx} className="nft-card">
          <img src={nft.image} alt={`NFT ${nft.serial}`} width={200} />
          <p><strong>Serial:</strong> {nft.serial}</p>
          <p><strong>Owner:</strong> {nft.owner}</p>
        </div>
      ))}
    </div>
  );
}

export default NFTDetails;
