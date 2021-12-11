const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
require("dotenv").config();
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: process.env.ACCOUNT_MNEOMIC,
  },
  providerOrUrl: process.env.RINKBEY_ENDPOINT,
});
const web3 = new Web3(provider);
let address;
const deploy = async () => {
  // We are getting several accounts, Reason being Mneomic is used to generate multiple Private keys
  const allAccounts = await web3.eth.getAccounts();

  const deployedNetwork = await new web3.eth.Contract(abi)
    .deploy({
      data: "0x" + evm.bytecode.object,
    })
    .send({ from: allAccounts[0] });
  address = deployedNetwork.options.address;
  provider.engine.stop();
  //To actually see deployed one, Go to rinkeby.etherscan.io
  //To see on remix, first select InjectedWeb3 which is like web3 on browser
};
deploy();
return {
  abi,
  address,
};
