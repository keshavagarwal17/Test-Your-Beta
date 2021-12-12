import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0xf5cAC37E7e8cd72EB4c56ff6F59D9947b8CE2Bc0"
);

export default instance;