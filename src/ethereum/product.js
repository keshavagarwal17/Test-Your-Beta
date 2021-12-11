import web3 from "./web3";
import product from "./build/product.json";

export default (address) => {
  return new web3.eth.Contract(JSON.parse(product.interface), address);
};