// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract Lottery {
    address public owner;
    address payable[] public players;
    address payable[] public lotteryHistory;

    constructor() {
        owner = msg.sender;
    }

    function getLotteryHistoryLength() public view returns (uint256) {
        return lotteryHistory.length - 1;
    }

    function getWinnerByLottery(uint256 index)
        public
        view
        returns (address payable)
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

    function pickWinner() public onlyowner {
        uint256 index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance);

        lotteryHistory.push(players[index]);

        // reset the state of the contract
        players = new address payable[](0);
    }

    modifier onlyowner() {
        require(msg.sender == owner);
        _;
    }
}
