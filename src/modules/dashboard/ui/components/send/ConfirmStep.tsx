"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSendStore } from "../../../state/send.store";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";

export function ConfirmStep() {
  const {
    recipient,
    amount,
    description,
    memo,
    setMemo,
    setStep,
    sendTransaction,
    isLoading,
  } = useSendStore();

  const handleBack = () => {
    setStep("amount");
  };

  const handleSend = () => {
    sendTransaction();
  };

  if (!recipient || !amount) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Missing transaction details</p>
        <Button onClick={handleBack} className="mt-2">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Transaction Summary */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-3">
        <h3 className="font-medium text-foreground">Transaction Summary</h3>

        {/* Recipient */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {recipient.avatar}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">
              {recipient.name}
            </p>
            <p className="text-xs text-muted-foreground">{recipient.address}</p>
          </div>
        </div>

        {/* Amount */}
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="font-semibold text-lg text-foreground">
              {amount.amount} {amount.currency}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Network Fee:</span>
            <span>
              {amount.fee} {amount.currency}
            </span>
          </div>
          <div className="flex justify-between items-center font-medium border-t pt-1">
            <span className="text-foreground">Total:</span>
            <span className="text-foreground">
              {amount.total.toFixed(2)} {amount.currency}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground/70">
            <span>≈ {amount.xlmEquivalent.toFixed(4)} XLM</span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Description:
              </span>
              <span className="text-sm text-foreground">{description}</span>
            </div>
          </div>
        )}
      </div>

      {/* Memo (Optional) */}
      <div>
        <Label className="text-sm font-medium">Memo (Optional)</Label>
        <Input
          placeholder="Add a memo for this transaction"
          value={memo || ""}
          onChange={(e) => setMemo(e.target.value)}
          className="mt-2"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Memos help you identify this transaction later
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 dark:text-blue-100">
              Secure Transaction
            </p>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              This transaction will be signed with your Passkey and processed on
              the Stellar network.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isLoading}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleSend}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Send Transaction
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
