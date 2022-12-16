const keccak256 = require("keccak256");
const { Buffer } = require('buffer');

// Hashes data and returns a hex string
function getHash(data) {
	return bufferToHex(keccak256(data));
}

function bufferToHex (value, withPrefix = true) {
    return `${withPrefix ? '0x' : ''}${(value || Buffer.alloc(0)).toString(
      'hex'
    )}`
}

module.exports = getHash;