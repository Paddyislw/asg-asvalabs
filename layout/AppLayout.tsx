"use client"

import type { ReactNode } from "react"
import { CustomConnectButton } from "@/components/CustomConnectButton"
interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans"> 
      <header className="bg-black py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white"> 
              <span className="text-asva-yellow">▲</span> ASVA LABS 
            </h1>
          </div>
          <div className="flex items-center gap-4">            
            <CustomConnectButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  )
}
