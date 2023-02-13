pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Coin is ERC20 {
    mapping(address => bool) public history;

    event Reward(address indexed account, uint256 amount);

    constructor(uint256 initialSupply) ERC20("Coin", "BTC") {
        _mint(msg.sender, initialSupply);
    }

    function reward(address account) public {
        require(!history[account], "You have already got your reward");
        //_mint(account, 1);
        _transfer(msg.sender, account, 1);
        history[account] = true;
    }


}
