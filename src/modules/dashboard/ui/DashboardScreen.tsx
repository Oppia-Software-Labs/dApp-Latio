"use client";

import React from "react";
import { BalanceCard } from "./components/BalanceCard";
import { QuickActions } from "./components/QuickActions";
import { TransactionsList } from "./components/TransactionsList";
import { TripsList } from "./components/TripsList";
import { StatsGrid } from "./components/StatsGrid";
import { ExchangeRates } from "./components/ExchangeRates";
import { SendModal } from "./components/SendModal";
import { ReceiveModal } from "./components/ReceiveModal";
import { useSendStore } from "../state/send.store";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useWalletStore } from "@/modules/wallet/state/wallet.store";
import {
  mockBalance,
  mockTransactions,
  mockTrips,
  mockExchangeRates,
  mockStats,
  mockQuickActions,
} from "../data/mock-data";

export function DashboardScreen() {
  const { contractId } = useAuth();
  const { balance, isLoading, fetchBalance } = useWalletStore();

  // Fetch real balance when component mounts or contractId changes
  React.useEffect(() => {
    if (contractId && contractId.trim() !== "") {
      fetchBalance(contractId);
    }
  }, [contractId, fetchBalance]);

  // Use real balance if available, otherwise fall back to mock
  const displayBalance = balance || mockBalance;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s your financial overview.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last updated</p>
            <p className="text-sm font-medium text-foreground">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={mockStats} exchangeRates={mockExchangeRates} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Balance & Quick Actions */}
          <div className="space-y-6">
            <BalanceCard balance={displayBalance} isLoading={isLoading} />
            <QuickActions actions={mockQuickActions} />
          </div>

          {/* Center Column - Transactions */}
          <div className="lg:col-span-2">
            <TransactionsList transactions={mockTransactions} />
          </div>
        </div>

        {/* Bottom Row - Trips & Exchange Rates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TripsList trips={mockTrips} />
          <ExchangeRates exchangeRates={mockExchangeRates} />
        </div>

        {/* Footer Info */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Powered by Stellar • Secure with Passkey • Real-time updates
          </p>
        </div>
      </div>

      {/* Modals */}
      <SendModal />
      <ReceiveModal />
    </div>
  );
}
