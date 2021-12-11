const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = ContractKit.newKitFromWeb3(web3);
const getAccount = require("./getAccount").getAccount;
const HelloWorld = require("./build/company.json");

async function awaitWrapper() {
  let account = await getAccount();
  console.log(account.address);
  console.log(account);

  // this account must have a CELO balance to pay transaction fees
  // below private key is mine for testing purpose
  kit.connection.addAccount(
    "d46b1a98d7f6bfe0785c03c0beab205c731e54c20cee8bf18a5b5f213a742dee"
  );

  // below address is also mine for testing purpose
  let tx = await kit.connection.sendTransaction({
    from: "0xb5a5DdaB2318be3219D41F04b21DeC7D2Ce5A30b",
    data: HelloWorld.bytecode,
  });

  // this is the address of contract where is is deployed
  //contract address: 0x03ea0d3B75d2e6470CFd3B53224644384461A8b6
  const receipt = await tx.waitReceipt();
  console.log(receipt);
}

awaitWrapper();
