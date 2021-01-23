const Web3 = require('web3');
const net = require('net');

const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(`./uniSwap.json`);

const web3 = new Web3(
    new Web3.providers.IpcProvider('/home/pi/.ethereum/geth.ipc', net),
);

const UNISWAP = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

let latestTxs = {};
let blockHeight;

// web3.eth.getTransactionReceipt('0x2f5e7b565e8280826af0a9f492d53fac1b690848df39b98b22f614143d633a4d').then(console.log)

async function getTxs() {
    latestTxs = {};
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
}

function parseTx(tx) {
    return {
        'from': tx.from,
        'to': tx.to,
        'gas': tx.gasPrice, // 'fees' ?
        'input': tx.input,
    };
}

async function getTxData(tx) {
    if (tx != null) {
        try {
            let _thisTx = parseTx(tx);
            // filter call to uniswap contract
            if (tx.to == UNISWAP) {
                const decodedInput = decoder.decodeData(_thisTx.input);
                // if (decodedInput.method == "swapExactTokensForTokens" ||decodedInput.method == 'swapTokensForExactTokens') {
                _thisTx.decoded = decodedInput.inputs[2];

                // if call to this address already exists
                if (latestTxs[tx.to]) {
                    // && tx.input != '0x') {

                    if (latestTxs[_thisTx.to][_thisTx.decoded.toString()]) {
                        console.log(
                            '******** FRONT RUN DETECTED ********',
                            '>>>>>>>>>>> Front runner >>>>>>>>>>>',
                            latestTxs[_thisTx.to][_thisTx.decoded.toString()],
                            '>>>>>>>>>>>>>> Source >>>>>>>>>>>>>>',
                            _thisTx,
                            '******** FRONT RUN DETECTED ********',
                        );
                    }
                } else {
                    // Create entry for contract
                    latestTxs[_thisTx.to] = {};

                    // Create and save entry for this tx
                    latestTxs[_thisTx.to][_thisTx.decoded.toString()] = {};
                    latestTxs[_thisTx.to][_thisTx.decoded.toString()] = _thisTx;

                    console.log(_thisTx.decoded.toString());
                }
            }
        } catch (err) {
            console.log(err.toString());
        }
    }
}

setInterval(() => {
    getTxs();
}, 500);
