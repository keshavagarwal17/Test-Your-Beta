import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0xE5C40531da335058DFeF79a83Cc69278c4BD8ABf"
);

export default instance;