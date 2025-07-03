const {
    Hbar,
    Client,
    PrivateKey,
    AccountBalanceQuery,
    TransferTransaction,
    AccountCreateTransaction,
  } = require("@hashgraph/sdk");
  require("dotenv").config();
  
  async function transferHBAR() {
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
      "\nNew account balance is: " +
        accountBalance.hbars.toTinybars() +
        " tinybars."
    );
  
    // Create the transfer transaction
    const sendHbar = await new TransferTransaction()
      .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000))
      .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000))
      .execute(client);
  
    // Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(client);
    console.log(
      "\nThe transfer transaction from my account to the new account was: " +
        transactionReceipt.status.toString()
    );

    // Verify the account balance
    const balanceAfterTransfer = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);
  
    console.log(
      "\nNew Account Balance After Transfer Is: " +
        balanceAfterTransfer.hbars.toTinybars() +
        " tinybars."
    );


  }
  transferHBAR();

// The new account ID is 0.0.6230476

// New account balance is: 100000000 tinybars.

// The transfer transaction from my account to the new account was: SUCCESS

// New Account Balance After Transfer Is: 100001000 tinybars.
