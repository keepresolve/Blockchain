import { AbstractAdapter } from "./AbstractAdapter";
import { SupportProviderFlag } from "../constant"


type LegacyEip155AdapterOption = {
    isBitKeep: boolean // 是否走其他钱包
}
class LegacyEip155Adapter extends AbstractAdapter {
    constructor(Options: LegacyEip155AdapterOption = {
        isBitKeep: true
    }) {
        super({ providerFlag: SupportProviderFlag.EVM, isBitKeep: Options.isBitKeep })
    }
    connect(): Promise<undefined> {
        const provider = this.getProvider()
        return provider.request({ method: "eth_requestAccounts" })
    }
    signMessage(params: any): Promise<undefined> {
        const provider = this.getProvider()
        return provider.request({
            from: provider.selectedAddress,
            method: "personal_sign",
            params:[ params.message, provider.selectedAddress]
        })
    }

}

export { LegacyEip155Adapter }