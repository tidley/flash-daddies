const Web3 = require('web3');
const net = require('net');

const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(`./uniSwap.json`);

const web3 = new Web3(
    new Web3.providers.IpcProvider('/home/pi/.ethereum/geth.ipc', net),
);

let latestTx = {};
let blockHeight;

// web3.eth.getTransactionReceipt('0x2f5e7b565e8280826af0a9f492d53fac1b690848df39b98b22f614143d633a4d').then(console.log)

async function getTxs() {
    latestTx = {};

    let block = await web3.eth.getBlock('latest');
    if (blockHeight != block.number) {
        console.log('New block:', block.number);
        blockHeight = block.number;
        let txs = block.transactions;
        processTxs(txs);
    }
}

async function processTxs(txs) {
    for (const tx of txs) {
        web3.eth.getTransaction(tx).then((thisTx) => {
            //console.log(thisTx)
            getTxData(thisTx);
        });
    }
    // viewTxs(latestTx);
}

async function getTxData(tx) {
    try {
        let _thisTx = {
            'from': tx.from,
            'to': tx.to,
            'gas': tx.gasPrice,
            'input': tx.input,
        };
        // 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
        if (tx.to == '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D') {
            const result = decoder.decodeData(_thisTx.input);

            // if (result.method == "swapExactTokensForTokens" ||result.method == 'swapTokensForExactTokens') {

            _thisTx.decoded = result.inputs[2];
            // console.log(result.inputs[2]);

            if (latestTx[tx.to]) {
                // && tx.input != '0x') {
                // console.log("Matching destination")
                //if(latestTx[tx.input][tx.to][tx.decoded]){
                if (latestTx[_thisTx.to][_thisTx.decoded.toString()]) {
                    console.log(
                        'Front runner:',
                        latestTx[_thisTx.to][_thisTx.decoded],
                        'matches to:',
                        _thisTx,
                    );
                }
                //console.log("Duplicate from:", _thisTx.from, "with gas: ", _thisTx.gas)
                // console.log(_thisTx)
                // console.log(latestTx[tx.input],"copied by:", _thisTx)
            } else {
                // latestTx[tx.input] = {};
                // latestTx[tx.input][tx.to] = {}
                // latestTx[tx.input][tx.to][tx.decoded] = _thisTx;

                //latestTx[tx.input] = {};
                latestTx[_thisTx.to] = {};
                latestTx[_thisTx.to][_thisTx.decoded.toString()] = _thisTx;
                console.log(_thisTx.decoded.toString());

                // console.log(_thisTx)
            }

            // }
        }
    } catch {}
}

function viewTxs(latest) {
    console.log(latest);
}
setInterval(() => {
    getTxs();
}, 500);
