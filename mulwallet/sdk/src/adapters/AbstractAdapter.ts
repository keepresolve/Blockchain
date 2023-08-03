
import EventEmitter from 'eventemitter3'
import { SupportProviderFlag } from '../constant';
import { getWaleltProvider } from "../provider";


type StateInjected = {
    name: string;
    appInfo: {

    },
    homepage: {};
    downloadLinks: {};
    links: {};
    logo: {};
    connect(): Promise<undefined>
    signMessage(): Promise<undefined>
}
type BaseInjectedOptions = {
    providerFlag: SupportProviderFlag;
    isBitKeep: boolean
}

interface BaseInjectedProvider {
    providerFlag: string;
    isBitKeep: boolean;
    _state: StateInjected;
    provider: any,
    getProvider: () => any

}



export class AbstractAdapter extends EventEmitter {

    readonly id: string = "bitkeep"
    readonly name: string = "BitKeep Wallet"
    protected _state: StateInjected = {
        name: "bitkeepWallet",
        appInfo: {
            version: "",
            description: "",
        },
        homepage: "https://bitkeep.com",
        downloadLinks: {
            android: "https://bitkeep.com/download",
            ios: "https://bitkeep.com/download",
            qrCode: "https://bitkeep.com/en/download",
            browserExtension: {
                chrome: "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
                firefox: "",
                opera: "",
                edge: "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak"
            },

        },
        logo: {
            svg: "",
            png: "",
        },
        links: {
            deeplink: "bitkeep://",
            universallink: "https://bkapp.vip",

        }
    }
    public isBitKeep: boolean
    public providerFlag: string
    constructor(Options: BaseInjectedOptions = {
        isBitKeep: true,
        providerFlag: SupportProviderFlag.EVM

    }) {
        super()
        this.providerFlag = Options.providerFlag;
        this.isBitKeep = Options.isBitKeep;


    }

    getProvider() {

        return getWaleltProvider(this.providerFlag, this.isBitKeep)
    }
    // bitkeep 规范
    async connect() { }
    // async request(requestParams: any) {}
    async signMessage() { }
    // async signSendTransaction(){}
    async signTransaction(){}
}


