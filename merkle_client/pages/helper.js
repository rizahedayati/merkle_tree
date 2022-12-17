
import { ethers } from "ethers";



// Hashes data and returns a hex string
export function getHashPair(a,b) {
	return ethers.utils.solidityKeccak256(["bytes32", "bytes32"], [a, b])

}

export function getHash(data) {
	return  ethers.utils.solidityKeccak256(["address"], [data]);
}



