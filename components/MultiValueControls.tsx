"use client";

import { useState, useMemo, useEffect } from "react";
import { useContractStore } from "@/store/contractStore";
import { useMultiValueContract } from "@/hooks/useMultiValueContract";
import { useAccount } from "wagmi";

const inputClass =
  "w-full px-4 py-2 border border-[#333333] rounded-lg bg-[#0a0a0a] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors duration-200";

const buttonClass =
  "border text-yellow-400 border-yellow-400 hover:border-yellow-600 hover:text-yellow-600 disabled:bg-[#393939] disabled:border-0 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 w-full";

export const MultiValueControls = () => {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  const {
    isWriting,
    isOnSupportedChain,
    txHash,
    isConfirmed,
    writeError,
    confirmError,
    setContractState,
  } = useContractStore();

  const { incrementCounter, updateDetails } = useMultiValueContract();

  const [newCountInput, setNewCountInput] = useState("");
  const [newNameInput, setNewNameInput] = useState("");
  const [newActiveInput, setNewActiveInput] = useState(false);

  const [isIncrementingLocal, setIsIncrementingLocal] = useState(false);
  const [isUpdatingDetailsLocal, setIsUpdatingDetailsLocal] = useState(false);

  // Disable write actions if writing, updating, incrementing, not connected, or on wrong chain
  const isWriteDisabled = useMemo(
    () =>
      isWriting ||
      isIncrementingLocal ||
      isUpdatingDetailsLocal ||
      !isConnected ||
      !isOnSupportedChain,
    [
      isWriting,
      isIncrementingLocal,
      isUpdatingDetailsLocal,
      isConnected,
      isOnSupportedChain,
    ]
  );

  // Handle increment action
  const handleIncrement = async () => {
    setIsIncrementingLocal(true);
    try {
      await incrementCounter();
    } finally { 
      setIsIncrementingLocal(false);
    }
  };

  // Handle update details action
  const handleUpdateDetails = async () => {
    setIsUpdatingDetailsLocal(true);
    try {
      await updateDetails(newCountInput, newNameInput, newActiveInput);
    } finally {
      setIsUpdatingDetailsLocal(false);
    }
  };

  // Handle view status click
  const handleViewStatusClick = () => {
    setContractState({ isTransactionModalOpen: true });
  };

  // Determine the status button text based on current state
  const statusButtonText = useMemo(() => {
    if (isWriting) return "View Pending Transaction";
    if (isConfirmed) return "View Last Transaction (Confirmed)";
    if (writeError || confirmError) return "View Last Transaction (Failed)";
    return "View Transaction Status";
  }, [isWriting, isConfirmed, writeError, confirmError]);

  // Show status button if there is a transaction hash or errors
  const showStatusButton = isWriting || txHash || writeError || confirmError;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[#1b1b1b] border border-[#393939] rounded-2xl p-6 shadow-lg ">
      <h3 className="text-2xl font-bold mb-6 text-white">Contract Actions</h3>

      {/* Increment Button */}
      <div className="space-y-6">
        <button
          onClick={handleIncrement}
          disabled={isWriteDisabled}
          className={buttonClass}
        >
          {isIncrementingLocal ? "Incrementing..." : "Increment Count"}
        </button>

        {/* Update All Details */}
        <div className="border-t border-[#333333] pt-6 mt-6 space-y-6">
          <h4 className="text-xl font-semibold text-white">
            Update All Details
          </h4>

          <InputField
            id="newCount"
            label="New Count"
            value={newCountInput}
            onChange={setNewCountInput}
            placeholder="Enter new count"
            type="number"
            disabled={isWriteDisabled}
          />

          <InputField
            id="newName"
            label="New Name"
            value={newNameInput}
            onChange={setNewNameInput}
            placeholder="Enter new name"
            disabled={isWriteDisabled}
          />

          <div className="flex items-center gap-3">
            <input
              id="newActive"
              type="checkbox"
              checked={newActiveInput}
              onChange={(e) => setNewActiveInput(e.target.checked)}
              className="h-5 w-5 text-yellow-400 border-[#333333] rounded focus:ring-yellow-400 bg-[#0a0a0a]"
              disabled={isWriteDisabled}
            />
            <label
              htmlFor="newActive"
              className="text-base font-medium text-gray-300"
            >
              Set Active
            </label>
          </div>

          <button
            onClick={handleUpdateDetails}
            disabled={isWriteDisabled}
            className={buttonClass}
          >
            {isUpdatingDetailsLocal ? "Updating..." : "Update All Details"}
          </button>
        </div>
      </div>

      {/* Connection & Network Status */}
      {mounted && !isConnected && (
        <p className="text-center text-sm text-gray-400 mt-6">
          Connect your wallet to enable contract write actions.
        </p>
      )}
      {mounted && isConnected && !isOnSupportedChain && (
        <p className="text-center text-sm text-red-500 mt-6">
          Switch to a supported network (e.g., Sepolia) to enable contract write
          actions.
        </p>
      )}

      {/* Transaction Status Button */}
      {showStatusButton && (
        <div className="mt-6 pt-6 border-t border-[#333333]">
          <button
            onClick={handleViewStatusClick}
            className="bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 w-full border border-[#333333]"
          >
            {statusButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
        disabled={disabled}
      />
    </div>
  );
};
