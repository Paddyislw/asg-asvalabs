"use client"

import { useAccount, useChainId } from "wagmi"
import { NETWORK_CONFIG } from "@/constants"

export const NetworkStatus = () => {
  const { isConnected } = useAccount()
  const chainId = useChainId()

  if (!isConnected) {
    return null
  }

  const networkInfo = NETWORK_CONFIG[chainId as keyof typeof NETWORK_CONFIG]
  const isSupported = !!networkInfo

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <div className={`w-2 h-2 rounded-full ${isSupported ? "bg-green-500" : "bg-red-500"}`}></div>
      <span>{isSupported ? "Supported Network" : "Unsupported Network"}</span>
    </div>
  )
}
