"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useWalletStore } from "../../state/wallet.store";
import { Coins, Loader2, Info } from "lucide-react";

export function TestnetFundCard() {
  const { contractId } = useAuth();
  const { requestFunds, isLoading } = useWalletStore();

  const handleRequestFunds = async () => {
    if (contractId) {
      await requestFunds(contractId, 10000); // 10 XLM
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Coins className="w-5 h-5" />
          Request Testnet Funds
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Get Free Testnet XLM
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-1">
                Request free XLM from Stellar Friendbot to test transactions on
                the testnet.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleRequestFunds}
          disabled={isLoading || !contractId}
          className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Requesting...
            </>
          ) : (
            <>
              <Coins className="w-4 h-4 mr-2" />
              Request 10 XLM
            </>
          )}
        </Button>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center">
          Testnet funds are free and can only be used for testing. They have no
          real value.
        </p>
      </CardContent>
    </Card>
  );
}
