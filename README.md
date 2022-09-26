# Simple Dapp

This is a simple dapp that connects to your wallet and lets you transfer HHT tokens on the Hardhat Network. This was inspired by the [hardhat boilerplate](https://github.com/NomicFoundation/hardhat-boilerplate) but uses [Svelte](https://svelte.dev/) for the frontend, [Tailwind](https://tailwindcss.com/) for the CSS and  [Svelte French Toast](https://svelte-french-toast.com/) for notifications. *While ERC20 tokens have a decimal of 18, note that the token HHT (created in this project) has a decimal of zero just like in the hardhat boilerplate.*

## Project Directory Structure

📦Simple Dapp  
 ┣ 📂artifacts  
 ┣ 📂contracts   
 ┃ ┗ 📜token.sol   
 ┣ 📂frontend  
 ┃ ┣ 📂src  
 ┃ ┃ ┣ 📂components  
 ┃ ┃ ┃ ┣ 📜Transfer.svelte  
 ┃ ┃ ┃ ┗ 📜Wallet.svelte  
 ┃ ┃ ┣ 📂contracts  
 ┃ ┃ ┃ ┣ 📜contract-address.json  
 ┃ ┃ ┃ ┗ 📜token.json  
 ┃ ┃ ┣ 📂stores  
 ┃ ┃ ┃ ┗ 📜store.js  
 ┃ ┃ ┣ 📜App.svelte  
 ┃ ┃ ┣ 📜main.js  
 ┃ ┃ ┗ 📜vite-env.d.ts  
 ┃ ┣ 📜index.html  
 ┃ ┣ 📜package-lock.json  
 ┃ ┗ 📜package.json  
 ┣ 📂scripts    
 ┃ ┗ 📜deploy.js  
 ┣ 📂tasks  
 ┃ ┗ 📜faucet.js  
 ┣ 📂test  
 ┃ ┗ 📜test.js  
 ┣ 📜.env  
 ┣ 📜hardhat.config.js  
 ┣ 📜package-lock.json  
 ┗ 📜package.json  

As a beginner, it can be overwhelming when you first see the directory structure. In this section, I'll try to break this down, so it becomes easier to understand. 

All files related to the smart contract are in the `root` directory. And files related to the frontend are in `/frontend`. 

Contracts can be found in `/contracts`. The contract tests (tests written to test the contract) can be found in `/test` .  A faucet has been set up at `/tasks/faucet.js` to disseminate tokens on the hardhat network.  We specify the network we deploy to in the  `hardhat.config.js` file. The script used deploy the contract can be found in `/scripts`. 

Once we deploy the contract, we'll see a folder called `/artifacts` being generated which holds all the compiled contracts. Also, on deployment, we automatically create a `/frontend/src/contracts` folder which will have two files. `contract-address.json` has the address of the deployed contract and `token.json` has the compiled contract's ABI. These are for use in the frontend.

As for the frontend, `/frontend/src/App.svelte` is the main file. In this file, two components are embedded. `/frontend/src/components/Wallet.svelte` connects the user's wallet to the contract at the click of a button. The user balance, contract, and provider object are stored in the Svelte store `/frontend/src/stores/store.js`. Transfer of tokens are handled by `/frontend/src/components/Transfer.svelte` .

## Setting Up
### 1. Clone/Download the Repository

### 2. Create a .env file

While our goal is to run the contract on the Hardhat Network, it is also possible to deploy this on the Testnet or Mainnet. Create a `.env` file and fill in dummy values for `API_KEY` and `PRIVATE_KEY` to prevent errors.
```
API_KEY = "API key"
PRIVATE_KEY = "private key of burner wallet"
```
### 3. Install Dependencies

     npm install

### 4. Run Hardhat's Testing Network

     npx hardhat node

### 5. Deploy your Contract

Then, on a new terminal, go to the repository's root folder and run this to deploy your contract on the Hardhat Network

     npx hardhat run scripts/deploy.js --network localhost

If we were to deploy this on Goerli Testnet instead, then we would run this command `npx hardhat run scripts/deploy.js --network goerli`

### 6. Run the Frontend

Finally, on a new terminal, go to the repository's root folder and run this to get your frontend running.

    cd frontend
    npm install
    npm run dev

Make sure you have [Metamask](https://metamask.io/) installed and listening to `localhost 8545` to interact with the dapp. If things go well, you should see this on your screen.

![demo](https://user-images.githubusercontent.com/112154673/192204347-68b17ecd-0d32-4beb-92c9-f5e5f735703d.gif)






