# flash-daddies

Main project in ./code/nodes/infura_endpoint

# ToDo

- [x] Run node
- [x] Sync node
- [x] Process tx's

# PHASE 1 - Get latest block and tx's

Running Geth on RPi4.

Light node sync downloaded blocks but didn't allow access to the TxPool. Rerunning and synchronising now in fast mode.

Blockcypher API https://www.blockcypher.com/dev/ethereum/#testing
Get blockchain height: https://api.blockcypher.com/v1/eth/main
Get block info: https://api.blockcypher.com/v1/eth/main/blocks/11712762
Get tx info: https://api.blockcypher.com/v1/eth/main/txs/0e287445685e55c4c26ac7666a4b9df1ef38feb43514f23ade63185f09514363

Etherscan API NodeJS library: https://github.com/sebs/etherscan-api
Documentation: https://sebs.github.io/etherscan-api/

Process transactions to get:

- 'from' and 'to' addresses --> to match transactions with the same routing.
- gas price --> to sort matching calls and determine if this a front-run
- input data / output script --> detect identical calls.
- time --> find earliest

## Exchanges

- info: https://money-legos.studydefi.com/#/quickstart

1inch

AAVE

Binance
Multi-Chain (Lend)

bZx

Compound
address constant CompoundComptrollerAddress =
0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B;
address constant CEtherAddress = 0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5;

UniSwap

dydx

# PHASE 2 - Analyse mempool for un-mined transactions

Guide: https://www.quiknode.io/guides/defi/how-to-access-ethereum-mempool

Pricing for node: https://www.quiknode.io/?utm_source=internal&utm_campaign=guides/

# PHASE 3 - Send tokens to addresses identified
