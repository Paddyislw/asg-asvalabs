"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 999999999999,
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="px-4 py-2 rounded-full border border-white   bg-white text-black hover:bg-gray-100  transition-colors"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="px-4 py-2 rounded-full border border-red-500 text-red-500  hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div
                  style={{ display: "flex", gap: 12 }}
                  className="text-white"
                >
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="px-4 py-2 rounded-full border border-white bg-white text-black  transition-colors"
                  >
                    {chain && (
                      <div className="flex items-center">
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                          className="border border-gray-700"
                        >
                          {chain.iconUrl ? (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl || "/placeholder.svg"}
                              width={20}
                              height={20}
                              style={{ margin: "auto" }}
                            />
                          ) : (
                            <p className="text-xs">{chain.name}</p>
                          )}
                        </div>
                        <ChevronDownIcon className="h-3 w-3" />{" "}
                      </div>
                    )}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="px-4 py-2 rounded-full border border-white bg-white text-black hover:bg-gray-100 transition-colors truncate"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
