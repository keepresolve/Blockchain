// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { Button } from "@mui/material";
import React, { useState, useEffect} from "react";
import { useWallet} from "@mysten/wallet-adapter-react";

export function TestAccount() {
  let { connected, getAccounts, wallet} = useWallet();
  const [account, setAccount] = useState("");


  useEffect(() => {
    if (!connected) {
      setAccount("");
      return 
    } 

    getAccounts().then((accounts) => {
      if (accounts && accounts.length) {
        setAccount(accounts[0]);
      }
    });
  }, [wallet, connected, getAccounts]);



  return (
    <div>
        account: {account}
    </div>
  );
}
