const keccak256 = require("keccak256");
const { Buffer } = require('buffer');
const { ethers } =require("ethers");

// Hashes data and returns a hex string
function getHashPair(a,b) {
	return ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [a, b])

}

function getHash(data) {
	return  ethers.utils.solidityKeccak256(["address"], [data]);
}

function bufferToHex (value, withPrefix = true) {
    return `${withPrefix ? '0x' : ''}${(value || Buffer.alloc(0)).toString(
      'hex'
    )}`
}

module.exports = {
  getHash,
  getHashPair
};