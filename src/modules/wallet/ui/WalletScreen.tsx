"use client";

import { useEffect } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useWalletStore } from "../state/wallet.store";
import { WalletBalanceCard } from "./components/WalletBalanceCard";
import { WalletInfoCard } from "./components/WalletInfoCard";
import { TestnetFundCard } from "./components/TestnetFundCard";
import { TransactionsCard } from "./components/TransactionsCard";
import { Loader2 } from "lucide-react";

export function WalletScreen() {
  const { keyId, contractId } = useAuth();
  const {
    balance,
    walletInfo,
    transactions,
    isLoading,
    error,
    fetchBalance,
    fetchWalletInfo,
    fetchTransactions,
  } = useWalletStore();

  useEffect(() => {
    if (contractId) {
      // Fetch wallet data using contractId (wallet address)
      fetchBalance(contractId);
      fetchWalletInfo(contractId);
      fetchTransactions(contractId);
    }
  }, [contractId, fetchBalance, fetchWalletInfo, fetchTransactions]);

  if (isLoading && !balance) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading wallet data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !balance) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Error Loading Wallet
            </h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => contractId && fetchBalance(contractId)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Smart Wallet</h1>
            <p className="text-muted-foreground">
              Manage your Stellar smart wallet and view real-time balance
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last updated</p>
            <p className="text-sm font-medium text-foreground">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Balance & Testnet Fund */}
          <div className="space-y-6">
            <WalletBalanceCard balance={balance} isLoading={isLoading} />
            <TestnetFundCard />
          </div>

          {/* Right Column - Wallet Info & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <WalletInfoCard walletInfo={walletInfo} />
            <TransactionsCard
              transactions={transactions}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Connected to Stellar Testnet • Smart Wallet powered by Soroban
          </p>
        </div>
      </div>
    </div>
  );
}
