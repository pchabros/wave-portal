const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.01")
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  const [, randomPerson] = await hre.ethers.getSigners();
  let postTxn = await waveContract.createPost("1");
  await postTxn.wait();
  postTxn = await waveContract.createPost("2");
  await postTxn.wait();
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));
  let sendMoneyTxn = await waveContract.sendMoney(randomPerson.address, "1000000000000000");
  await sendMoneyTxn.wait();
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
