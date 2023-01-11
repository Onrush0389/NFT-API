import { expect } from "chai";
import { ethers } from "hardhat";

describe("Given a lotteryV2 system", function () {
  it("Should be able to enter and winner takes it all", async function () {
    const [owner, firstPlayer, secondPlayer, thirdPlayer] =
      await ethers.getSigners();
    const Lottery = await ethers.getContractFactory("LotteryV2");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    let user1 = lottery.connect(firstPlayer);
    await user1.enter({
      value: ethers.utils.parseEther("0.1"),
    });

    let user2 = lottery.connect(secondPlayer);
    await user2.enter({
      value: ethers.utils.parseEther("0.1"),
    });

    let user3 = lottery.connect(thirdPlayer);
    await user3.enter({
      value: ethers.utils.parseEther("0.1"),
    });

    let balance = await lottery.getBalance();
    expect(balance).to.equal(ethers.utils.parseEther("0.3"));

    const tx = await lottery.pickWinners(2);
    await tx.wait();

    balance = await lottery.getBalance();
    expect(balance).to.equal(ethers.utils.parseEther("0"));

    const winners = await lottery.getWinnersByLottery(0);
    expect(winners.length).equal(2);
  });

  it("Should be able to enter and winner takes it all", async function () {
    const [owner, firstPlayer, secondPlayer, thirdPlayer, fouthPlayer] =
      await ethers.getSigners();
    const Lottery = await ethers.getContractFactory("LotteryV2");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    let user1 = lottery.connect(firstPlayer);
    await user1.enter({
      value: ethers.utils.parseEther("0.1"),
    });

    let user2 = lottery.connect(secondPlayer);
    await user2.enter({
      value: ethers.utils.parseEther("0.1"),
    });

    let user3 = lottery.connect(thirdPlayer);
    await user3.enter({
      value: ethers.utils.parseEther("0.1"),
    });

    let user4 = lottery.connect(fouthPlayer);
    await user4.enter({
      value: ethers.utils.parseEther("0.1"),
    });

    let balance = await lottery.getBalance();
    expect(balance).to.equal(ethers.utils.parseEther("0.4"));

    const tx = await lottery.pickWinners(3);
    await tx.wait();

    balance = await lottery.getBalance();
    expect(balance).to.equal(ethers.utils.parseEther("0"));

    const winners = await lottery.getWinnersByLottery(0);
    expect(winners.length).equal(3);
    console.log("Winners are", winners);
  });
});
