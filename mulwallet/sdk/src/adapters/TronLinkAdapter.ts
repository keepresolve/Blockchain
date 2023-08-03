import { AbstractAdapter } from "./AbstractAdapter";
import { SupportProviderFlag } from "../constant"
type TronLinkInjectedOptions = {
    isBitKeep: boolean
}

class TronLinkAdapter extends AbstractAdapter {
    constructor(Options: TronLinkInjectedOptions = {
        isBitKeep: true
    }) {
        super({ providerFlag: SupportProviderFlag.TRON, isBitKeep: Options.isBitKeep })
    }
    connect(): Promise<undefined>{
        const { tronLink } =  this.getProvider()
        return tronLink.request({ method: "tron_requestAccounts"})
    }
    signMessage(params: any): Promise<undefined> {
        const { tronWeb } =  this.getProvider()
        return this.isBitKeep ?  tronWeb.trx.sign(params.message) :  tronWeb.trx.signMessageV2(params.message)
    }


}

export { TronLinkAdapter }




