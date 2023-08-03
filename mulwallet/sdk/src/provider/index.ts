


import { BitKeepEthereum }  from "../provider/LegacyEip155Provider"


import { SupportProviderFlag,  InitEventNames } from "../constant"


const bitkeep = {
    // ethereum: new BitKeepEthereum(),
    ethereum: window.bitkeep.ethereum,
    tronLink: window.bitkeep.tronLink,
    tronWeb: window.bitkeep.tronWeb,
    // solana: any,
    // phantom: any,
    // petra: any,
    // aptos: any,
    // arweave: any,
    unisat: window.bitkeep.unisat
    // keplr

}





export const getWalletProvierEventsName = (flag: SupportProviderFlag, mustBitkeep: boolean): string | undefined => {
    const eventName: string = InitEventNames[flag]
    return eventName
}


/**
 * @description 后面版本切换成 inject 目录的实例对象 
 * @param flag 
 * @returns 
 */
export const getWaleltProvider = (flag: string, isBitKeep: boolean) => {
    let provider = null
    switch (flag) {
        case SupportProviderFlag.EVM:

            provider = isBitKeep ? bitkeep.ethereum: window.ethereum
            break;
        case SupportProviderFlag.TRON:
            provider =isBitKeep ?  {
                tronLink: bitkeep.tronLink,
                tronWeb: bitkeep.tronWeb
            }: {
                tronWeb: window.tronWeb,
                tronLink: window.tronLink
            }
            break;
        case SupportProviderFlag.UTXOS:
            provider = bitkeep.unisat
            break;
        default:
            break;
    }
    // if (!provider) throw "no wallet flag detected!!"
    return provider
}



export const findFlagAdapter = (flag: SupportProviderFlag, adapters: Array<any>[]) => {
    const adapter = adapters.find(adapter => adapter.providerFlag == flag)
    if (!adapter) throw "no wallet flag detected!!"
    return adapter
}





