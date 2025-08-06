"use client";

import { formatTxHash } from "@/helpers";
import { NETWORK_CONFIG } from "@/constants";
import { useChainId } from "wagmi";
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react";
import { useContractStore } from "@/store/contractStore";

export const TransactionStatus = () => {
  const { txHash, isConfirmed, isWriting, writeError, confirmError } =
    useContractStore();
  const chainId = useChainId();

  const networkInfo = NETWORK_CONFIG[chainId as keyof typeof NETWORK_CONFIG];
  const explorerUrl = networkInfo?.blockExplorer;

  let statusMessage = "No active transaction.";
  let statusColorClass = "text-gray-400";
  let statusIcon = <Info className="h-6 w-6 text-gray-400" />;

  // Determine status based on current state
  if (isWriting && !isConfirmed && !writeError && !confirmError) {
    statusMessage = "Transaction Pending...";
    statusColorClass = "text-yellow-400";
    statusIcon = <Loader2 className="h-6 w-6 animate-spin text-yellow-400" />;
  } else if (isConfirmed) {
    statusMessage = "Transaction Confirmed!";
    statusColorClass = "text-green-500";
    statusIcon = <CheckCircle className="h-6 w-6 text-green-500" />;
  } else if (writeError || confirmError) {
    statusMessage = "Transaction Failed!";
    statusColorClass = "text-red-500";
    statusIcon = <XCircle className="h-6 w-6 text-red-500" />;
  }

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg flex flex-col justify-between min-h-[300px]`}
    >
      <div className="flex flex-col items-center justify-center flex-grow space-y-4">
        <div className={`flex items-center gap-4 ${statusColorClass}`}>
          {statusIcon}
          <span className="text-2xl font-extrabold">{statusMessage}</span>
        </div>

        {txHash && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <span className="text-xs text-gray-400">Transaction Hash:</span>
            <code className="text-sm bg-[#0a0a0a] px-3 py-1.5 rounded-md font-mono break-all text-white">
              {formatTxHash(txHash)}
            </code>
            {explorerUrl && (
              <a
                href={`${explorerUrl}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-400 text-sm font-medium mt-1 underline"
              >
                View on {networkInfo?.name || "Explorer"}
              </a>
            )}
          </div>
        )}

        {(writeError || confirmError) && (
          <div className="text-sm text-red-500 break-words bg-red-900/20 p-4 rounded-lg mt-4 w-full text-center">
            <span className="font-semibold">Error:</span>{" "}
            {writeError?.shortMessage ||
              confirmError?.shortMessage ||
              writeError?.message ||
              confirmError?.message ||
              "Unknown error."}
          </div>
        )}
      </div>
    </div>
  );
};
