//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "./MerkleTree.sol";

contract Whitelist is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    bytes32 public merkleRoot;
    address public immutable admin = 0x1c31DFc8471cc36125fdF0EA1eb56C47a6bC6eC0;

    constructor(bytes32 _merkleRoot)
        ERC721("Spark world", "SPARK")
    {
        merkleRoot = _merkleRoot;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "permission denied");
        _;
    }

    modifier onlyWhiteList(bytes32[] memory _merkleProof) {
       bytes32 node = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, node),
            "invalid proof"
        );
        _;
    }

    function addAddress(
        uint256 _lastIndex,
        bytes32 _nodeHash,
        bytes32[] memory _proof
    ) external onlyAdmin {
        merkleRoot = MerkleTree.calcRoot(_lastIndex,_nodeHash, _proof);
    }

    // function addAddress(
    //     bytes32 _newRoot
    // ) external onlyAdmin {
    //     merkleRoot = _newRoot;
    // }

    function mint(bytes32[] memory _merkleProof) external onlyWhiteList(_merkleProof) {
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
        _tokenIds.increment();
    }
}
