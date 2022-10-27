// require("dotenv").config();

const aptos = require("aptos");

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";

const aptosCoin = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";

// (async function () {

//     const client = new aptos.AptosClient(NODE_URL);

//     const signedTxn = JSON.stringify('{"0":155,"1":251,"2":38,"3":8,"4":220,"5":108,"6":65,"7":242,"8":238,"9":161,"10":124,"11":103,"12":77,"13":26,"14":47,"15":41,"16":76,"17":131,"18":238,"19":58,"20":205,"21":249,"22":112,"23":27,"24":147,"25":150,"26":126,"27":8,"28":16,"29":180,"30":69,"31":182,"32":1,"33":0,"34":0,"35":0,"36":0,"37":0,"38":0,"39":0,"40":2,"41":0,"42":0,"43":0,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"58":0,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"70":0,"71":0,"72":1,"73":13,"74":97,"75":112,"76":116,"77":111,"78":115,"79":95,"80":97,"81":99,"82":99,"83":111,"84":117,"85":110,"86":116,"87":8,"88":116,"89":114,"90":97,"91":110,"92":115,"93":102,"94":101,"95":114,"96":0,"97":2,"98":32,"99":0,"100":0,"101":0,"102":0,"103":0,"104":0,"105":0,"106":0,"107":0,"108":0,"109":0,"110":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0,"117":0,"118":0,"119":0,"120":0,"121":0,"122":0,"123":0,"124":0,"125":0,"126":0,"127":0,"128":0,"129":0,"130":0,"131":8,"132":0,"133":0,"134":0,"135":0,"136":0,"137":0,"138":0,"139":0,"140":16,"141":39,"142":0,"143":0,"144":0,"145":0,"146":0,"147":0,"148":100,"149":0,"150":0,"151":0,"152":0,"153":0,"154":0,"155":0,"156":182,"157":51,"158":51,"159":99,"160":0,"161":0,"162":0,"163":0,"164":2,"165":0,"166":32,"167":140,"168":2,"169":60,"170":0,"171":233,"172":242,"173":146,"174":212,"175":151,"176":0,"177":26,"178":245,"179":156,"180":121,"181":222,"182":170,"183":125,"184":66,"185":166,"186":198,"187":156,"188":231,"189":252,"190":103,"191":95,"192":218,"193":83,"194":248,"195":124,"196":0,"197":142,"198":137,"199":64,"200":202,"201":24,"202":217,"203":181,"204":50,"205":129,"206":20,"207":49,"208":5,"209":10,"210":116,"211":213,"212":111,"213":244,"214":203,"215":189,"216":231,"217":85,"218":157,"219":2,"220":173,"221":177,"222":176,"223":145,"224":41,"225":197,"226":95,"227":190,"228":248,"229":254,"230":237,"231":166,"232":7,"233":56,"234":30,"235":195,"236":11,"237":40,"238":56,"239":162,"240":101,"241":219,"242":81,"243":31,"244":173,"245":128,"246":124,"247":41,"248":13,"249":205,"250":69,"251":42,"252":18,"253":250,"254":132,"255":15,"256":204,"257":117,"258":231,"259":96,"260":157,"261":131,"262":158,"263":1}')
//     const transactionRes = await client.submitTransaction(signedTxn);
//     console.log("transactionRes", transactionRes)
//     console.log(await client.waitForTransaction(transactionRes.hash) )
//     let resources = await client.getAccountResources();
//     let accountResource = resources.find((r) => r.type === aptosCoin);
//    console.log(`account2 coins: ${accountResource.data.coin.value}. Should be 0!`);

// })()

(async () => {
    try {


        const client = new aptos.AptosClient(NODE_URL);
        const faucetClient = new aptos.FaucetClient(NODE_URL, FAUCET_URL, null);

        const account1 = new aptos.AptosAccount();
        await faucetClient.fundAccount(account1.address(), 100_000_000);
        let resources = await client.getAccountResources(account1.address());
        let accountResource = resources.find((r) => r.type === aptosCoin);
        console.log(`account2 coins: ${accountResource.data.coin.value}. Should be 100_000_000!`);

        const account2 = new aptos.AptosAccount();
        await faucetClient.fundAccount(account2.address(), 0);
        resources = await client.getAccountResources(account2.address());
        accountResource = resources.find((r) => r.type === aptosCoin);
        console.log(`account2 coins: ${accountResource.data.coin.value}. Should be 0!`);

        const payload = {
            type: "entry_function_payload",
            function: "0x1::coin::transfer",
            type_arguments: ["0x1::aptos_coin::AptosCoin"],
            arguments: [account2.address().hex(), 7_1_7],
        };
        const txnRequest = await client.generateTransaction(account1.address(), payload);
        const signedTxn = await client.signTransaction(account1, txnRequest);
        const transactionRes = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(transactionRes.hash);

        resources = await client.getAccountResources(account2.address());
        accountResource = resources.find((r) => r.type === aptosCoin);
        console.log(`account2 coins: ${accountResource.data.coin.value}. Should be 717!`);
    } catch (error) {
        console.log(error)
    }
})();