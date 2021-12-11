import Web3 from "web3";

let web3;

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider);
} else {
  window.alert("Non-eth browser is detected you should try using metamask");
}
export default window.web3;
