require('dotenv').config();
const axios = require('axios');

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
  let txHash =
    '0xc7f675b7b43d029cda1209c0255edd33e417aa681e389d4778bfad6b59f018a4';

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

  console.log('contract is fine');

  let response = await contract.methods[method](
    String(inputs[0]),
    String(inputs[1]),
    String([inputs[2][0].toString(), inputs[2][1].toString()]),
    String(inputs[3].toString()),
    String(inputs[4].toString()),
  ).send({ from: UNLOCK });

  console.log(response);
}

main();
