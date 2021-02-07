pragma solidity ^0.6.0;

import "./ChildFlat.sol";

contract Shame is
    ChildERC721("Shame", "SMH", 0xb5505a6d998549090530911180f38aC5130101c6)
{
    uint256 nextTokenID;

    function mint(address frontRunner) external {
        require(frontRunner != address(0));
        nextTokenID++;
        _safeMint(frontRunner, nextTokenID);
    }

    function approve(address to, uint256 tokenId) public override {
        revert("No approvals");
    }

    function setApprovalForAll(address operator, bool approved)
        public
        override
    {
        revert("No approvals");
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        revert("Transfers are not allowed");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        revert("Transfers are not allowed");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override {
        revert("Transfers are not allowed");
    }
}