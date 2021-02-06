require('dotenv').config();
const axios = require('axios');

const BigNumber = require('bignumber.js');

const storage = require('node-persist');

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || process.env.INFURA);
const web3Local = new Web3('http://127.0.0.1:7545');

const ETHERSCAN = process.env.ETHERSCAN;

const UNLOCK = '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8';

// Save initial balances at start of run
let balanceInitEth = 0;
let balanceInitDai = 0;
let balanceInitWeth = 0;
let balanceInitWbtc = 0;
// Save profit during run
let profitEth = 0;
let profitDai = 0;
let profitWEth = 0;
let profitWBtc = 0;

const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const DAI_ABI =
  '[{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';
const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const WETH_ABI =
  '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]';
const WTBC_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';
const WBTC_ABI =
  '[{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]';
let contractDai;
let contractWeth;
let contractWbtc;

const InputDataDecoder = require('ethereum-input-data-decoder');

async function initStorage() {
  await storage.init({
    dir: 'local_abi',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    ttl: false,
    expiredInterval: 2 * 60 * 1000,
    forgiveParseErrors: false,
  });
}
let tokenEth = {};
let tokenDai = {};
let tokenWeth = {};
let tokenWbtc = {};

class Token {
  constructor(contract, name) {
    return {
      'startBal': 0,
      'currentBal': 0,
      'profit': 0,
      'contract': contract,
      'label': name,
    };
  }
}

let balInit = true;
async function main() {
  await initStorage();
  contractDai = new web3.eth.Contract(JSON.parse(DAI_ABI), DAI_ADDRESS);
  contractWeth = new web3.eth.Contract(JSON.parse(WETH_ABI), WETH_ADDRESS);
  contractWbtc = new web3.eth.Contract(JSON.parse(WBTC_ABI), WTBC_ADDRESS);
  tokenEth = { 'startBal': 0, 'profit': 0 };
  tokenDai = new Token(contractDai, 'DAI');
  tokenWeth = new Token(contractWeth, 'WETH');
  tokenWbtc = new Token(contractWbtc, 'WBTC');
  // {
  //   'startBal': 0,
  //   'currentBal': 0,
  //   'profit': 0,
  //   'contract': contractDai,
  //   'label': 'DAI',
  // };
  // tokenWeth = {
  //   'startBal': 0,
  //   'profit': 0,
  //   'contract': contractWeth,
  //   'label': 'WETH',
  // };
  // tokenWbtc = {
  //   'startBal': 0,
  //   'profit': 0,
  //   'contract': contractWbtc,
  //   'label': 'WBTC',
  // };
  tokenEth = await getEthBalance(tokenEth);
  tokenDai = await getTokenBalance(tokenDai);
  tokenWeth = await getTokenBalance(tokenWeth);
  tokenWbtc = await getTokenBalance(tokenWbtc);
  balInit = false;
  const subscription = web3.eth.subscribe(
    'pendingTransactions',
    async (error, txHash) => {
      if (error) {
        console.log;
      }
      await txProcessor(txHash);
    },
  );
}

async function txProcessor(txHash) {
  try {
    let transaction = await web3.eth.getTransaction(txHash);
    const abi = await getAbiLocal(transaction.to);
    // console.log(abi.length);
    const decoder = new InputDataDecoder(abi);
    const decodedInput = decoder.decodeData(transaction.input);
    await sendTx(transaction.to, abi, decodedInput.method, decodedInput.inputs);
  } catch (err) {}
}
//   // https://bloxy.info/functions/38ed1739
//   // let txHash =
//   //   '0xc7f675b7b43d029cda1209c0255edd33e417aa681e389d4778bfad6b59f018a4';
//   // '0x02912a317311711812da4dc6689e7f1f69aa56c0efed9b3ccc0ae5acc649927a';

async function getAbiLocal(to) {
  let _abi = await storage.getItem(to);
  if (!_abi || !_abi.length) {
    _abi = await getAbiRemote(to);
    if (_abi != 'Contract source code not verified') {
      await storage.setItem(to, JSON.parse(_abi));
    }
  }
  return _abi;
}

async function getAbiRemote(to) {
  let etherscanCall = `https://api.etherscan.io/api?module=contract&action=getabi&address=${to}&apikey=${ETHERSCAN}`;
  try {
    let response = await axios.get(etherscanCall);
    // console.log(response.data.result);
    return response.data.result;
  } catch {
    console.log('Error: EtherScan API probably out of credit');
    return '';
  }
}

async function sendTx(to, abi, method, inputs) {
  const contract = await new web3Local.eth.Contract(abi, to);
  const _args = await procInputs(inputs);
  //https://stackoverflow.com/questions/6442371/javascript-unknown-number-of-arguments
  try {
    let response = await contract.methods[method]
      .apply(null, _args)
      .send({ from: UNLOCK });
  } catch (err) {
    console.log(err);
  }

  console.clear();
  console.log('Contract method call:', method);
  const _tokenEth = getEthBalance(tokenEth);
  const _tokenDai = getTokenBalance(tokenDai);
  const _tokenWeth = getTokenBalance(tokenWeth);
  const _tokenWbtc = getTokenBalance(tokenWbtc);
  tokenEth = await _tokenEth;
  tokenDai = await _tokenDai;
  tokenWeth = await _tokenWeth;
  tokenWbtc = await _tokenWbtc;

  // let response = await contract.methods[method](
  //   inputs[0].toString(),
  //   inputs[1].toString(),
  //   [`0x` + inputs[2][0].toString(), `0x` + inputs[2][1].toString()],
  //   `0x` + inputs[3],
  //   inputs[4].toString(),
  // ).send({ from: UNLOCK });
}

function printInfo(method) {
  console.clear();
  console.log('Contract method call:', method);
}

async function getEthBalance(tokenInfo) {
  let _bal = await web3.eth.getBalance(UNLOCK);
  _bal = web3.utils.fromWei(_bal, 'ether');
  if (balInit) {
    tokenInfo.startBal = _bal;
  }
  tokenInfo.profit += _bal - tokenInfo.startBal;
  console.log('ETH balance:', _bal);
  console.log('ETH profit:', tokenInfo.profit);
  return tokenInfo;
}

async function getTokenBalance(tokenInfo) {
  let _bal = await tokenInfo.contract.methods.balanceOf(UNLOCK).call();
  if (balInit) {
    tokenInfo.startBal = _bal;
  }
  tokenInfo.profit += parseInt(_bal) - parseInt(tokenInfo.startBal);
  console.log(`${tokenInfo.label} balance:`, _bal);
  console.log(`${tokenInfo.label} profit:`, tokenInfo.profit);
  return tokenInfo;
}

// async function getDaiBalance() {
//   let _bal = await contractDai.methods.balanceOf(UNLOCK).call();
//   console.log('DAI balance:', _bal);
//   profitDai = parseInt(_bal) - parseInt(balanceInitDai);
//   console.log(' DAI profit:', profitDai);
//   return _bal;
// }

async function procInputs(inputs) {
  let inputObj = [];
  // Creates tx input object
  for (const input of inputs) {
    if (input.words) {
      inputObj.push(input.toString());
    } else if (Array.isArray(input)) {
      let _array = [];
      for (const address of input) {
        _array.push(`0x` + address.toString());
      }
      inputObj.push(_array);
    } else if (typeof input == 'string') {
      inputObj.push(`0x` + input);
    }
  }
  return inputObj;
}

main();
