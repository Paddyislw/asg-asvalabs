// Format utilities
export const formatAddress = (address: string, chars = 4): string => {
  if (!address) return ""
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export const formatTxHash = (hash: string, chars = 6): string => {
  if (!hash) return ""
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`
}

export const formatEther = (value: bigint, decimals = 4): string => {
  const etherValue = Number(value) / 1e18
  return etherValue.toFixed(decimals)
}

export const formatNumber = (num: number | bigint): string => {
  return new Intl.NumberFormat().format(Number(num))
}

// Validation utilities
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const isValidTxHash = (hash: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(hash)
}

export const isPositiveNumber = (value: string): boolean => {
  const num = Number.parseFloat(value)
  return !isNaN(num) && num > 0
}
