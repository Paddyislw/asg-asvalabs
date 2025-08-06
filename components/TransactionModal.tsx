"use client"

import React from "react"
import { X } from 'lucide-react'
import { TransactionStatus } from "./TransactionStatus" 
import { useContractStore } from "@/store/contractStore" 

export const TransactionModal = () => {
  const { isTransactionModalOpen, setContractState } = useContractStore()

  const handleClose = () => {
    setContractState({ isTransactionModalOpen: false })
  }

  const modalClasses = isTransactionModalOpen
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none"; 

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4 transition-opacity duration-300 ${modalClasses}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-modal-title"
    >
      <div
        className={`relative bg-[#0a0a0a] border border-[#333333] rounded-2xl p-8 shadow-2xl w-full max-w-lg mx-auto transform transition-transform duration-300 ease-out ${modalClasses}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="transaction-modal-title" className="text-2xl font-bold text-white">
            Transaction Details
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full"
            aria-label="Close transaction modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <TransactionStatus />
      </div>
    </div>
  )
}
