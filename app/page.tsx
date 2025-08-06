"use client";

import { AppLayout } from "@/layout/AppLayout";
import { MultiValueDisplay } from "@/components/MultiValueDisplay";
import { MultiValueControls } from "@/components/MultiValueControls";
import { TransactionModal } from "@/components/TransactionModal";
import { useMultiValueContract } from "@/hooks/useMultiValueContract";
import { FEATURE_LIST } from "@/constants";

export default function HomePage() {
  // Run contract hook to initialize Zustand store & logic
  useMultiValueContract();

  return (
    <AppLayout>
      <main className="space-y-12 mt-24">
        {/* Header Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Web3 Frontend Assessment Project
          </h1>
          <p className="text-lg text-gray-400">
            This application interacts with a custom smart contract,
            <span className="font-semibold text-white">
              {" "}
              &quot;MultiValueCounter&quot;{" "}
            </span>
            which was made by me and deployed on the
            <span className="font-semibold text-white"> Sepolia testnet</span>.
            View contract at:{" "}
            <a
              href="https://sepolia.etherscan.io/address/0x82c040c28D9655700A230f4F07aa63Fb7ed1ae0e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-asva-yellow hover:text-yellow-400 font-medium underline"
            >
              0x82c040c28D9655700A230f4F07aa63Fb7ed1ae0e
            </a>
            .
          </p>
          <p className="text-lg font-semibold text-asva-yellow bg-asva-yellow/20 p-3 rounded-lg">
            This project was developed as part of a Web3 Frontend Assignment.
          </p>
        </section>

        {/* Components Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MultiValueDisplay />
          <MultiValueControls />
        </section>

        {/* Feature List */}
        <section className="bg-black border border-[#333333] rounded-2xl p-6 shadow-lg mt-8">
          <h2 className="text-xl font-bold mb-6 text-white text-center">
            Features Demonstrated
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            {FEATURE_LIST.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-2 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]"
              >
                <div className="w-3 h-3 bg-asva-yellow rounded-full flex-shrink-0"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Transaction Modal */}
      <TransactionModal />
    </AppLayout>
  );
}
