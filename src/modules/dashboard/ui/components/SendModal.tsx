"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSendStore } from "../../state/send.store";
import { RecipientStep } from "./send/RecipientStep";
import { AmountStep } from "./send/AmountStep";
import { ConfirmStep } from "./send/ConfirmStep";
import { SuccessStep } from "./send/SuccessStep";

export function SendModal() {
  const { isOpen, step, closeModal } = useSendStore();

  const getStepTitle = () => {
    switch (step) {
      case 'recipient':
        return "Send Money";
      case 'amount':
        return "Enter Amount";
      case 'confirm':
        return "Confirm Transaction";
      case 'success':
        return "Transaction Sent!";
      default:
        return "Send Money";
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'recipient':
        return <RecipientStep />;
      case 'amount':
        return <AmountStep />;
      case 'confirm':
        return <ConfirmStep />;
      case 'success':
        return <SuccessStep />;
      default:
        return <RecipientStep />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {getStepTitle()}
          </DialogTitle>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
