const getHash = require("./helper");
class MerkleNode {
  constructor(value, left = null, right = null) {
    this.value = getHash(value);
    this.left = left;

    this.right = right;
    // this.children = children;
    // this.parent = parent
  }
}
module.exports = MerkleNode;

