import { HashConnect } from "hashconnect";

const appMetadata = {
    name: "Hedera DApp",
    description: "Let's build a dapp on Hedera",
//     icon: "https://raw.githubusercontent.com/ed-marquez/hedera-dapp-days/testing/src/assets/hederaLogo.png",
};

const network = "testnet";

async function walletConnectFcn() {
    console.clear();
    console.log("- Connecting wallet...");

    // clear stale session
    localStorage.clear();

    const hashconnect = new HashConnect(true);
    const saveData = {
        topic: "",
        privateKey: "",
        pairingString: "",
        pairedWalletData: null,
        pairedAccounts: [],
    };


    // Step 1: Init
    const initData = await hashconnect.init(appMetadata);
    saveData.privateKey = initData.privKey;
    console.log(`- Private key for pairing: ${saveData.privateKey}`);

    // Step 2: Connect to get topic
    const state = await hashconnect.connect();
    saveData.topic = state.topic;
    console.log(`- Pairing topic: ${saveData.topic}`);

    // Step 3: Generate pairing string
    saveData.pairingString = hashconnect.generatePairingString(state, network, false);

    // Step 4: Connect to local wallet
    hashconnect.findLocalWallets();
    hashconnect.connectToLocalWallet(saveData.pairingString);

    console.log("TEST",saveData.pairingString)
    // Optional: listen for pairing approval
    hashconnect.pairingEvent.on((pairingData) => {
        console.log("Wallet paired:", pairingData);
        saveData.pairedAccounts = pairingData.accountIds;
        saveData.pairedWalletData = pairingData.metadata;
    });

    return [hashconnect, saveData];
}

export default walletConnectFcn;
