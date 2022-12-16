const ExpressLoader = require("./loader");
new ExpressLoader();



// require("dotenv").config(); // environment variable
// const MerkleTree = require("./merkle/merkleTree");


// const whiteList = [
//     "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
//     "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
//     "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
//     "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
//     "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
//     // "0x9965507D1a55bcC2695C58ba16FB37d819B0A4d0",
//     // "0x9965507D1a55bcC2695C58ba16FB37d819B0A4d1",
//     // "0x9965507D1a55bcC2695C58ba16FB37d819B0A4d2",
    
// ];

// // require packages
// const express = require("express");
// const mongoose = require("mongoose");

// // initialise express
// const app = express();

// //  mondodb connect
// mongoose
// .connect(
//     process.env.MONGODB_URI, 
//     {useNewUrlParser: true, useUnifiedTopology: true}
// )
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log(err));

// const treeSchema = new mongoose.Schema({
//     tree: Array,
//     level: String,
//     depth: Number
// });
// const Tree = mongoose.model('Tree', treeSchema);

// const tree = new MerkleTree();
// tree.createTree(whiteList);



// for(let i=0;i<tree.tree.length;i++) {
//     const treeObj = new Tree({
//         tree: tree.tree[i],
//         level: i==0 ? 'ROOT' : i==tree.tree.length-1 ? "LEAF": "PARENT",
//         depth: i
//     });

//     treeObj.save().then(() => console.log(`TREE LEVEL ${i} stored`), (err) => console.log(err));

// }


// // Create a new document

// // Add the document to Collections
// // Save method can also be written
// // stud.save((err, result) => {
// //     if(err) console.log(err);
// //     else console.log("entry added");
// // });

// // get documents
// app.get('/', (req, res) => {
//     Student.find({}, (err, found) => {
//         if (!err) {
//             res.send(found);
//         } else {
//             console.log(err);
//             res.send("Some error occured!")
//         } 
//     }).catch(err => console.log("Error occured, " + err));
// });

// // Server listen
// app.listen(8080, () => console.log("Server listening to port 3000"));