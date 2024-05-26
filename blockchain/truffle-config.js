module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545,        // Ganache CLI port
      network_id: "*",   // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: "0.8.20", // Fetch exact version from solc-bin
      settings: {       // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    }
  },
};
