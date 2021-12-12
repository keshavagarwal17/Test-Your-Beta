import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0xb29F6A8B5E088aDb6B1A8116FFeCDAaF70c6FDE7"
);

export default instance;