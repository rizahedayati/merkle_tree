import keccak256 from "keccak256";
import { Buffer } from 'buffer';

// Hashes data and returns a hex string
export function getHash(data) {
	return bufferToHex(keccak256(data));
}

function bufferToHex (value, withPrefix = true) {
    return `${withPrefix ? '0x' : ''}${(value || Buffer.alloc(0)).toString(
      'hex'
    )}`
}

