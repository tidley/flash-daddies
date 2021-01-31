require('dotenv').config();

const Web3 = require('web3');
const net = require('net');
// const storage = require('node-persist');
//const InputDataDecoder = require('ethereum-input-data-decoder');

// const decoder = new InputDataDecoder(`./uniSwap.json`);
const infuraEndpoint = process.env.INFURA;
// const web3 = new Web3(new Web3.providers.IpcProvider('/mnt/ssd/geth.ipc', net));
const web3 = new Web3(new Web3.providers.IpcProvider(infuraEndpoint, net));

// const dataStorage = storage.create({
//     dir: '/home/pi/SHAME',
// });

// dataStorage.init();

async function repeatFun() {
  setTimeout(() => {
    return 'loop';
  }, 1000);
}

async function getTxs() {
  // web3.eth.isSyncing().then((result)=>{
  //     console.log(reus)
  // })

  // var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
  //     if (!error)
  //         console.log(result);
  // })
  // .on("data", function(transaction){
  //     console.log(transaction);
  // });

  // repeatFun().then(()=>{console.log("hmmm")})

  // await web3.eth.filter("pending").watch(
  //     function(error,result){
  //         if (!error) {
  //             console.log("pending" + result);
  //         }
  //     }
  //   )

  /// SUBSCRIBE TO NEW BLOCK HEADERS - DOESNT WORK
  // var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
  //     if (!error) {
  //         console.log(result);

  //         return;
  //     }

  //     console.error(error);
  // })
  // // .on("connected", function(subscriptionId){
  // //     console.log(subscriptionId);
  // // })
  // .on("data", function(blockHeader){
  //     console.log(blockHeader);
  // })
  // .on("error", console.error);

  // web3.eth.getAccounts(console.log);
  // web3.eth.getBlockUncleCount("0x407d73d8a49eeb85d32cf465507dd71d507100c1")
  // .then(console.log);
  web3.eth.getBlock('latest').then(console.log);
}

getTxs();

// web3.eth.isSyncing()
// .then(console.log);
