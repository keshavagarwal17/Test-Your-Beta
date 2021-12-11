const path = require("path");
const fs = require("fs");
const solc = require("solc");
const productContractLocation = require("../ethereum/Contract/product.sol");
const productFile = fs.readFileSync(productContractLocation, "utf8");
var input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: productFile,
    },
  },
  settings: {
    metadata: {
      useLiteralContent: true,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
//This contains the name of file
const contract = output.contracts["product.sol"];

// This contains the name of contract
module.exports = contract.product;
