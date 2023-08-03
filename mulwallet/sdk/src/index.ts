
import {  LegacyEip155Adapter } from "./adapters/LegacyEip155Adapter";
import {  TronLinkAdapter  } from "./adapters/TronLinkAdapter";
import { detectBitkeepProvider } from "./detect-provider"
import EventEmitter from 'eventemitter3'
import { SupportProviderFlag } from "./constant"
import  *  as utils from  "./utils"






/**
 * bitkeep
 */
const BitkeepAdapters = [
    new LegacyEip155Adapter(),
    new TronLinkAdapter(), 
]



/**
 * 其他的
 */
const Adapters = [
    new LegacyEip155Adapter({isBitKeep:false}),
    new TronLinkAdapter({isBitKeep:false}),
]





interface Adapter {
    connect(connectParams:any): void
    signMessage(): void
    request(requestParams:any, options:any): void
}




class BitkeepDapter extends EventEmitter implements  Adapter {
    constructor(options:any) {
        super()
        const { isBitKeep=true, providerFlag=""} = options
        this.options.isBitKeep = isBitKeep 
    }
    options = {
        isBitKeep: true
    }
    state= {
        bitkeep: {
            [SupportProviderFlag.EVM]:{
                isConnected:true,
                accounts:{}
            },
            [SupportProviderFlag.TRON]:{
                isConnected:true
            }
        },

    }
 
    getAdapters(flag:any,isBitKeep:boolean){
        const adapters = isBitKeep? BitkeepAdapters: Adapters
        const adapter = utils.findFlagAdapter(flag, adapters)
        if(!adapter) throw "adapter not Installed"
        return adapter
    }
    connect(connectParams:any, isBitKeep:boolean=true, providerFlag:SupportProviderFlag= SupportProviderFlag.EVM ): void { 
        const Adapter =  this.getAdapters(providerFlag, isBitKeep)
        return  Adapter.connect()        
    }
    signMessage(connectParams:any, isBitKeep:boolean, providerFlag:SupportProviderFlag= SupportProviderFlag.EVM): void {
        const Adapter =  this.getAdapters(providerFlag, isBitKeep)
        return Adapter.signMessage(connectParams)
    }
  
    request(requestParams:any, options:any): void{}
}









export {
    LegacyEip155Adapter,
    TronLinkAdapter,
    BitkeepDapter,
    utils,
    detectBitkeepProvider
}

export default {
    LegacyEip155Adapter,
    TronLinkAdapter,
    BitkeepDapter,
    utils,
    detectBitkeepProvider
}