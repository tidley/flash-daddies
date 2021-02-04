require('dotenv').config();
const axios = require('axios');

const BigNumber = require('bignumber.js');

const storage = require('node-persist');

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || process.env.INFURA);
const web3Local = new Web3('http://127.0.0.1:7545');

const ETHERSCAN = process.env.ETHERSCAN;

const UNLOCK = '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8';

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

async function main() {
  await initStorage();
  // const subscription = web3.eth.subscribe(
  //   'pendingTransactions',
  //   function (error, result) {
  //     if (!error) console.log(result);

  // https://bloxy.info/functions/38ed1739
  let txHash =
    '0xc7f675b7b43d029cda1209c0255edd33e417aa681e389d4778bfad6b59f018a4';
  // '0x02912a317311711812da4dc6689e7f1f69aa56c0efed9b3ccc0ae5acc649927a';

  let transaction = await web3.eth.getTransaction(txHash);

  const abi = await getAbiLocal(transaction.to);

  const decoder = new InputDataDecoder(abi);
  const decodedInput = decoder.decodeData(transaction.input);

  console.log(decodedInput.method);

  sendTx(transaction.to, abi, decodedInput.method, decodedInput.inputs);

  //   web3.eth.getTransaction(tx).then(async (thisTx) => {
  // console.log(thisTx)
  // console.log(thisTx);\.then((res) => {
  //     // let _abi = await res;
  //     console.log('etherscanCall:', res);
  //   });

  //   let _abi = await getAbiLocal(_to);
  //   console.log(_abi);
  //   });
  //   },
  // );
}

async function getAbiLocal(to) {
  let _abi = await storage.getItem(to);
  if (!_abi || !_abi.length) {
    _abi = await getAbiRemote(to);
    await storage.setItem(to, JSON.parse(_abi));
    console.log('new abi');
  }
  return _abi;
}

async function getAbiRemote(to) {
  let etherscanCall = `https://api.etherscan.io/api?module=contract&action=getabi&address=${to}&apikey=${ETHERSCAN}`;
  try {
    let response = await axios.get(etherscanCall);
    return response.data.result;
  } catch {
    console.log('Error: EtherScan API probably out of credit');
    return '';
  }
}

async function sendTx(to, abi, method, inputs) {
  const contract = await new web3Local.eth.Contract(abi, to);

  var copy = [].slice.call(arguments);

  // Arguments
  // https://stackoverflow.com/questions/3914557/passing-arguments-forward-to-another-javascript-function
  let _args = [];

  _args[0] = inputs[0].toString();
  _args[1] = inputs[1].toString();
  _args[2] = [`0x` + inputs[2][0].toString(), `0x` + inputs[2][1].toString()];
  _args[3] = `0x` + inputs[3];
  _args[4] = inputs[4].toString();

  console.log('contract is fine');

  let response = await contract.methods[method](
    _args,
    // inputs[0].toString(),
    // inputs[1].toString(),
    // [`0x` + inputs[2][0].toString(), `0x` + inputs[2][1].toString()],
    // `0x` + inputs[3],
    // inputs[4].toString(),
  ).send({ from: UNLOCK });

  console.log(response);
}

function argMaker() {
  return (
    inputs[0].toString(),
    inputs[1].toString(),
    [`0x` + inputs[2][0].toString(), `0x` + inputs[2][1].toString()],
    `0x` + inputs[3],
    inputs[4].toString()
  );
}

async function procInputs(inputs) {
  let inputObj;
  // Creates tx input object
  for (const input of inputs) {
    // inputObj += (if (inputs[0]) inputs[0].toString())
    if (typeof input == string) {
    }
  }
}

async function getWalletBalance() {
  // Eth
  // Dai
}

main();
