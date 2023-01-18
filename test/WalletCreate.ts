import { ethers } from "ethers";
const wallet = ethers.Wallet.createRandom();

console.log("Wallet address", wallet.address);
console.log("Wallet private key", wallet.privateKey);
console.log("Wallet mnemonic", wallet.mnemonic);
