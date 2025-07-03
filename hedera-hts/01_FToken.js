const {
  AccountId,
  PrivateKey,
  Client,
  TokenCreateTransaction,
  TokenType,
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
      .setTokenName("USD Bar")
      .setTokenSymbol("USDB")
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(2)
      .setTreasuryAccountId(myAccountId)
      .setInitialSupply(5000)
      .setSupplyKey(supplyKey)
      .setWipeKey(supplyKey)
      .setFreezeKey(supplyKey)
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

    
    //Mint another 1,000 tokens and freeze the unsigned transaction for manual signing
    const txTokenMint = await new TokenMintTransaction()
      .setTokenId(tokenId) //Fill in the token ID
      .setAmount(1000)
      .freezeWith(client);

    //Sign with the supply private key of the token
    const signTxTokenMint = await txTokenMint.sign(supplyKey); //Fill in the supply private key

    //Submit the transaction to a Hedera network
    const txTokenMintResponse = await signTxTokenMint.execute(client);

    //Request the receipt of the transaction
    const receiptTokenMintTx = await txTokenMintResponse.getReceipt(client);

    //Get the transaction consensus status
    const statusTokenMintTx = receiptTokenMintTx.status;

    //Get the Transaction ID
    const txTokenMintId = txTokenMintResponse.transactionId.toString();

    console.log(
      "--------------------------------- Mint Token ---------------------------------"
    );
    console.log("Receipt status           :", statusTokenMintTx.toString());
    console.log("Transaction ID           :", txTokenMintId);
    console.log(
      "Hashscan URL             :",
      "https://hashscan.io/testnet/tx/" + txTokenMintId
    );

    //Burn 1,000 tokens and freeze the unsigned transaction for manual signing
    const txBurnToken = await new TokenBurnTransaction()
      .setTokenId(tokenId) //Fill in the token ID
      .setAmount(1000)
      .freezeWith(client);

    //Sign with the supply private key of the token
    const signTxBurnToken = await txBurnToken.sign(supplyKey); //Fill in the supply private key

    //Submit the transaction to a Hedera network
    const txBurnTokenResponse = await signTxBurnToken.execute(client);

    //Request the receipt of the transaction
    const receiptBurnTokenTx = await txBurnTokenResponse.getReceipt(client);

    //Get the transaction consensus status
    const statusBurnTokenTx = receiptBurnTokenTx.status;

    //Get the Transaction ID
    const txBurnTokenId = txBurnTokenResponse.transactionId.toString();

    console.log(
      "--------------------------------- Burn Token ---------------------------------"
    );
    console.log("Receipt status           :", statusBurnTokenTx.toString());
    console.log("Transaction ID           :", txBurnTokenId);
    console.log(
      "Hashscan URL             :",
      "https://hashscan.io/testnet/tx/" + txBurnTokenId
    );

       
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

    console.log("--------------------------------- Token Associate ---------------------------------");
    console.log("Receipt status           :", statusTokenAssociateTx.toString());
    console.log("Transaction ID           :", txTokenAssociateId);
    console.log("Hashscan URL             :", "https://hashscan.io/testnet/tx/" + txTokenAssociateId);
      
  
    
    //Create the transfer transaction
    const txTransfer = await new TransferTransaction()
      .addTokenTransfer(tokenId, myAccountId, -10) //Fill in the token ID 
      .addTokenTransfer(tokenId,newAccountId, 10) //Fill in the token ID and receiver account
      .freezeWith(client);

    //Sign with the sender account private key
    const signTxTransfer = await txTransfer.sign(PrivateKey.fromStringECDSA(myPrivateKey));

    //Sign with the client operator private key and submit to a Hedera network
    const txTransferResponse = await signTxTransfer.execute(client);

    //Request the receipt of the transaction
    const receiptTransferTx = await txTransferResponse.getReceipt(client);

    //Obtain the transaction consensus status
    const statusTransferTx = receiptTransferTx.status;

    //Get the Transaction ID
    const txTransferId = txTransferResponse.transactionId.toString();

    console.log("--------------------------------- Token Transfer ---------------------------------");
    console.log("Receipt status           :", statusTransferTx.toString());
    console.log("Transaction ID           :", txTransferId);
    console.log("Hashscan URL             :", "https://hashscan.io/testnet/tx/" + txTransferId);
   
    //Create the query
    const accountBalanceQuery = new AccountBalanceQuery()
      .setAccountId(newAccountId);

    //Sign with the client operator private key and submit to a Hedera network
    const accountTokenBalanceQueryResponse = await accountBalanceQuery.execute(client);

    console.log("--------------------------------- Account Token Balance Query ---------------------------------");
    console.log("Account Token Balance           : ", accountTokenBalanceQueryResponse.tokens._map.get(tokenId.toString()));

    //Wipe 100 tokens from an account and freeze the unsigned transaction for manual signing
    const txWipeToken = await new TokenWipeTransaction()
      .setAccountId(newAccountId) //Fill in the account ID
      .setTokenId(tokenId) //Fill in the token ID
      .setAmount(5)
      .freezeWith(client);

    //Sign with the payer account private key, sign with the wipe private key of the token
    const signTxWipeToken = await (await txWipeToken.sign(newAccountPrivateKey)).sign(supplyKey); //Fill in the wipe private key

    //Submit the transaction to a Hedera network    
    const txWipeTokenResponse = await signTxWipeToken.execute(client);

    //Request the receipt of the transaction
    const receiptWipeTokenTx = await txWipeTokenResponse.getReceipt(client);

    //Obtain the transaction consensus status
    const statusWipeTokenTx = receiptWipeTokenTx.status;

    //Get the Transaction ID
    const txWipeTokenId = txWipeTokenResponse.transactionId.toString();

    console.log("--------------------------------- Wipe Token ---------------------------------");
    console.log("Receipt status           :", statusWipeTokenTx.toString());
    console.log("Transaction ID           :", txWipeTokenId);
    console.log("Hashscan URL             :", "https://hashscan.io/testnet/tx/" + txWipeTokenId);
      
  
    
    //Create the query
    const accountBalanceQuery2 = new AccountBalanceQuery()
      .setAccountId(newAccountId);

    //Sign with the client operator private key and submit to a Hedera network
    const accountTokenBalanceQueryResponse2 = await accountBalanceQuery2.execute(client);

    console.log("--------------------------------- Account Token Balance Query ---------------------------------");
   console.log("Account Token Balance           : ", accountTokenBalanceQueryResponse2.tokens._map.get(tokenId.toString()));

  } catch (error) {
    console.error(error);
  } finally {
    if (client) client.close();
  }
}

main();





// --------------------------------- Token Creation ---------------------------------
// Receipt status           : SUCCESS
// Transaction ID           : 0.0.4942700@1751534455.385895199
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534455.385895199
// Token ID                 : 0.0.6274004
// --------------------------------- Mint Token ---------------------------------
// Receipt status           : SUCCESS
// Transaction ID           : 0.0.4942700@1751534458.846634352
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534458.846634352
// --------------------------------- Burn Token ---------------------------------
// Receipt status           : SUCCESS
// Transaction ID           : 0.0.4942700@1751534460.618158668
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534460.618158668
// The new account ID is 0.0.6274005
// --------------------------------- Token Associate ---------------------------------
// Receipt status           : SUCCESS
// Transaction ID           : 0.0.4942700@1751534465.305929585
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534465.305929585
// --------------------------------- Token Transfer ---------------------------------
// Receipt status           : SUCCESS
// Transaction ID           : 0.0.4942700@1751534467.340336802
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534467.340336802
// --------------------------------- Account Token Balance Query ---------------------------------
// Account Token Balance           :  Long { low: 10, high: 0, unsigned: true }
// --------------------------------- Wipe Token ---------------------------------
// Receipt status           : SUCCESS
// Transaction ID           : 0.0.4942700@1751534474.686034905
// Hashscan URL             : https://hashscan.io/testnet/tx/0.0.4942700@1751534474.686034905
// --------------------------------- Account Token Balance Query ---------------------------------
// Account Token Balance           :  Long { low: 5, high: 0, unsigned: true }
