import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: "http://rpc.debugchain.net",
      accounts: process.env.PK !== undefined ? [process.env.PK] : [],
      //accounts: [process.env.PK!]
    },
  },
};

export default config;
