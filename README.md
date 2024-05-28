# TrustChain

TrustChain is a blockchain-based solution for issuing, verifying, and managing credentials such as certificates, degrees, and other important documents. It utilizes smart contracts on Ethereum to ensure the authenticity and integrity of the issued credentials.

## Directory Structure

```
trustchain/
├── blockchain
│   ├── contracts
│   │   ├── DocumentRegistry.sol
│   │   └── Migrations.sol
│   ├── migrations
│   │   ├── 1_initial_migration.js
│   │   └── 2_deploy_contracts.js
│   ├── truffle-config.js
│   └── ...
├── trust-chain-api
│   ├── src
│   │   ├── auth
│   │   ├── credentials
│   │   ├── users
│   │   ├── wallets
│   │   └── ...
│   ├── test
│   ├── .env
│   ├── package.json
│   └── ...
├── trust-chain-ui
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── ...
│   ├── package.json
│   └── ...
├── LICENSE
├── README.md
└── CONTRIBUTING.md
```

## Getting Started

### Prerequisites


- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
- ![React.js](https://img.shields.io/badge/React.js-61DAFB?logo=react&logoColor=white)
- ![Truffle](https://img.shields.io/badge/Truffle-5E464D?logo=truffle&logoColor=white)
- ![Ganache](https://img.shields.io/badge/Ganache-EA7314?logo=ganache&logoColor=white)
- ![MetaMask](https://img.shields.io/badge/MetaMask-F6851B?logo=metamask&logoColor=white)
- ![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)
- ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
- ![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trustchain.git
   cd trustchain
   ```

2. **Install dependencies for each part of the project**

   - **Blockchain**
     ```bash
     cd blockchain
     npm install -g ganache
     npm install -g truffle
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

3. **Setup Environment Variables for Trust-Chain API**
   
   Create a `.env` file in the `trust-chain-api` folder and add the following environment variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=trust_chain
   JWT_SECRET=uY5pX4G1yQZLh+6Y6LJ2+p9xKbL6mVSTwXr8o+6kjkA=
   PROVIDER_URL=http://127.0.0.1:8545
   PRIVATE_KEY=0xe00733d4245fd8db67409e940565599b34844db29635843b3a203e8324f56180  // blockchain (ganache private key)
   CONTRACT_ADDRESS=0x5e98a8DDdd3b956d613Bd7dD70582C3a952F5210  // contract address
   ```

### Running the Project

1. **Start Ganache**
   ```bash
   cd blockchain
   ganache-cli
   ```

2. **Deploy the Smart Contracts**
   ```bash
   cd blockchain
   truffle migrate --network development
   ```

3. **Start the Trust-Chain API**
   ```bash
   cd ../trust-chain-api
   npm run start:dev
   ```

4. **Start the Trust-Chain UI**
   ```bash
   cd ../trust-chain-ui
   npm start
   ```

### Using MetaMask with Ganache

1. Open MetaMask and add a custom RPC network:
   - **Network Name**: Local Ganache
   - **New RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH

2. Import accounts from Ganache into MetaMask using their private keys.

### API Documentation

Access the API documentation at [Swagger](http://localhost:3000/api#).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
