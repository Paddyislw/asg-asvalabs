import { create } from 'zustand'
import type { BaseError } from 'wagmi'

interface ContractState {
  count: bigint
  name: string
  active: boolean
  isReadLoading: boolean
  readError: BaseError | null
  isWriting: boolean
  txHash: `0x${string}` | null
  isConfirmed: boolean
  writeError: BaseError | null
  confirmError: BaseError | null
  contractAddress: `0x${string}`
  networkName: string
  blockExplorerUrl?: string
  isOnSupportedChain: boolean
  isTransactionModalOpen: boolean 
  setContractState: (state: Partial<Omit<ContractState, 'setContractState'>>) => void
}

export const useContractStore = create<ContractState>((set) => ({
  count: BigInt(0),
  name: "N/A",
  active: false,
  isReadLoading: true,
  readError: null,
  isWriting: false,
  txHash: null,
  isConfirmed: false,
  writeError: null,
  confirmError: null,
  contractAddress: "0x82c040c28D9655700A230f4F07aa63Fb7ed1ae0e" as `0x${string}`, 
  networkName: "N/A",
  blockExplorerUrl: undefined,
  isOnSupportedChain: false,
  isTransactionModalOpen: false,
  setContractState: (state) => set((prev) => ({ ...prev, ...state })),
}))
