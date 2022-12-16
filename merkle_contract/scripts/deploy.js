const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Whitelist = await hre.ethers.getContractFactory("Whitelist");
  const root = "0xd9c28690468f1f286339f64ca101da1933a4a48aff29100156ed7dada2d277c3";
  const whitelist = await Whitelist.deploy(root);
  await whitelist.deployed();
  console.log("whitelist deployed to:", whitelist.address);

  fs.writeFileSync('./config.js', `
  export const whitelist_Address = "${whitelist.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

