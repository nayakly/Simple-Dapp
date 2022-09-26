
require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

// Add faucet task to hardhat
require("./tasks/faucet");

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    }
    ,
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
