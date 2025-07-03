const {
  AccountId,
  PrivateKey,
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  TokenBurnTransaction,
  AccountCreateTransaction,
  Hbar,
  TokenAssociateTransaction,
  TransferTransaction,
  AccountBalanceQuery,
  TokenFreezeTransaction,
  TokenUnfreezeTransaction,
  TokenWipeTransaction,
  
} = require("@hashgraph/sdk"); // v2.46.0
require("dotenv").config();

async function main() {
  let client;
  try {
    // Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;


    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present"
      );
    }

    // Create your connection to the Hedera network
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    const supplyKey = PrivateKey.fromStringECDSA(myPrivateKey);
    // //Create the transaction and freeze for manual signing
    const txTokenCreate = await new TokenCreateTransaction()
     .setTokenName("Digital Art Collection")
	.setTokenSymbol("DACART")
	.setTokenType(TokenType.NonFungibleUnique)
	.setDecimals(0)
	.setInitialSupply(0)
	.setTreasuryAccountId(myAccountId)
	.setSupplyType(TokenSupplyType.Finite)
	.setMaxSupply(250)
	.setSupplyKey(supplyKey)
          .setWipeKey(supplyKey)
          .setPauseKey(supplyKey)
	.freezeWith(client);

    //Sign the transaction with the token treasury account private key
    const signTxTokenCreate = await txTokenCreate.sign(
      PrivateKey.fromStringECDSA(myPrivateKey)
    );

    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txTokenCreateResponse = await signTxTokenCreate.execute(client);

    //Get the receipt of the transaction
    const receiptTokenCreateTx = await txTokenCreateResponse.getReceipt(client);

    //Get the token ID from the receipt
    const tokenId = receiptTokenCreateTx.tokenId;

    //Get the transaction consensus status
    const statusTokenCreateTx = receiptTokenCreateTx.status;

    //Get the Transaction ID
    const txTokenCreateId = txTokenCreateResponse.transactionId.toString();

    console.log(
      "--------------------------------- Token Creation ---------------------------------"
    );
    console.log("Receipt status           :", statusTokenCreateTx.toString());
    console.log("Transaction ID           :", txTokenCreateId);
    console.log(
      "Hashscan URL             :",
      "https://hashscan.io/testnet/tx/" + txTokenCreateId
    );
    console.log("Token ID                 :", tokenId.toString());




    //IPFS content identifiers for which we will create a NFT
    const CID = [
        Buffer.from(
            "ipfs://bafyreiao6ajgsfji6qsgbqwdtjdu5gmul7tv2v3pd6kjgcw5o65b2ogst4/metadata.json"
        ),
        Buffer.from(
            "ipfs://bafyreic463uarchq4mlufp7pvfkfut7zeqsqmn3b2x3jjxwcjqx6b5pk7q/metadata.json"
        ),
        Buffer.from(
            "ipfs://bafyreihhja55q6h2rijscl3gra7a3ntiroyglz45z5wlyxdzs6kjh2dinu/metadata.json"
        ),
        Buffer.from(
            "ipfs://bafyreidb23oehkttjbff3gdi4vz7mjijcxjyxadwg32pngod4huozcwphu/metadata.json"
        ),
        Buffer.from(
            "ipfs://bafyreie7ftl6erd5etz5gscfwfiwjmht3b52cevdrf7hjwxx5ddns7zneu/metadata.json"
        )
    ];
    // Max transaction fee as a constant
    const maxTransactionFee = new Hbar(20);
        
    // MINT NEW BATCH OF NFTs
    const mintTx = new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata(CID) //Batch minting - UP TO 10 NFTs in single tx
        .setMaxTransactionFee(maxTransactionFee)
        .freezeWith(client);

    //Sign the transaction with the supply key
    const mintTxSign = await mintTx.sign(supplyKey);

    //Submit the transaction to a Hedera network
    const mintTxSubmit = await mintTxSign.execute(client);

    //Get the transaction receipt
    const mintRx = await mintTxSubmit.getReceipt(client);

    //Log the serial number
    
    console.log("----- Mint NFT -----");
    console.log("Created NFT " + tokenId + " with serial number: " + mintRx.serials);
    console.log("Mint Status             :", mintRx.status.toString());
    console.log("Transaction ID          :", mintTxSubmit.transactionId.toString());
    console.log("Hashscan URL            : https://hashscan.io/testnet/tx/" + mintTxSubmit.transactionId.toString());


    // Burn NFT serial #2
    const burnTx = await new TokenBurnTransaction()
      .setTokenId(tokenId)
      .setSerials([2])
      .freezeWith(client)
      .sign(supplyKey);

    const burnResponse = await burnTx.execute(client);
    const burnReceipt = await burnResponse.getReceipt(client);

    console.log("----- Burn NFT -----");
    console.log("Burn Status              :", burnReceipt.status.toString());
    console.log("Hashscan URL             : https://hashscan.io/testnet/tx/" + burnResponse.transactionId.toString());

    // Balance Check
    const balance = await new AccountBalanceQuery()
      .setAccountId(myAccountId)
      .execute(client);

    console.log("----- Account NFT Balance -----");
    console.log("NFTs held by new account:", balance.tokens._map.get(tokenId.toString())?.toString());

    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    //Create the transaction
    const transaction = new AccountCreateTransaction()
      .setKeyWithoutAlias(newAccountPublicKey)
      .setInitialBalance(new Hbar(1));

    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the account ID
    const newAccountId = receipt.accountId;

    console.log("The new account ID is " + newAccountId);

    //Associate a token to an account 
    const txTokenAssociate = await new TokenAssociateTransaction()
      .setAccountId(newAccountId)
      .setTokenIds([tokenId]) //Fill in the token ID
      .freezeWith(client);

    //Sign with the private key of the account that is being associated to a token 
    const signTxTokenAssociate = await txTokenAssociate.sign(newAccountPrivateKey);

    //Submit the transaction to a Hedera network    
    const txTokenAssociateResponse = await signTxTokenAssociate.execute(client);

    //Request the receipt of the transaction
    const receiptTokenAssociateTx = await txTokenAssociateResponse.getReceipt(client);

    //Get the transaction consensus status
    const statusTokenAssociateTx = receiptTokenAssociateTx.status;

    //Get the Transaction ID
    const txTokenAssociateId = txTokenAssociateResponse.transactionId.toString();

    console.log("--------------------------------- NFT Token Associate ---------------------------------");
    console.log("Receipt status           :", statusTokenAssociateTx.toString());
    console.log("Transaction ID           :", txTokenAssociateId);
    console.log("Hashscan URL             :", "https://hashscan.io/testnet/tx/" + txTokenAssociateId);

    // Transfer NFT serial #1 to new account
    const transferTx = await new TransferTransaction()
      .addNftTransfer(tokenId, 1, myAccountId, newAccountId)
      .freezeWith(client)
      .sign(PrivateKey.fromStringECDSA(myPrivateKey));

    const transferResponse = await transferTx.execute(client);
    const transferReceipt = await transferResponse.getReceipt(client);

    console.log("----- Transfer NFT -----");
    console.log("Transfer Status          :", transferReceipt.status.toString());
    console.log("Hashscan URL             : https://hashscan.io/testnet/tx/" + transferResponse.transactionId.toString());

    // Balance Check
    const balance2 = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);

    console.log("----- Account NFT Balance -----");
    console.log("NFTs held by new account:", balance2.tokens._map.get(tokenId.toString())?.toString());

    } catch (error) {
    console.error(error);
  } finally {
    if (client) client.close();
  }
}

main();
// --------------------------------- Token Creation ---------------------------------
// Receipt status           : SUCCESS
// Transaction ID           : 0.0.4942700@1751534747.135547081
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534747.135547081
// Token ID                 : 0.0.6274033
// ----- Mint NFT -----
// Created NFT 0.0.6274033 with serial number: 1,2,3,4,5
// Mint Status             : SUCCESS
// Transaction ID          : 0.0.4942700@1751534748.779370310
// Hashscan URL            : https://hashscan.io/testnet/tx/0.0.4942700@1751534748.779370310
// ----- Burn NFT -----
// Burn Status              : SUCCESS
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534754.074353063
// ----- Account NFT Balance -----
// NFTs held by new account: 4
// The new account ID is 0.0.6274034
// --------------------------------- NFT Token Associate ---------------------------------
// Receipt status           : SUCCESS
// Transaction ID           : 0.0.4942700@1751534761.116102079
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534761.116102079
// ----- Transfer NFT -----
// Transfer Status          : SUCCESS
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534762.357590384
// ----- Account NFT Balance -----
// NFTs held by new account: 1