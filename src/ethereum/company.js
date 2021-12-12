import web3 from "./web3";
import Manager from "./build/company.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x21239Bd8bF3274B24F9593146c6E51f6514E4b0D"
);

export default instance;
