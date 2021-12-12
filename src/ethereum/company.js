import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0xD99aF5C2903ef2592b8e91D9B0c40E3682a2a805"
);

export default instance;
