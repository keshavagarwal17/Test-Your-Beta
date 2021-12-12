import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0xc61e0d0625Db2913e134d70b5E4987744ebf862B"
);

export default instance;