"use client";

import { WalletInfo } from "../../types/wallet.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { StellarAddress } from "@/components/ui/stellar-address";
import { Copy, ExternalLink, Wallet, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface WalletInfoCardProps {
  walletInfo: WalletInfo | null;
}

export function WalletInfoCard({ walletInfo }: WalletInfoCardProps) {
  const { contractId } = useAuth();

  const handleCopyAddress = () => {
    if (contractId) {
      navigator.clipboard.writeText(contractId);
      toast.success("Wallet address copied to clipboard");
    }
  };

  const handleViewOnExplorer = () => {
    if (contractId) {
      window.open(
        `https://stellar.expert/explorer/testnet/contract/${contractId}`,
        "_blank"
      );
    }
  };

  if (walletInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Wallet Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wallet Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Smart Wallet Address
            </label>
            <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <div className="flex-1 font-mono text-sm">
                <StellarAddress
                  address={contractId || ""}
                  className="text-foreground"
                />
              </div>
              <button
                onClick={handleCopyAddress}
                className="p-1 hover:bg-muted/50 rounded-md transition-colors"
                title="Copy address"
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={handleViewOnExplorer}
                className="p-1 hover:bg-muted/50 rounded-md transition-colors"
                title="View on explorer"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Wallet Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Network
              </label>
              <div className="p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium text-foreground capitalize">
                  {walletInfo.network}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Smart Wallet Info */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Smart Wallet
                </p>
                <p className="text-blue-700 dark:text-blue-300 mt-1">
                  This is a Soroban smart contract wallet secured by your
                  passkey.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Wallet Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Loading wallet information...</p>
        </div>
      </CardContent>
    </Card>
  );
}
