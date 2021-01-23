const https = require('https');

const BLOCK_HEIGHT = 'https://api.blockcypher.com/v1/eth/main';

const BLOCK_INFO = 'https://api.blockcypher.com/v1/eth/main/blocks/';

// Get block height
https
    .get(BLOCK_HEIGHT, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            let result = JSON.parse(data);

            getTxs(result.height);
        });
    })
    .on('error', (err) => {
        console.log('Error: ', err);
    });

// Get transactions
function getTxs(block) {
    https
        .get(BLOCK_INFO + block, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                let result = JSON.parse(data);
                let txIds = result.txids;
                let txIds2 = result.internal_txids;
                let txIdsAll = txIds.concat(txIds2);

                console.log(txIds.length);
                console.log(txIds2.length);
                console.log(txIdsAll.length);
            });
        })
        .on('error', (err) => {
            console.log('Error: ', err);
        });
}

// Process transactions
function processTxs(txIds, txIds2) {}
