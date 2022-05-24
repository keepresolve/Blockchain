

import { LCDClient, Coin, MsgSend, MnemonicKey } from "@terra-money/terra.js"

const terra = new LCDClient({
  // connect to bombay testnet
  URL: "https://bombay-lcd.terra.dev",
  chainID: "bombay-12",

  // URL: "https://fcd.terra.dev",
  // chainID: "columbus-5", //正式

  //To use LocalTerra
  //  URL: 'http://localhost:1317',
  //   chainID: 'localterra'
});

// get the current swap rate from 1 TerraUSD to TerraKRW
// 1 TerraUSD to TerraKRW 的当前利率
 /**
  *  uluna 可以理解成eth 的合约地址
  */
  const offerCoin = new Coin("uluna", "1000000");
  terra.market.swapRate(offerCoin, "ueur").then((c) => {
    console.log(`${offerCoin.toString()} 可以换成 ${c.toString()}`);
    // console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
  });

//send
// create a key out of a mnemonic
const mk = new MnemonicKey({
  mnemonic: "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
});

const wallet = terra.wallet(mk);

// // create a simple message that moves coin balances
const send = new MsgSend("terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v", "terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp", { uluna: 1000000, ukrw: 1230201, uusd: 1312029 });

// wallet
//   .createAndSignTx({
//     msgs: [send],
//     memo: "test from terra.js!",
//   })
//   .then((tx) =>{
//      const r =  terra.tx.broadcast(tx)
//      return r
//   })
//   .then((result) => {
//     console.log(`TX hash: ${result.txhash}`);
//   }).catch(err=>{
//     console.log(err);
//   })
