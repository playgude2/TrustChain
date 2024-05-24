const DocumentRegistry = artifacts.require("DocumentRegistry");

module.exports = function(deployer) {
  deployer.deploy(DocumentRegistry);
};
