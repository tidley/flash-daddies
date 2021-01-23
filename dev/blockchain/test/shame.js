const BigNumber = require("bignumber.js");
const Shame = artifacts.require("Shame");
//#endregion
let accounts;
let bad;
let owner;

let shame_contract;

before(async () => {
  accounts = await web3.eth.getAccounts();
  owner = accounts[0];
  bad = accounts[1];
  shame_contract = Shame.deployed();
});

describe("shame tests", () => {
  it("Deploys a contract", async () => {
    assert.ok(Shame.address);
  });
});
