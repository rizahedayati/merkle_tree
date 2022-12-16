const { addAddress,mintNFT } = require("../services/treeService");

async function addAdress(req, res) {
  try {
    const { address } = req.body.data;
    const result = await addAddress(address);
    return res.status(result.statusCode).send(result);
  } catch (err) {
    res.send(err);
  }
}

async function mint(req, res) {
  try {
    const { signer } = req.body.data;

    console.log("signer",signer);

    const result = await mintNFT(signer);
    return res.status(result.statusCode).send(result);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  addAdress,
  mint,
};
