// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract Shame is ERC721("Shame", "SHM"), Ownable {
    // using Address for address;
    uint256 nextTokenID;

    function mint(address frontRunner) external {
        require(frontRunner != address(0));
        nextTokenID++;
        _safeMint(frontRunner, nextTokenID);
    }

    function approve(address to, uint256 tokenId) public pure override {
        revert("No approvals");
    }

    function setApprovalForAll(address operator, bool approved)
        public
        pure
        override
    {
        revert("No approvals");
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public pure override {
        revert("Transfers are not allowed");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public pure override {
        revert("Transfers are not allowed");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public pure override {
        revert("Transfers are not allowed");
    }
}
