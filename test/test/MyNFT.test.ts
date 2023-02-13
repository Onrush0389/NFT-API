import { expect } from "chai";
import { ethers } from "hardhat";

describe("Given MyNFT", function () {
  it("Should be able to award", async function () {
    const [owner, otherAddress, ...rest] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyNFT");
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    let tx = await myToken.awardToken(owner.address, "https://www.google.com");
    await tx.wait();

    let tokenOwner = await myToken.ownerOf(0);
    expect(tokenOwner).to.equal(owner.address);

    let tokenURI = await myToken.tokenURI(0);
    expect(tokenURI).to.equal("https://www.google.com");

    tx = await myToken.awardToken(
      otherAddress.address,
      "https://www.google.com/hk"
    );
    const tokenId = await tx.wait();

    tokenOwner = await myToken.ownerOf(1);
    expect(tokenOwner).to.equal(otherAddress.address);

    tokenURI = await myToken.tokenURI(1);
    expect(tokenURI).to.equal("https://www.google.com/hk");

    console.log("owner", owner.address);
    console.log("tokenID", tokenId.logs[0].data);
  });
});
