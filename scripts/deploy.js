const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.01")
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);

  const addresses = { waveContract: waveContract.address };
  fs.writeFileSync(
    "client/src/.env/contract-addresses.json",
    JSON.stringify((addresses))
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
