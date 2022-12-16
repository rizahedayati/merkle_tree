const express = require("express");

let router = express.Router();

router.all("/", (req, res) => {
  res.send({ message: "Hello from merkle server!" });
});

module.exports = router;
