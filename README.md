# flash-daddies

# ToDo

1. Run node and sync
1. Run quicknode for 7 days to gain access
1.

# PHASE 1 - Get latest block and tx's

Blockcypher API https://www.blockcypher.com/dev/ethereum/#testing
Get blockchain height: https://api.blockcypher.com/v1/eth/main
Get block info: https://api.blockcypher.com/v1/eth/main/blocks/11712762
Get tx info: https://api.blockcypher.com/v1/eth/main/txs/0e287445685e55c4c26ac7666a4b9df1ef38feb43514f23ade63185f09514363

Etherscan API NodeJS library: https://github.com/sebs/etherscan-api
Documentation: https://sebs.github.io/etherscan-api/

Process transactions to get:
'from' and 'to' addresses --> to match transactions with the same routing.
gas price --> to sort matching calls and determine if this a front-run
input data / output script --> detect identical calls. More sophisticated (expensive to operate) front-runners may not simply duplicate this, see https://etherscan.io/address/0xB9c46f220A2E6B88e58DbD593D719F78530078A3

# PHASE 2 - Analyse mempool for un-mined transactions

guide: https://www.quiknode.io/guides/defi/how-to-access-ethereum-mempool
pricing for node: https://www.quiknode.io/?utm_source=internal&utm_campaign=guides/

# PHASE 3 - Send tokens to addresses identified
