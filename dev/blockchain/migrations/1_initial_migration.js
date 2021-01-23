const Migrations = artifacts.require("Migrations");
const Shame = artifacts.require("Shame");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Shame);
};
