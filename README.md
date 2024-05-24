# TrustChain

TrustChain is a blockchain-based solution for issuing, verifying, and managing credentials such as certificates, degrees, and other important documents. It utilizes smart contracts on Ethereum to ensure the authenticity and integrity of the issued credentials.

## Directory Structure

trustchain/
├── blockchain
│ ├── contracts
│ │ ├── DocumentRegistry.sol
│ │ └── Migrations.sol
│ ├── migrations
│ │ ├── 1_initial_migration.js
│ │ └── 2_deploy_contracts.js
│ ├── truffle-config.js
│ └── ...
├── trust-chain-api
│ ├── src
│ ├── package.json
│ └── ...
├── trust-chain-ui
│ ├── src
│ ├── package.json
│ └── ...
├── LICENSE
├── README.md
└── CONTRIBUTING.md


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)
- [MetaMask](https://metamask.io/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trustchain.git
   cd trustchain

2. **Install dependencies for each part of the project**

   - **Blockchain**
     ```bash
     cd blockchain
     npm install
     ```

   - **Trust-Chain API**
     ```bash
     cd ../trust-chain-api
     npm install
     ```

   - **Trust-Chain UI**
     ```bash
     cd ../trust-chain-ui
     npm install
     ```

### Running the Project

1. **Start Ganache**
   ```bash
   ganache-cli

cd blockchain
truffle migrate --network development

cd ../trust-chain-api
npm run start:dev


cd ../trust-chain-ui
npm start


Using MetaMask with Ganache
Open MetaMask and add a custom RPC network:

Network Name: Local Ganache
New RPC URL: http://127.0.0.1:8545
Chain ID: 1337
Currency Symbol: ETH
Import accounts from Ganache into MetaMask using their private keys.
