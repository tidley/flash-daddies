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
  shame_contract = await Shame.deployed();
});

describe("shame tests", () => {
  it("Deploys the ERC721 contract", async () => {
    assert.ok(Shame.address);
  });
  it("mints a token to the bad address", async () => {
    let bad_initial_balance = await shame_contract.balanceOf(bad);
    await shame_contract.mint(bad, { from: owner });
    let bad_final_balance = await shame_contract.balanceOf(bad);
    assert(bad_initial_balance.toNumber() + 1 == bad_final_balance.toNumber());
  });
});
