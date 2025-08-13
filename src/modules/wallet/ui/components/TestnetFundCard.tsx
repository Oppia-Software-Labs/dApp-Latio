"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useWalletStore } from "../../state/wallet.store";
import { Coins, Zap, Info } from "lucide-react";

export function TestnetFundCard() {
  const { keyId } = useAuth();
  const { requestFunds, isLoading } = useWalletStore();

  const handleRequestFunds = () => {
    if (keyId) {
      requestFunds(keyId, 10000); // 10,000 stroops = 0.01 XLM
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Coins className="w-5 h-5" />
          Testnet Funds
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Get Testnet XLM
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-1">
                Request free XLM from Stellar Friendbot to test transactions on
                the testnet.
              </p>
            </div>
          </div>
        </div>

        {/* Fund Request Button */}
        <Button
          onClick={handleRequestFunds}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Requesting...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Request 10,000 XLM
            </>
          )}
        </Button>

        {/* Fund Details */}
        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount:</span>
            <span className="text-foreground font-medium">10,000 XLM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Network:</span>
            <span className="text-foreground">Testnet</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Provider:</span>
            <span className="text-foreground">Friendbot</span>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center">
          Testnet funds are free and can only be used for testing. They have no
          real value.
        </p>
      </CardContent>
    </Card>
  );
}
