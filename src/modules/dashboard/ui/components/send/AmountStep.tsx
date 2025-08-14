"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSendStore } from "../../../state/send.store";
import { useWalletStore } from "@/modules/wallet/state/wallet.store";
import {
  getAvailableCurrencies,
  formatBalance,
} from "@/modules/wallet/utils/balance.util";
import {
  calculateFee,
  calculateXlmEquivalent,
  calculateTotal,
} from "../../../data/send-mock-data";
import { SendAmount } from "../../../types/send.types";
import { ArrowLeft, DollarSign, Calculator } from "lucide-react";
import { StellarAddress } from "@/components/ui/stellar-address";

export function AmountStep() {
  const { recipient, setAmount, setStep, setDescription } = useSendStore();
  const { balance } = useWalletStore();

  // Get real currencies from wallet balance
  const availableCurrencies = getAvailableCurrencies(balance);
  const [selectedCurrency, setSelectedCurrency] = useState(
    availableCurrencies[0]
  );
  const [amount, setAmountValue] = useState("");
  const [description, setDescriptionValue] = useState("");

  const fee = calculateFee(selectedCurrency.code, parseFloat(amount) || 0);
  const xlmEquivalent = calculateXlmEquivalent(
    parseFloat(amount) || 0,
    selectedCurrency.code
  );
  const total = calculateTotal(parseFloat(amount) || 0, fee);

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    const sendAmount: SendAmount = {
      amount: parseFloat(amount),
      currency: selectedCurrency.code,
      xlmEquivalent,
      fee,
      total,
    };

    setAmount(sendAmount);
    if (description) {
      setDescription(description);
    }
  };

  const handleBack = () => {
    setStep("recipient");
  };

  const isAmountValid =
    parseFloat(amount) > 0 && parseFloat(amount) <= selectedCurrency.balance;

  return (
    <div className="space-y-4">
      {/* Recipient Info */}
      {recipient && (
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {recipient.avatar}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">
              {recipient.name}
            </p>
            <p className="text-xs text-muted-foreground">
              <StellarAddress address={recipient.address} />
            </p>
          </div>
        </div>
      )}

      {/* Currency Selection */}
      <div>
        <Label className="text-sm font-medium">Currency</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {availableCurrencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => setSelectedCurrency(currency)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                selectedCurrency.code === currency.code
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="text-sm font-medium text-foreground">
                {currency.symbol}
              </div>
              <div className="text-xs text-muted-foreground">
                {currency.code}
              </div>
              <div className="text-xs text-muted-foreground/70">
                {formatBalance(currency.balance, currency.code)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <Label className="text-sm font-medium">Amount</Label>
        <div className="relative mt-2">
          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmountValue(e.target.value)}
            className="pl-10"
            step="0.01"
            min="0"
            max={selectedCurrency.balance}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Available:{" "}
          {formatBalance(selectedCurrency.balance, selectedCurrency.code)}
        </p>
      </div>

      {/* Description */}
      <div>
        <Label className="text-sm font-medium">Description (Optional)</Label>
        <Input
          placeholder="What's this payment for?"
          value={description}
          onChange={(e) => setDescriptionValue(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Fee Breakdown */}
      <div className="bg-muted/30 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Fee Breakdown
          </span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span className="text-foreground">
              {parseFloat(amount) || 0} {selectedCurrency.code}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network Fee:</span>
            <span className="text-foreground">
              {fee} {selectedCurrency.code}
            </span>
          </div>
          <div className="flex justify-between font-medium border-t pt-1">
            <span className="text-foreground">Total:</span>
            <span className="text-foreground">
              {total.toFixed(2)} {selectedCurrency.code}
            </span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>≈ {xlmEquivalent.toFixed(4)} XLM</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!isAmountValid}
          className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
