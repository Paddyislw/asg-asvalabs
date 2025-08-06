"use client"

import { sepolia } from "wagmi/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const wagmiConfig = getDefaultConfig({
  appName: "AsvaLabs Assessment",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "PROJECT_ID",
  chains: [sepolia],
  appIcon: "https://asvalabs.com/favicon.ico",
  ssr: false,
});
