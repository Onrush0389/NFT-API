// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "NFT") {}

    function awardToken(address owner, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 tokenId = _tokenIds.current();
        _mint(owner, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenIds.increment();
        return tokenId;
    }

}
