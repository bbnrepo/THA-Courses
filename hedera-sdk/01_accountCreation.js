const {
  Hbar,
  Client,
  PrivateKey,
  AccountBalanceQuery,
  AccountCreateTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();

async function accountcreation() {
  // Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = process.env.MY_PRIVATE_KEY;

  // If we weren't able to grab it, we should throw a new error
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }

  // Create your connection to the Hedera Network
  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);

  //Set the default maximum transaction fee (in Hbar)
  client.setDefaultMaxTransactionFee(new Hbar(100));

  //Set the maximum payment for queries (in Hbar)
  client.setDefaultMaxQueryPayment(new Hbar(50));

  // Create new keys
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  ///Create new ECDSA key
  const ecdsaPublicKey = PrivateKey.generateECDSA().publicKey;

  //Create the transaction
  const transaction = new AccountCreateTransaction()
//     .setKeyWithAlias(ecdsaPublicKey)
    // DO NOT set an alias with your key if you plan to update/rotate keys in the future, Use .setKeyWithoutAlias instead
    .setKeyWithoutAlias(ecdsaPublicKey)
    .setInitialBalance(new Hbar(1));

  //Sign the transaction with the client operator private key and submit to a Hedera network
  const txResponse = await transaction.execute(client);

  //Request the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);

  //Get the account ID
  const newAccountId = receipt.accountId;

  console.log("The new account ID is " + newAccountId);
  
  // Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);
  
    console.log(
      "The new account balance is: " +
        accountBalance.hbars.toTinybars() +
        " tinybar."
    );
}
accountcreation();

// The new account ID is 0.0.6219350
// The new account balance is: 100000000 tinybar.
