"use client";

import { WalletInfo } from "../../types/wallet.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Calendar, Activity, Copy, ExternalLink } from "lucide-react";
import { StellarAddress } from "@/components/ui/stellar-address";

interface WalletInfoCardProps {
  walletInfo: WalletInfo | null;
}

export function WalletInfoCard({ walletInfo }: WalletInfoCardProps) {
  const handleCopyAddress = () => {
    if (walletInfo?.address) {
      navigator.clipboard.writeText(walletInfo.address);
    }
  };

  const handleViewOnExplorer = () => {
    if (walletInfo?.address) {
      window.open(
        `https://stellar.expert/explorer/public/account/${walletInfo.address}`,
        "_blank"
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Wallet Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {walletInfo ? (
          <>
            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Wallet Address
              </label>
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <StellarAddress
                  address={walletInfo.address}
                  className="flex-1 font-mono text-sm"
                />
                <button
                  onClick={handleCopyAddress}
                  className="p-1 hover:bg-muted/50 rounded-md transition-colors"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={handleViewOnExplorer}
                  className="p-1 hover:bg-muted/50 rounded-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Network Info */}
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

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Created
                </label>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">
                    {walletInfo.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  Last Activity
                </label>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground">
                    {walletInfo.lastActivity.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Loading wallet information...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
