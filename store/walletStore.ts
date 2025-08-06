import { create } from 'zustand'
import type { Connector } from 'wagmi'
import { Chain } from 'wagmi/chains'


export interface WalletState {
  isConnected: boolean
  address: `0x${string}` | undefined
  chain: Chain | undefined
  isConnectingWallet: boolean
  isSwitchingChain: boolean
  connectors: Connector[]
  setWalletState: (state: Partial<Omit<WalletState, 'setWalletState'>>) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: undefined,
  chain: undefined,
  isConnectingWallet: false,
  isSwitchingChain: false,
  connectors: [],
  setWalletState: (state) => set((prev) => ({ ...prev, ...state })),
}))
