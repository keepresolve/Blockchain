import { Connector, Chain } from 'wagmi'
import { CoolWalletOptions, CoolWalletProvider } from 'cool-wallet-sdk'

export class CoolWalletConnector extends Connector<
  CoolWalletProvider,
  CoolWalletOptions
> {
  readonly id = 'coolWallet'
  readonly name = 'Cool Wallet'
  readonly ready = true

  #provider?: CoolWalletProvider

  constructor(config: { chains?: Chain[]; options: CoolWalletOptions }) {
    super(config)
  }

  async getProvider() {
    if (!this.#provider) {
      this.#provider = new CoolWalletProvider(this.options)
    }
    return this.#provider
  }

  // Implement other methods
  // connect, disconnect, getAccount, etc.
}