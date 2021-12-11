const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)
const getAccount = require('./getAccount').getAccount
const HelloWorld = require('./build/company.json')

async function awaitWrapper(){
    let account = await getAccount()
    console.log(account.address)
    console.log(account)

    // this account must have a CELO balance to pay transaction fees
    // below private key is mine for testing purpose 
    kit.connection.addAccount('f8f15a4dfdde36f59ad832f958dededc4ece6d406bbc04c98747d564b7cf64a7')

    // below address is also mine for testing purpose
    let tx = await kit.connection.sendTransaction({
        from: '0x276A42eAc323740916De9829b1cA291c283b17fe',
        data: HelloWorld.bytecode
    })

    // this is the address of contract where is is deployed
    //contract address: 0x03ea0d3B75d2e6470CFd3B53224644384461A8b6
    const receipt = await tx.waitReceipt()
    console.log(receipt)
}

awaitWrapper()