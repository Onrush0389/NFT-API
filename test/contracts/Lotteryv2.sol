// SPDX-License-Identifier: UNLICENSED
// import console.log
import "hardhat/console.sol";

pragma solidity ^0.8.11;

contract LotteryV2 {
    address public owner;
    address payable[] public players;
    address payable[][] public lotteryHistory;

    constructor() {
        owner = msg.sender;
    }

    function getLotteryHistoryLength() public view returns (uint256) {
        return lotteryHistory.length - 1;
    }

    function getWinnersByLottery(uint256 index)
        public
        view
        returns (address payable[] memory)
    {
        return lotteryHistory[index];
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        // require at least 0.1 ether for entering
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }

    function getRandomNumber() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    /**
     * Pick n winners from the players array
     * If reward has remainder, the last winner will get the remainder
     */
    function pickWinners(uint256 size) public onlyowner {
        require(size <= players.length);
        require(size > 0);

        address payable[] memory winners = new address payable[](size);
        // current balance of the contract
        uint256 balance = address(this).balance;

        for (uint256 i = 0; i < size; i++) {
            uint256 index = getRandomNumber() % players.length;
            address payable winner = players[index];
            uint256 reward = balance / size;
            if (i == size - 1) {
                // last winner gets the remainder
                reward = address(this).balance;
            }
            winner.transfer(reward);
            winners[i] = winner;
            players[index] = players[players.length - 1];
            players.pop();
        }

        lotteryHistory.push(winners);
    }

    modifier onlyowner() {
        require(msg.sender == owner);
        _;
    }
}
