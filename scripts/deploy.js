// Similar to Writing Tests
const path = require("path");

async function main(){

    // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
      );     
      console.log("Account balance:", (await deployer.getBalance()).toString());
    const Token = await ethers.getContractFactory('token');
    const token = await Token.deploy();
    await token.deployed();

    console.log('Token address:', token.address);
    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
    const fs = require("fs");
    const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ token: token.address }, undefined, 2)
    );
  
    const TokenArtifact = artifacts.readArtifactSync("token");
  
    fs.writeFileSync(
      path.join(contractsDir, "token.json"),
      JSON.stringify(TokenArtifact, null, 2)
    );
  }

main()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
})


// run on hardhat network before pushing to testnet or mainnet -> npx hardhat run scripts/deploy.js

//run on hardhat network localhost 8545 -> npx hardhat run scripts/deploy.js --network localhost

// run on testnet/mainnet -> npx hardhat run scripts/deploy.js --network <network-name>