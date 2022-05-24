import React, {  useEffect, useState } from 'react'
import { 
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
  CreateTxFailed,
  getChainOptions,
  WalletController,
  createLCDClient
} from '@terra-money/wallet-controller'
import { Fee, MsgSend } from '@terra-money/terra.js';
// import { Subscription } from 'rxjs';
 

import './App.css'; 
 

let controller = null 
let subscription = null
function App() {   
  let [connectedWallet, setConnState] = useState(null)  
  let [err, setErr] = useState('')
  let [num, setNum] = useState(0)
  const [txResult, setTxResult] = useState('')
  const [signResult, setSignResult] = useState('')
  const [toAddress, setToAddress] = useState('terra12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9')

  async function initController() {
    const chainOptions = await getChainOptions(); 
    controller = new WalletController({
      ...chainOptions,
    });  
    subscription = controller.connectedWallet().subscribe((_connectedWallet) => { 
      setConnState(_connectedWallet)
      console.log(_connectedWallet)
    })
  }

  async function connectWallet(connectType) {
   await controller.connect(connectType)  
  }

  async function disconnect() {
    await controller.disconnect() 
  } 

  const numChange = (event) => { 
    setNum(event.target.value)
  }

  const addressChange = (event) => {
    setToAddress(event.target.value)
  }

  const transaction = () => { 
    connectedWallet
      .post({
        fee: new Fee(1000000, '200000uusd'),
        msgs: [
          new MsgSend(connectedWallet.terraAddress, toAddress, {
            uusd: 1000000 * num,
          }),
        ],
      })
      .then((nextTxResult) => {
        console.log(nextTxResult);
        // txResult.value = nextTxResult;
        setTxResult(nextTxResult)
      })
      .catch((error) => {
        if (error instanceof UserDenied) {
          setErr('User Denied');
        } else if (error instanceof CreateTxFailed) {
          setErr('Create Tx Failed: ' + error.message);
        } else if (error instanceof TxFailed) {
          setErr('Tx Failed: ' + error.message);
        } else if (error instanceof Timeout) {
          setErr('Timeout');
        } else if (error instanceof TxUnspecifiedError) {
          setErr('Unspecified Error: ' + error.message);
        } else {
          setErr('Unknown Error: ' +
            (error instanceof Error ? error.message : String(error)));
        }
      });
  }

  const signTx = () => {
    connectedWallet.sign({
      fee: new Fee(1000000, '200000uusd'),
      msgs: [
        new MsgSend(connectedWallet.terraAddress, toAddress, {
          uusd: 1000000 * num,
        }),
      ],
    })
    .then((nextSignResult) => {
      setSignResult(nextSignResult)

      const tx = nextSignResult.result
      const lcd = createLCDClient({network: connectedWallet.network})
      return lcd.tx.broadcastSync(tx)
    })
    .then((nextTxResult) => {
      setTxResult(nextTxResult)
    }) 
    .catch((error) => {
      if (error instanceof UserDenied) {
        setErr('User Denied');
      } else if (error instanceof CreateTxFailed) {
        setErr('Create Tx Failed: ' + error.message);
      } else if (error instanceof TxFailed) {
        setErr('Tx Failed: ' + error.message);
      } else if (error instanceof Timeout) {
        setErr('Timeout');
      } else if (error instanceof TxUnspecifiedError) {
        setErr('Unspecified Error: ' + error.message);
      } else {
        setErr('Unknown Error: ' +
          (error instanceof Error ? error.message : String(error)));
      }
    });
  }

  useEffect(() => {
    initController()  
  },[])// eslint-disable-line
  

  return (
    <div className="App">
      <div className='connect row'>
        <button id="btn-conn" onClick={() => connectWallet('EXTENSION')}>connect extension</button>
        {/* <button id="btn-conn" onClick={() => connectWallet('WALLETCONNECT')}>connect wallet app</button>
        <button id="btn-conn" onClick={() => connectWallet('READONLY')}>connect readonly</button> */}
      </div>
      <div className='Disconnect row'>
        <button id="btn" onClick={() => disconnect()}>disconnect</button>
      </div>
      <div className='row'> 
        { !connectedWallet && <div > Wallet not connected! </div>}
        { 
          connectedWallet && 
          <div>
            <div>{connectedWallet.network.name}:{connectedWallet.network.chainID}</div> 
          </div>
        } 
      </div>
      <div className="tx-container">
        <div className=" row">
          <label>from:</label> <label>{connectedWallet?.walletAddress}</label>
        </div>
        <div className="row">
          <label>to:</label> <input style={{width:'400px'}} onChange={addressChange}  value={toAddress}></input>
        </div> 
        <div className='row'>
          <label>amount:</label> <input onChange={numChange} value={num}></input>USD
        </div>
        <div>
          <button onClick={transaction}>transaction</button>
        </div>
        <div>
          <button onClick={signTx}>signTx</button>
        </div>
      </div>
      <div className='connect-err'>{txResult}</div>
      <div className='connect-err'>{err}</div>
    </div> 
  );
}

export default App;
