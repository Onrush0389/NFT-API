import { expect } from "chai";
import { ethers } from "hardhat";
describe("Coin", function () {
  it("Test initial supply", async () => {
    const Coin = await ethers.getContractFactory("Coin");
    const coin = await Coin.deploy(1000);
    const [account, account2, account3] = await ethers.getSigners();
    let balance = await coin.balanceOf(account.address);
    expect(balance).to.equal(1000);
    console.log("totalSupply", await coin.totalSupply());
  });
});
