const {
    AptosClient,
    AptosAccount,
    FaucetClient,
    BCS,
    TxnBuilderTypes
} = require("aptos")


// devnet is used here for testing
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);





async function faucetTokenBlance() {

    
    // Generates key pair for Alice
    // const alice = new AptosAccount();
    // Creates Alice's account and mint 5000 test coins
    // 领取空投币
    const address= "0x3bbca716af694b7d500ec98075f51300cee6dee42c58d6fa29896f85ef41c540"
    const mainToken  = '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
    await faucetClient.fundAccount(address, 5000);

    let resources = await client.getAccountResources(address);
    
    let accountResource = resources.find((r) => r.type === mainToken);
    console.log(`Alice coins: ${(accountResource?.data).coin.value}. Should be 5000!`);
    
    // await new Promise(resolve=>setTimeout(resolve,500))

    faucetTokenBlance()
}

async function faucetTokenBlance1() {
    // Generates key pair for Bob
    const bob = new AptosAccount();
    // Creates Bob's account and mint 0 test coins
    await faucetClient.fundAccount(bob.address(), 0);

    let resources = await client.getAccountResources(bob.address());
    let accountResource = resources.find((r) => r.type === mainToken);
    console.log(`Bob coins: ${(accountResource?.data).coin.value}. Should be 0!`);
}

 faucetTokenBlance()
    
