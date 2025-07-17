require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      // HashIO RPC testnet endpoint in the .env file
      url: process.env.RPC_URL,
      // Your ECDSA account private key pulled from the .env file
      accounts: [process.env.OPERATOR_KEY],
    }
  }
};
