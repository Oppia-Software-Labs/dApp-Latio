"use client";

import { Balance } from "../../types/dashboard.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Download, TrendingUp, Loader2 } from "lucide-react";
import { useSendStore } from "../../state/send.store";
import { useReceiveStore } from "../../state/receive.store";

interface BalanceCardProps {
  balance: Balance;
  isLoading?: boolean;
}

export function BalanceCard({ balance, isLoading = false }: BalanceCardProps) {
  const { openModal } = useSendStore();
  const { openModal: openReceiveModal } = useReceiveStore();

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <Card className="bg-card border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Wallet Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* XLM Balance */}
        <div className="bg-background rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Stellar (XLM)</p>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  <span className="text-2xl font-bold text-muted-foreground">
                    Loading...
                  </span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-foreground">
                  {balance.xlm.toLocaleString()} XLM
                </p>
              )}
            </div>
            <div className="text-right">
              {!isLoading && (
                <>
                  <p className="text-sm text-muted-foreground">
                    ≈ {formatCurrency(balance.usd, "USD")}
                  </p>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2.4%
                  </div>
                </>
              )}
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
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  <span className="text-xl font-semibold text-muted-foreground">
                    Loading...
                  </span>
                </div>
              ) : (
                <p className="text-xl font-semibold text-foreground">
                  {balance.localCurrency.symbol}
                  {balance.localCurrency.amount.toLocaleString()}
                </p>
              )}
            </div>
            <div className="text-right">
              {!isLoading && (
                <p className="text-sm text-muted-foreground">
                  ≈ {formatCurrency(balance.usd, "USD")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={openModal}
            className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button
            onClick={openReceiveModal}
            variant="outline"
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Receive
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
