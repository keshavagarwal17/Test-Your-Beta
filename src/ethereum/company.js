import Company from './build/company.json'
import Web3 from 'web3'
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
// const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')
// const web3 = new Web3('https://alfajores-forno.celo-testnet.org')

let instance;
async function initContract(){
    const kit = ContractKit.newKitFromWeb3(web3)

    // Check the Celo network ID
    // const networkId = await web3.eth.net.getId()

    // Get the contract associated with the current network
    // const deployedNetwork = Company.networks[networkId]

    // Create a new contract instance with the HelloWorld contract info
    instance = new kit.web3.eth.Contract(
        JSON.parse(Company.interface),
        '0x03ea0d3B75d2e6470CFd3B53224644384461A8b6'
        // deployedNetwork && deployedNetwork.address

    )
}
initContract()
export default instance