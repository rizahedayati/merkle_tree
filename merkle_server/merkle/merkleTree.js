const {getHash,getHashPair} = require("./helper");
const MerkleNode = require("./merkleNode");

class MerkleTree {
  constructor() {
    this.tree = [];
    this.root = null;
    this.parentNodes = [];
    this.leafNodes = [];
    this.data = [];
    this.size = 0;
  }
  /**
   * Takes a list of data as input and and create merkleTree
   * @param {data} data
   */
  createTree(data) {
    this.data = data;
    this.tree.unshift(data);
    this.createLeafNodes(data);
    this.tree.unshift(this.leafNodes);
    this.createParentNode(this.leafNodes);
  }

  createParentNode(arr) {
    //add root node to tree
    if (arr.length === 1) {
      this.root = arr[0];
      return;
    }
    //add parent nodes to tree
    const list = [];
    let node = null;
    const length = arr.length;
    for (let i = 0; i < length; i += 2) {
      const currentItem = arr[i];
      if (i + 1 >= length) {
        node = new MerkleNode(getHashPair(currentItem.value,currentItem.value), currentItem, null);
        list.push(node);
        break;
      }
      const nextItem = arr[i + 1];
      let value = getHashPair(currentItem.value , nextItem.value);
      node = new MerkleNode(value, currentItem, nextItem);
      list.push(node);
    }
    this.parentNodes.unshift(list);
    this.tree.unshift(list);
    return this.createParentNode(list);
  }

  createLeafNodes(data) {
    this.leafNodes = data.map((item) => new MerkleNode(getHash(item)));
  }

  getProof(data) {
    let position = this.leafNodes.findIndex(
      (item) => item.value == getHash(data)
    );
    let nodeValue = getHash(data);
    let proofs = [];
    const treeLength = this.tree.length;
    if (position >= 0) {
      for (let i = treeLength - 2; i > 0; i--) {
        let neighbour = null;
        let currentTreeLength = this.tree[i].length;

        if (position % 2 == 0 && position != currentTreeLength - 1) {
          neighbour = this.tree[i][position + 1];
          position = Math.floor(position / 2);
          nodeValue = getHashPair(nodeValue ,neighbour.value);
          proofs.push(neighbour.value);
        } else if (position % 2 == 0 && position == currentTreeLength - 1) {
          neighbour = this.tree[i][position];
          position = Math.floor(position / 2);
          nodeValue = getHashPair(neighbour.value,neighbour.value);
          proofs.push(neighbour.value);
        } else {
          neighbour = this.tree[i][position - 1];
          position = Math.floor(position / 2);
          nodeValue = getHashPair(neighbour.value , nodeValue);
          proofs.push(neighbour.value);
        }
      }
      return nodeValue == this.root.value ? proofs : [];
    } else {
      console.log("Data not found with the id");
      return false;
    }
  }

  verify(data) {
    let position = this.leafNodes.findIndex(
      (item) => item.value == getHash(data)
    );
    let nodeValue = getHash(data);
    const treeLength = this.tree.length;
    if (position >= 0) {
      for (let i = treeLength - 2; i > 0; i--) {
        let neighbour = null;
        let currentTreeLength = this.tree[i].length;

        if (position % 2 == 0 && position != currentTreeLength - 1) {
          neighbour = this.tree[i][position + 1];
          position = Math.floor(position / 2);
          nodeValue = getHashPair(nodeValue , neighbour.value);
        } else if (position % 2 == 0 && position == currentTreeLength - 1) {
          neighbour = this.tree[i][position];
          position = Math.floor(position / 2);
          nodeValue = getHashPair(neighbour.value,neighbour.value);
        } else {
          neighbour = this.tree[i][position - 1];
          position = Math.floor(position / 2);
          nodeValue = getHashPair(neighbour.value , nodeValue);
        }
      }
      return nodeValue == this.root.value ? true : false;
    } else {
      console.log("Data not found with the id");
      return false;
    }
  }

  /**
   * add new node to merkle tree - its performance not good
   * @param {newData} newData
   */
  addNewNode(newData) {
    this.data.push(newData);
    this.leafNodes = [];
    this.parentNodes = [];
    this.tree = [];
    this.createTree(this.data);
  }

  getTree() {
    return this.tree;
  }

  getDataSize() {
    this.data.length;
  }

  getDataPosition(data) {
    return this.leafNodes.findIndex(
      (item) => item.value == getHash(data)
    );
  }

  setTree(_tree)  {
    this.tree = _tree;
  }

  setParentNode(_parentNodes) {
    this.parentNodes = _parentNodes;
  }

  setLeafNodes(_leafNode) {
    this.leafNodes = _leafNode;
  }

  setData(_data) {
    this.data = _data;
  }

  getRoot() {
    return this.root;
  }

  getRootValue() {
    return this.root.value;
  }

  getParentNodes() {
    return this.parentNodes;
  }

  getLeafNodes() {
    return this.leafNodes;
  }
}

module.exports = MerkleTree;
