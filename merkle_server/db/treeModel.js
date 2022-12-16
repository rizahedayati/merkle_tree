const mongoose = require("mongoose");


const treeSchema = new mongoose.Schema({
    tree: Array,
    level: String,
    depth: Number
});
const TreeModel = mongoose.model('Tree', treeSchema);

module.exports = TreeModel