// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { Button } from "@mui/material";
import React from "react";
import { useWallet } from "@mysten/wallet-adapter-react";

export function Testwallet() {
  let { wallets, select, connected, connecting , wallet, disconnect} = useWallet();

  const handleConnectClick = async (walletName) => {
    select(walletName);
  };


  const handleDisconnectClick = async () => {
        disconnect()
  };
  console.log(" {connecting}",  {connecting})


  return (
    <>
      {connected ? (
        <div>
            {wallet?.name || "wallet" } Connected
            <button onClick={handleDisconnectClick}>disconnect</button>
        </div>
      ) : (
        wallets &&
        wallets.length &&
        wallets.map((wallet) => (
          <div key={wallet.name}>
            <button variant="contained" onClick={() => handleConnectClick(wallet.name)}>
               Connecting to {wallet?.name || "Wallet"}
            </button>
          </div>
        ))
      )}
    </>
  );
}
