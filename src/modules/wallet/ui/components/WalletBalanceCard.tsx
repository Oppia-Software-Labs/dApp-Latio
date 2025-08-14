"use client";

import { WalletBalance } from "../../types/wallet.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useWalletStore } from "../../state/wallet.store";
import { RefreshCw, TrendingUp } from "lucide-react";

interface WalletBalanceCardProps {
  balance: WalletBalance | null;
  isLoading: boolean;
}

export function WalletBalanceCard({
  balance,
  isLoading,
}: WalletBalanceCardProps) {
  const { contractId } = useAuth();
  const { fetchBalance } = useWalletStore();

  const handleRefresh = () => {
    if (contractId) {
      fetchBalance(contractId);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  if (!balance) {
    return (
      <Card className="bg-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No balance data available</p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="mt-2"
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Wallet Balance
          </CardTitle>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-1 hover:bg-muted/50 rounded-md transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 text-muted-foreground ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* XLM Balance */}
        <div className="bg-background rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Stellar (XLM)</p>
              <p className="text-2xl font-bold text-foreground">
                {balance ? balance.xlm.toLocaleString() : "0"} XLM
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                ≈ {balance ? formatCurrency(balance.usd, "USD") : "$0.00"}
              </p>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.4%
              </div>
            </div>
          </div>
        </div>

        {/* USD Balance */}
        <div className="bg-background rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">USD</p>
              <p className="text-xl font-semibold text-foreground">
                {formatCurrency(balance.usd, "USD")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                ≈ {balance.xlm.toFixed(2)} XLM
              </p>
            </div>
          </div>
        </div>

        {/* EUR Balance */}
        <div className="bg-background rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">EUR</p>
              <p className="text-xl font-semibold text-foreground">
                {formatCurrency(balance.eur.amount, "EUR")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                ≈ {formatCurrency(balance.usd, "USD")}
              </p>
            </div>
          </div>
        </div>

        {/* Local Currency */}
        <div className="bg-background rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Local ({balance.localCurrency.currency})
              </p>
              <p className="text-xl font-semibold text-foreground">
                {balance.localCurrency.symbol}
                {balance.localCurrency.amount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                ≈ {formatCurrency(balance.usd, "USD")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
