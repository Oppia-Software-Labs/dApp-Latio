"use client";

import { WalletBalance } from "../../types/wallet.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, RefreshCw } from "lucide-react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useWalletStore } from "../../state/wallet.store";

interface WalletBalanceCardProps {
  balance: WalletBalance | null;
  isLoading: boolean;
}

export function WalletBalanceCard({
  balance,
  isLoading,
}: WalletBalanceCardProps) {
  const { keyId } = useAuth();
  const { fetchBalance } = useWalletStore();

  const handleRefresh = () => {
    if (keyId) {
      fetchBalance(keyId);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

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

        {/* Local Currency */}
        {balance && (
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
        )}

        {/* Network Status */}
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Network:</span>
            <span className="text-foreground font-medium">Testnet</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Status:</span>
            <span className="text-green-600 font-medium">Connected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
