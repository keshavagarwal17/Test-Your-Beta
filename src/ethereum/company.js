import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x759dB702c35FA2E329C21418c51700f9b9CD6eB1"
);

export default instance;