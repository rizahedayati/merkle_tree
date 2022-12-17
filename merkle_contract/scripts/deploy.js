const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Whitelist = await hre.ethers.getContractFactory("Whitelist");
  const root = "0x5f2c89da171a5e62a50024db2e50cbfbb17348afdab4e2c27a406ae64617a36a";
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

