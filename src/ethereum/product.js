/* eslint-disable import/no-anonymous-default-export */
import Product from './build/product.json'
import Web3 from 'web3'
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
// const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')
// const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
export default (address) => {
    const kit = ContractKit.newKitFromWeb3(web3)
    return  new kit.web3.eth.Contract(
        JSON.parse(Product.interface),
        address
        // deployedNetwork && deployedNetwork.address

    )
}