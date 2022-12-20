const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Whitelist = await hre.ethers.getContractFactory("Whitelist");
  const root = "0x2ce206e7b9407e11a9ecf1316fd4231ff143ce5a8479c756e36bbf8f414c9d55";
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

