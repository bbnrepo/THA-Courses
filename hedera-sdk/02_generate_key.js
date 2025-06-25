

const { PrivateKey } = require("@hashgraph/sdk");

console.log("\n Generating Key Pairs");

// ED25519 Key
const ed25519Key = PrivateKey.generateED25519();
console.log("ED25519");
console.log("Private Key:", ed25519Key.toString());
console.log("Public Key:", ed25519Key.publicKey.toString());

// ECDSA Key
const ecdsaKey = PrivateKey.generateECDSA();
console.log("\n ECDSA");
console.log("Private Key:", ecdsaKey.toStringRaw()); // raw hex
console.log("Public Key:", ecdsaKey.publicKey.toStringRaw());


// Generating Key Pairs
// ED25519
// Private Key: 302e020100300506032b6570042204204d66c71b05624e3dc9afd9a882cc22e58e006008d90ef377fdbb0fc4dd8335fd
// Public Key: 302a300506032b657003210076177404eedd65ccc8fa8bd56cbfd9e57237fa8a5f6905d7e77d43031e4efca5

// ECDSA
// Private Key: 8880d6f101ff469849df6e83d15400993cba24cef563b4dab870280c17ddef4c
// Public Key: 03c13b023d5cf62f910f36d5a71d3107b3343f4a5fdcde020eca9506d7c77fe824
