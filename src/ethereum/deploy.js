const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledCompany = require("./build/company.json");

const provider = new HDWalletProvider(
  "video aisle spend cycle razor wagon sugar monitor caught raven lyrics camera",
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/362f5dedf30545548ea5844b5fb5cde0"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledCompany.interface)
  )
    .deploy({ data: compiledCompany.bytecode })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();