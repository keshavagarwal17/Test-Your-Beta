import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x1bc174697806CB4ad5B60b095A5F0B3Bc7E1f147"
);

export default instance;