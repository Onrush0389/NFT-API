import { ethers } from "hardhat";

async function main() {
  const SmartContract = await ethers.getContractFactory("MyNFT");
  //Coin is the name of your contract
  const NFT = await SmartContract.deploy();
  await NFT.deployed();
  console.log("NFT deployed to:", NFT.address);
  // const CoinContract = await ethers.getContractFactory("Coin");
  // //Coin is the name of your contract
  // const Coin = await CoinContract.deploy(1000);
  // await Coin.deployed();
  // console.log("Coin deployed to:", Coin.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
