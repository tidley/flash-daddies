const Migrations = artifacts.require("Migrations");
const ChildFlat = artifacts.require("ChildFlat.sol");
const shame = artifacts.require("shame.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ChildFlat);
  deployer.deploy(shame);
};
