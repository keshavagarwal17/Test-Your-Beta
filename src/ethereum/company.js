import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x2CCa39870033762E2Fc6299CD2BBB91F6F35E24f"
);

export default instance;
