

import {  useMemo } from "react";
// import { useWallet } from "@mysten/wallet-adapter-react";

import { WalletProvider } from "@mysten/wallet-adapter-react";
import { WalletStandardAdapterProvider } from "@mysten/wallet-adapter-all-wallets";

import { TestButton } from "./TestButton";
import { TestAccount } from "./TestAccount";
import { Testwallet } from "./TestWallets";

import BitKeepWallet from "./SuiWallet"
import "./index.css";

function App() {
  const adapters = useMemo(
    () => [
      new WalletStandardAdapterProvider()
    ],
    []
  );


  return (
    <div className="App">
        
       <WalletProvider adapters={adapters}>
          <Testwallet/>
          <TestAccount/>
          <TestButton />
        </WalletProvider>

        <BitKeepWallet/>
    </div>
  );
}

export default App;
