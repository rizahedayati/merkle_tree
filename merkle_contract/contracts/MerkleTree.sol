//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "hardhat/console.sol";


library MerkleTree {
 
    function calcRoot(
        uint256 _idx,
        bytes32 _leafHash,
        bytes32[] memory _proof
    ) internal pure returns (bytes32 _rootHash) {
        bytes32 _nodeHash = _leafHash;

        for (uint256 i = 0; i < _proof.length; i++) {
            uint256 _peerIdx = (_idx / 2) * 2;
            bytes32 _peerHash = _proof[i];
            bytes32 _parentHash = bytes32(0);
            if (_peerIdx > _idx) {
                _parentHash = keccak256(abi.encodePacked(_nodeHash, _peerHash));
            } else {
                _parentHash = keccak256(abi.encodePacked(_peerHash, _nodeHash));
            }

            _idx = _idx / 2;
            _nodeHash = _parentHash;
        }

        return _nodeHash;
    }

    function verify(
        uint256 _idx,
        bytes32 _leafHash,
        bytes32[] memory _proof,
        bytes32 _root
    ) internal pure returns (bool) {
        return calcRoot(_idx, _leafHash, _proof) == _root;
    }
}