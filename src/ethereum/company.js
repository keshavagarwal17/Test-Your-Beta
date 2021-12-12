import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x2C8B668C1D61B5BB28cb48cbED3920E07CFa92E8"
);

export default instance;
