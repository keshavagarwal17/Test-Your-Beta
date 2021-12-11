import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x5BD09F39019ad2C335d183c02cdBe66E829328D9"
);

export default instance;