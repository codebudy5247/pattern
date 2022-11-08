import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export const CoinbaseWallet = new WalletLinkConnector({
  url: 'https://mainnet.infura.io/v3/14c69605cf3c4f1d842ffed775274f00',
  appName: 'Web3-react Demo',
  supportedChainIds: [1, 3, 4, 5, 42]
})

export const WalletConnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/14c69605cf3c4f1d842ffed775274f00`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})
