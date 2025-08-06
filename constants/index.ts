import { sepolia, hardhat } from "wagmi/chains"
import { getAddress } from "viem"

export const COUNTER_CONTRACT = {
  address: getAddress("0x82c040c28D9655700A230f4F07aa63Fb7ed1ae0e") as `0x${string}`, 
  abi: [
    {
      inputs: [],
      name: "count",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "active",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "increment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_newCount", type: "uint256" },
        { internalType: "string", name: "_newName", type: "string" },
        { internalType: "bool", name: "_newActive", type: "bool" },
      ],
      name: "updateDetails",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const,
} as const

export const SUPPORTED_CHAINS = [sepolia, hardhat]

export const NETWORK_CONFIG: { [key: number]: { name: string; blockExplorer: string } } = {
  [sepolia.id]: {
    name: "Sepolia",
    blockExplorer: "https://sepolia.etherscan.io",
  },
  [hardhat.id]: {
    name: "Hardhat",
    blockExplorer: "http://localhost:8545",
  },
}


export const FEATURE_LIST = [
  "Wallet connection (MetaMask & WalletConnect)",
  "Smart contract read operations (Count, Name, Active Status)",
  "Smart contract write operations (Increment Count)",
  "Smart contract write operations (Update All Details via form)",
  "Transaction status monitoring",
  "Network detection & validation",
  "Responsive design with dark mode",
  "Error handling & loading states",
];