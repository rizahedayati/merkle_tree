//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./MerkleTree.sol";

contract Whitelist is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    bytes32 public merkleRoot;
    address public immutable admin = 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199;
    

    constructor(bytes32 _merkleRoot) ERC721("Spark world", "SPARK") {
        merkleRoot = _merkleRoot;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "permission denied");
        _;
    }

    modifier onlyWhiteList(
        uint256 _idx,
        bytes32 _leafHash,
        bytes32[] memory _proof,
        bytes32 _root
    ) {
        require(
            MerkleTree.verify(_idx, _leafHash, _proof, _root),
            "invalid proof"
        );
        _;
    }

    function addAddress(
        uint256 _lastIndex,
        bytes32 _nodeHash,
        bytes32[] memory _proof
    ) external onlyAdmin {
        merkleRoot = MerkleTree.calcRoot(_lastIndex, _nodeHash, _proof);
    }


    function mint(
        uint256 _idx,
        bytes32 _leafHash,
        bytes32[] memory _proof,
        bytes32 _root
    ) external onlyWhiteList(_idx, _leafHash, _proof, _root) {
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
        _tokenIds.increment();
    }
}
