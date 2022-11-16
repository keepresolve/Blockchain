

import {  useMemo } from "react";
// import { useWallet } from "@mysten/wallet-adapter-react";

import { WalletProvider } from "@mysten/wallet-adapter-react";
import { WalletStandardAdapterProvider, UnsafeBurnerWalletAdapter } from "@mysten/wallet-adapter-all-wallets";
import { WalletWrapper } from "@mysten/wallet-adapter-react-ui";
import { TestButton } from "./TestButton";

import "./index.css";

function App() {
  const adapters = useMemo(
    () => [
      new WalletStandardAdapterProvider(),
      new UnsafeBurnerWalletAdapter(),
    ],
    []
  );




  return (
    <div className="App">
       <WalletProvider adapters={adapters}>
          <TestButton />
          <WalletWrapper />
        </WalletProvider>
    </div>
  );
}

export default App;
