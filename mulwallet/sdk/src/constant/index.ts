
export const APPINFO = {
    name: "bitkeepWallet",
    homepage:"https://bitkeep.com",
    downloadLinks:{
        android:"https://bitkeep.com/download",
        ios:"https://bitkeep.com/download",
        qrCode: "https://bitkeep.com/en/download",
        browserExtension:{
            chrome: "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
            firefox:"",
            opera:"",
            edge:"https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak"
        },
       
    },
    logo:{
        svg:"",
        png:"",
    },
    links:{
        deeplink: "bitkeep://",
        universallink:"https://bkapp.vip",
      
    }
}


export enum SupportProviderFlag {
    "EVM" = "eip155", // meteMask
    "TRON" = "tronLink", // 
    "UTXOS" = "unisat", // unisat
}

export const InitEventNames = {
    [SupportProviderFlag.EVM]: "ethereum#initialized", // meteMask
    [SupportProviderFlag.TRON]: "tronLink#initialized", // 
    [SupportProviderFlag.UTXOS]: "unisat#initialized",// unisat
}