"use client";

import { formatNumber, formatAddress } from "@/helpers";
import { CheckCircle, XCircle } from "lucide-react";
import { useContractStore } from "@/store/contractStore";

const Skeleton = ({
  width,
  height = 30,
}: {
  width: number;
  height?: number;
}) => (
  <div
    className="animate-pulse bg-[#393939] rounded-md"
    style={{ width: `${width}px`, height: `${height}px` }}
  />
);

const InfoRow = ({
  label,
  children,
  loading,
}: {
  label: string;
  children: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <div className="flex justify-between items-center pt-1 border-t border-[#333333] first:border-none">
      <p className="text-xs text-gray-200 uppercase tracking-wider font-medium">
        {label}
      </p>
      <div className="text-right max-w-[60%] truncate">
        {loading ? <Skeleton width={60} /> : children}
      </div>
    </div>
  );
};

export const MultiValueDisplay = () => {
  const {
    count,
    name,
    active,
    isReadLoading,
    readError,
    contractAddress,
    networkName,
    blockExplorerUrl,
  } = useContractStore();

  if (readError) {
    return (
      <div className="bg-[#1b1b1b] border rounded-2xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-semibold text-red-500 mb-4">
          Error Reading Contract
        </h3>
        <p className="text-base text-gray-400">{readError.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1b1b1b] border border-[#393939] rounded-2xl p-6 shadow-2xl flex flex-col justify-between min-h-[380px]">
      <h3 className="text-xl font-bold text-center mb-6 text-white">
        Current Contract Values
      </h3>

      {/* Contract Info */}
      <div className="mb-6 p-4 bg-[#393939] rounded-lg border border-[#333333] text-sm space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-200 font-medium">Contract:</span>
          <code className="text-white font-mono text-right break-all">
            {formatAddress(contractAddress, 6)}
          </code>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-200 font-medium">Network:</span>
          <span className="text-white text-right">{networkName}</span>
        </div>
        {blockExplorerUrl && (
          <div className="text-center mt-3">
            <a
              href={`${blockExplorerUrl}/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-asva-yellow hover:text-yellow-400 text-xs font-medium underline"
            >
              View on Explorer
            </a>
          </div>
        )}
      </div>

      {/* Contract Values */}
      <div className="flex-grow flex flex-col justify-center space-y-6">
        <InfoRow label="Count" loading={isReadLoading}>
          <div className="text-xl font-extrabold text-asva-yellow tracking-tighter leading-none">
            {formatNumber(Number(count))}
          </div>
        </InfoRow>

        <InfoRow label="Name" loading={isReadLoading}>
          <div className="text-xl font-semibold text-white truncate">
            {name}
          </div>
        </InfoRow>

        <InfoRow label="Active Status" loading={isReadLoading}>
          <div className="flex items-center gap-2 text-xl font-semibold">
            {active ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-500">True</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-500">False</span>
              </>
            )}
          </div>
        </InfoRow>
      </div>
    </div>
  );
};
