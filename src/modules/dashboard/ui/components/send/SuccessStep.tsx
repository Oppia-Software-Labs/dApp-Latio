"use client";

import { Button } from "@/components/ui/button";
import { StellarAddress } from "@/components/ui/stellar-address";
import { useSendStore } from "../../../state/send.store";
import { CheckCircle, Copy, ExternalLink, Home } from "lucide-react";

export function SuccessStep() {
  const { recipient, amount, transactionHash, closeModal } = useSendStore();

  const handleCopyTransactionId = () => {
    if (transactionHash) {
      navigator.clipboard.writeText(transactionHash);
    }
  };

  const handleViewOnExplorer = () => {
    if (transactionHash) {
      // Use Stellar Lab explorer for testnet
      window.open(
        `https://stellar.expert/explorer/testnet/tx/${transactionHash}`,
        "_blank"
      );
    }
  };

  return (
    <div className="text-center space-y-6 py-4">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Transaction Sent Successfully!
        </h3>
        <p className="text-muted-foreground">
          Your payment has been processed and is now on the Stellar network.
        </p>
      </div>

      {/* Transaction Details */}
      {recipient && amount && (
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {recipient.avatar}
              </span>
            </div>
            <div className="text-left">
              <p className="font-medium text-sm text-foreground">
                {recipient.name}
              </p>
              <p className="text-xs text-muted-foreground">
                <StellarAddress address={recipient.address} />
              </p>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Amount Sent:
              </span>
              <span className="font-semibold text-foreground">
                {amount.amount} {amount.currency}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Network Fee:</span>
              <span>
                {amount.fee} {amount.currency}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground/70">
              <span>Transaction ID:</span>
              <span className="font-mono">
                {transactionHash ? (
                  <StellarAddress address={transactionHash} />
                ) : (
                  "Loading..."
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCopyTransactionId}
            className="flex-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy TX ID
          </Button>
          <Button
            variant="outline"
            onClick={handleViewOnExplorer}
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </Button>
        </div>

        <Button
          onClick={closeModal}
          className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Additional Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Transaction will appear in your history within 5 seconds</p>
        <p>• You can track this transaction on the Stellar network</p>
        <p>• Recipient will receive the funds instantly</p>
      </div>
    </div>
  );
}
