"use client";

import { useEffect } from "react";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import {
  COUNTER_CONTRACT,
  SUPPORTED_CHAINS,
  NETWORK_CONFIG,
} from "@/constants";
import { useCallback } from "react";
import toast from "react-hot-toast";
import type { BaseError } from "wagmi";
import { useContractStore } from "@/store/contractStore";

export const useMultiValueContract = () => {
  const setContractState = useContractStore((state) => state.setContractState);
  const { address, chain } = useAccount();

  // Determine if we are on a supported chain
  const isOnSupportedChain =
    !!chain && SUPPORTED_CHAINS.some((c) => c.id === chain.id);

  // Read contract state: Count
  const {
    data: count,
    isLoading: isCountLoading,
    error: countError,
    refetch: refetchCount,
  } = useReadContract({
    address: COUNTER_CONTRACT.address,
    abi: COUNTER_CONTRACT.abi,
    functionName: "count",
    args: [],
    query: {
      enabled: isOnSupportedChain,
    },
  });

  // Read contract state: Name
  const {
    data: name,
    isLoading: isNameLoading,
    error: nameError,
    refetch: refetchName,
  } = useReadContract({
    address: COUNTER_CONTRACT.address,
    abi: COUNTER_CONTRACT.abi,
    functionName: "name",
    args: [],
    query: {
      enabled: isOnSupportedChain,
    },
  });

  // Read contract state: Active
  const {
    data: active,
    isLoading: isActiveLoading,
    error: activeError,
    refetch: refetchActive,
  } = useReadContract({
    address: COUNTER_CONTRACT.address,
    abi: COUNTER_CONTRACT.abi,
    functionName: "active",
    args: [],
    query: {
      enabled: isOnSupportedChain,
    },
  });

  // Combine all read loading and error states
  const isReadLoading = isCountLoading || isNameLoading || isActiveLoading;
  const readError = countError || nameError || activeError;

  // Write contract functions
  const {
    writeContract,
    data: wagmiWriteTxHash,
    isPending: isWalletInteractionPending,
    error: writeError,
  } = useWriteContract();

  // Wait for transaction confirmation on chain
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: wagmiWriteTxHash,
  });

  // Update Zustand store with read data and loading/error states
  useEffect(() => {
    const contractAddress = COUNTER_CONTRACT.address;
    const networkInfo = chain ? NETWORK_CONFIG[chain.id] : undefined;
    const networkName = networkInfo?.name || "Unsupported Network";
    const blockExplorerUrl = networkInfo?.blockExplorer;

    // Update Zustand store with the latest contract state
    setContractState({
      count: count !== undefined ? count : BigInt(0),
      name:
        name !== undefined ? name : isOnSupportedChain ? "Loading..." : "N/A",
      active:
        active !== undefined ? active : isOnSupportedChain ? false : false,
      isReadLoading: isReadLoading && isOnSupportedChain,
      // Cast readError to BaseError | null
      readError: (readError && isOnSupportedChain
        ? readError
        : null) as BaseError | null,
      contractAddress,
      networkName,
      blockExplorerUrl,
      isOnSupportedChain,
    });
  }, [
    count,
    name,
    active,
    isReadLoading,
    readError,
    isOnSupportedChain,
    chain,
    setContractState,
  ]);

  // Initiates a transaction to increment the counter on the smart contract and updates the zustand states accordingly.
  const incrementCounter = useCallback(async () => {
    if (!chain || !isOnSupportedChain) {
      toast.error("Please connect to a supported network (e.g., Sepolia).");
      return;
    }
    if (!address) {
      toast.error("Please connect your wallet to perform this action.");
      return;
    }
    setContractState({
      isWriting: true,
      txHash: null,
      isConfirmed: false,
      writeError: null,
      confirmError: null,
      isTransactionModalOpen: true,
    });
    try {
      writeContract({
        address: COUNTER_CONTRACT.address,
        abi: COUNTER_CONTRACT.abi,
        functionName: "increment",
        args: [],
      });
    } catch (error) {
      console.error("Failed to initiate increment (catch block):", error);
      toast.error("Failed to initiate transaction.");
      setContractState({ isWriting: false, isTransactionModalOpen: false });
    }
  }, [writeContract, chain, isOnSupportedChain, address, setContractState]);

  // Initiates a transaction to update the contract details and updates the zustand states accordingly.
  const updateDetails = useCallback(
    async (newCount: string, newName: string, newActive: boolean) => {
      if (!chain || !isOnSupportedChain) {
        toast.error("Please connect to a supported network (e.g., Sepolia).");
        return;
      }
      if (!address) {
        toast.error("Please connect your wallet to perform this action.");
        return;
      }

      const numCount = Number(newCount);
      if (isNaN(numCount) || numCount < 0 || !Number.isInteger(numCount)) {
        toast.error("Please enter a valid non-negative integer for Count.");
        return;
      }
      if (newName.trim() === "") {
        toast.error("Name cannot be empty.");
        return;
      }

      setContractState({
        isWriting: true,
        txHash: null,
        isConfirmed: false,
        writeError: null,
        confirmError: null,
        isTransactionModalOpen: true,
      });

      try {
        writeContract({
          address: COUNTER_CONTRACT.address,
          abi: COUNTER_CONTRACT.abi,
          functionName: "updateDetails",
          args: [BigInt(numCount), newName, newActive],
        });
      } catch (error) {
        console.error("Failed to initiate updateDetails (catch block):", error);
        toast.error("Failed to initiate transaction.");
        setContractState({ isWriting: false, isTransactionModalOpen: false }); // Close modal on immediate failure
      }
    },
    [writeContract, chain, isOnSupportedChain, address, setContractState]
  );

  // Handle wagmi write transaction hash
  useEffect(() => {
    if (wagmiWriteTxHash) {
      setContractState({ txHash: wagmiWriteTxHash });
    }
  }, [wagmiWriteTxHash, setContractState]);

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction confirmed!");
      refetchCount();
      refetchName();
      refetchActive();
      setContractState({
        isConfirmed: true,
        isWriting: false,
        isTransactionModalOpen: false,
      }); // Close modal on success
    }
  }, [isConfirmed, refetchCount, refetchName, refetchActive, setContractState]);

  // Handle write errors
  useEffect(() => {
    if (writeError) {
      if (writeError.message.includes("User rejected the request")) {
        toast.error("Transaction rejected by user.");
      } else {
        toast.error(
          `Transaction failed: ${
            (writeError as BaseError).shortMessage || writeError.message
          }`
        );
      }
      // Cast writeError to BaseError | null
      setContractState({
        isWriting: false,
        writeError: writeError as BaseError,
        txHash: null,
        isTransactionModalOpen: false,
      }); // Close modal on error
    }
  }, [writeError, setContractState]);

  // Handle confirmation errors
  useEffect(() => {
    if (confirmError) {
      toast.error(
        `Transaction confirmation failed: ${
          (confirmError as BaseError).shortMessage || confirmError.message
        }`
      );
      // Cast confirmError to BaseError | null
      setContractState({
        isWriting: false,
        confirmError: confirmError as BaseError,
        txHash: null,
        isTransactionModalOpen: false,
      }); // Close modal on error
    }
  }, [confirmError, setContractState]);

  // Update global isWriting state based on wagmi's pending/confirming
  useEffect(() => {
    setContractState({ isWriting: isWalletInteractionPending || isConfirming });
  }, [isWalletInteractionPending, isConfirming, setContractState]);

  return {
    incrementCounter,
    updateDetails,
  };
};
