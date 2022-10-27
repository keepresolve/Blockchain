// import logo from './logo.svg';
import "./App.css";
import React from "react";
import Web3Modal from "bitkeep-web3modal";
// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      chainId: "",
      address: "",
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "",
          },
        },
        // "custom-bitkeep-wallet": {
        //   display: {
        //     logo: "bitkeep.png",
        //     name: "Bitkeep Wallet",
        //     description: "Connect to your Bitkeep Wallet",
        //   },
        //   package: {
        //       reqiure:["isBitkeep"]
        //   },
        //   // check:"isBitkeep",
        //   options: {},
        //   connector: async () => {
        //     if (window.bitkeep) {
        //       const bitkeep = window.bitkeep;
        //       await bitkeep.ethereum.request({ method: "eth_requestAccounts" });
        //       return bitkeep.ethereum;
        //     } else {
        //       window.open("https://bitkeep.com/download", "_blank");
        //       throw new Error("No Bitkeep wallet found");
        //     }
        //   },
        // }
        // bitkeep: {
        //   //Publishing
        //   package: true,
        // },
      },

      // bitkeep: {
      //   //Publishing
      //   package: true,
      // }
    });
  }
  async connect() {
    console.log(this.web3Modal);
    const provider = await this.web3Modal.connect();
  }
  render() {
    return (
      <>
        <button onClick={this.connect.bind(this)}>connect</button>
      </>
    );
  }
}
export default App;
