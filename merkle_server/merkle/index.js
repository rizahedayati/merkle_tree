const getHash = require("./helper");
const MerkleTree = require("./merkleTree");

const whiteList = [
    "0xdb9B58A23CbAC3e21b3A0516C40958104E3f7119",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    // "0x9965507D1a55bcC2695C58ba16FB37d819B0A4d0",
    // "0x9965507D1a55bcC2695C58ba16FB37d819B0A4d1",
    // "0x9965507D1a55bcC2695C58ba16FB37d819B0A4d2",
    
];

const tree = new MerkleTree();
 
tree.createTree(whiteList);
console.log(tree.root);

tree.addNewNode("0x9965507D1a55bcC2695C58ba16FB37d819B0A4d5");
console.log(tree.root);

console.log(tree.verify("0x9965507D1a55bcC2695C58ba16FB37d819B0A4d5"));

// console.log(tree.addNewNode("0x9965507D1a55bcC2695C58ba16FB37d819B0A4d0");
