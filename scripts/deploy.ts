import { ethers, network } from "hardhat";
import chalk from "chalk";

const dim = (text: string) => {
  console.log(chalk.dim(text));
};

const green = (text: string) => {
  console.log(chalk.green(text));
};

async function main() {
  const signers = await ethers.getSigners();
  dim(`signer: ${signers[0].address}`);
  const CarbonCredit = await ethers.getContractFactory("ChildMintableERC20");
  const MumbaiChildManager = "0xb5505a6d998549090530911180f38aC5130101c6";
  // const MainnetChildManager = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";
  const credit = await CarbonCredit.deploy(
    "Wakanda Carbon Credit",
    "WCO2",
    signers[0].address,
    MumbaiChildManager
  );
  await credit.deployed();
  green(`CarbonCredit deployed to: ${credit.address}`);
  dim(
    `hh verify --network ${network.name} ${credit.address} "Wakanda Carbon Credit" WCO2 ${signers[0].address}`
  );

  // const CapAndTrade = await ethers.getContractFactory("CapAndTrade");
  // const capAndTrade = await CapAndTrade.deploy(
  //   credit.address,
  //   "10000000000000000000",
  //   2022,
  //   2060
  // );
  //
  // await capAndTrade.deployed();
  // green(`CapAndTrade deployed to: ${capAndTrade.address}`);
  // dim(
  //   `hh verify --network ${network.name} ${capAndTrade.address} ${credit.address} 10000000000000000000 2022 2060`
  // );
  //
  // dim(`Grant role to CapAndTrade...`);
  // const MINTER_ROLE = await credit.MINTER_ROLE();
  // await credit.grantRole(MINTER_ROLE, capAndTrade.address);
  // dim(`Grant success!`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
