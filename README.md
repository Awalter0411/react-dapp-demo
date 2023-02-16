# react-dapp-demo

> A counter example about DApp

## Before starting

### Knowledge

- Hardhat
- Solidity
- Node.js
- React

### Account and Key

- make sure you are already MeteMask account
- sign up account in Alchemy and create a app for providing API_KEY in this project.

## Usage

1. install dependencies

   ```bash
   npm install

   cd frontend

   npm install

   cd ..
   ```

2. change `hardhat.config.js`

   Please create `.env` file like `.env.example` file, and make sure you have `ALCHEMY_API_KEY` and `GOERLI_PRIVATE_KEY`.

   ```js
   require("@nomicfoundation/hardhat-toolbox");
   require("dotenv").config();

   // ALCHEMY_API_KEY
   // Go to https://www.alchemyapi.io, sign up, create
   // a new App in its dashboard, and replace "KEY" with its key

   // GOERLI_PRIVATE_KEY
   // Replace this private key with your Goerli account private key
   // To export your private key from Metamask, open Metamask and
   // go to Account Details > Export Private Key
   // Beware: NEVER put real Ether into testing accounts

   const { ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY } = process.env;

   /** @type import('hardhat/config').HardhatUserConfig */
   module.exports = {
     solidity: "0.8.17",
     networks: {
       goerli: {
         url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
         accounts: [GOERLI_PRIVATE_KEY],
       },
     },
   };
   ```

3. test contracts

   ```bash
   npx hardhat test
   ```

4. compile contracts

   ```bash
   npx hardhat compile
   ```

5. deploy

   ```bash
   npx hardhat node

   npx hardhat run scripts/deploy.js --network goerli
   ```

   you can see contract address in terminal, copy it and pause in `frontend/contract/Token.json` at `Token` field.

   Then copy artifacts/contracts/Counter.json in frontend/contract/Counter.json

6. start frontend app

   ```bash
   cd frontend

   npm run dev
   ```

7. enjoy it.
