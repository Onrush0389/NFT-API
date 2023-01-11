import { expect } from "chai";
import { ethers } from "hardhat";

describe("Given a lottery system", function () {
  it("Should be able to enter and winner takes it all", async function () {
    const [owner, firstPlayer, secondPlayer, thirdPlayer] =
      await ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
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

    const tx = await lottery.pickWinner();
    await tx.wait();

    balance = await lottery.getBalance();
    expect(balance).to.equal(ethers.utils.parseEther("0"));

    const winner = await lottery.lotteryHistory(0);
    // winner should not be empty
    expect(winner).not.to.equal("0x0000000000000000000000000000000000000000");
    console.log("Winner is", winner);
  });
});
