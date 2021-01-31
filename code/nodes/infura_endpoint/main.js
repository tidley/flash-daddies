require('dotenv').config();

console.log(process.env.INFURA);

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || process.env.INFURA);

const subscription = web3.eth.subscribe(
  'pendingTransactions',
  function (error, result) {
    if (!error) console.log(result);
  },
);
