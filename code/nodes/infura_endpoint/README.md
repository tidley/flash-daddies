TODO

- Add in bytecode contract support

ganache-cli -p 7545 --fork INFURAENDPOINT --unlock 0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8

Restart geth https://ethereum.stackexchange.com/questions/7346/restart-geth-from-another-process

Training data:

// // https://bloxy.info/functions/38ed1739
// // let txHash =
// // '0xc7f675b7b43d029cda1209c0255edd33e417aa681e389d4778bfad6b59f018a4';

// let response = await contract.methods[method](
// inputs[0].toString(),
// inputs[1].toString(),
// [`0x` + inputs[2][0].toString(), `0x` + inputs[2][1].toString()],
// `0x` + inputs[3],
// inputs[4].toString(),
// ).send({ from: UNLOCK });
