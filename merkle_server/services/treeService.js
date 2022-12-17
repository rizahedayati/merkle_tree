const MerkleTree = require("./../merkle/merkleTree");
const TreeModel = require("./../db/treeModel");
const getHash = require("../merkle/helper");

async function initTree() {
  try {
    const whiteList = [
      "0xdb9B58A23CbAC3e21b3A0516C40958104E3f7119",
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",

    ];
    const tree_size = await getTreeSize();
    if (tree_size == 0) {
      await insertNewTree(whiteList);
    } else {
      console.log("The genesis tree is already initialized");
    }
  } catch (err) {
    return { error: err };
  }
}

async function insertNewTree(data) {
  try {
    await deleteAll();
    const tree = new MerkleTree();
    tree.createTree(data);
    for (let i = 0; i < tree.tree.length; i++) {
      const treeObj = new TreeModel({
        tree: tree.tree[i],
        level:
          i == 0
            ? "ROOT"
            : i == tree.tree.length - 2
            ? "LEAF"
            : i == tree.tree.length - 1
            ? "DATA"
            : "PARENT",
        depth: i,
      });

      treeObj.save().then(
        () => console.log(`TREE LEVEL ${i} stored`),
        (err) => console.log(err)
      );
    }
    return tree;
  } catch (err) {
    return { error: err };
  }
}

async function addAddress(newAddress) {
  try {

    const treeObj = await createTreeObj();
    const old_data = treeObj.data;

    old_data.push(newAddress);
    const new_data = old_data;
    const newTree = await insertNewTree(new_data);

    console.log(newTree,"NewTree");

    const lastNodeIndex = newTree.data.length-1;
    const lastNodeProofs = newTree.getProof(newAddress);
    const newRoot = newTree.root.value;

    if (lastNodeProofs.length == 0) {
      return {
        status: true,
        data: [],
        statusCode: 403,
        message: `permission denied`,
      };  
    }
 
    return {
      status: true,
      data: {
        lastNodeIndex,
        lastNodeProofs,
        newRoot
      },
      statusCode: 200,
    };
  } catch (err) {
    return { error: err };
  }
}

async function mintNFT(signer) {
  try {

    const treeObj = await createTreeObj();

    const proofs = await treeObj.getProof(signer);
    const root = treeObj.root.value;
    const position = treeObj.getDataPosition(signer);

    console.log(position,"position");


    if (proofs.length == 0) {
      return {
        status: true,
        data: [],
        statusCode: 403,
        message: `permission denied`,
      };  
    }
    return {
        status: true,
        data: {
          proofs,
          root,
          position
        },
        statusCode: 200,
        message: `success`,
    };
    
  } catch (err) {
    return { error: err };
  }
}

async function getTreeSize() {
  try {
    return await TreeModel.countDocuments({}).exec();
  } catch (err) {
    return { error: err };
  }
}

async function createTreeObj() {
  try {
    const data = await findByLevel("DATA");
    const treeObj = new MerkleTree();
    treeObj.createTree(data);

    return treeObj;
  } catch (err) {
    return { error: err };
  }
}

async function findAll() {
  try {
    return await TreeModel.find({}).sort({ depth: 1 });
  } catch (err) {
    return { error: err };
  }
}

async function findByLevel(level) {
  try {
    const list = await TreeModel.find({ level: level });
    return list[0].tree;
  } catch (err) {
    return { error: err };
  }
}

async function findRootValue() {
  try {
    const root = await TreeModel.find({ depth: 0 });
    return root[0].tree[0].value;
  } catch (err) {
    return { error: err };
  }
}

async function deleteAll() {
  try {
    return await TreeModel.deleteMany({});
  } catch (err) {
    return { error: err };
  }
}
module.exports = {
  addAddress,
  mintNFT,
  initTree,
  getTreeSize,
  findAll,
  findByLevel,
  findRootValue,
  deleteAll,
  createTreeObj,
};
