"use client";

import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { wagmiConfig } from "@/lib/wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: "bg-gray-900 text-gray-50 border border-gray-700",
            success: {
              className: "border-green-500",
            },
            error: {
              className: "border-red-500",
            },
          }}
        />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
