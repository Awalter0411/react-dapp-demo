// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
const { ethers } = require("hardhat");

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();

  console.log("Counter deployed to:", counter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
