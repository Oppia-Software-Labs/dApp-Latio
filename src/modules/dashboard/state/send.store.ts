import { create } from "zustand";
import { SendModalState, SendRecipient, SendAmount } from "../types/send.types";
import { toast } from "sonner";

interface SendStore extends SendModalState {
  // Actions
  openModal: () => void;
  closeModal: () => void;
  setStep: (step: SendModalState["step"]) => void;
  setRecipient: (recipient: SendRecipient) => void;
  setAmount: (amount: SendAmount) => void;
  setDescription: (description: string) => void;
  setMemo: (memo: string) => void;
  resetModal: () => void;
  sendTransaction: (keyId: string, contractId: string) => Promise<void>;
}

const initialState: SendModalState = {
  isOpen: false,
  step: "recipient",
  isLoading: false,
  transactionHash: undefined,
};

export const useSendStore = create<SendStore>((set, get) => ({
  ...initialState,

  openModal: () => {
    set({ isOpen: true, step: "recipient", error: undefined });
  },

  closeModal: () => {
    set({ isOpen: false });
    get().resetModal();
  },

  setStep: (step) => {
    set({ step, error: undefined });
  },

  setRecipient: (recipient) => {
    set({ recipient, step: "amount" });
  },

  setAmount: (amount) => {
    set({ amount, step: "confirm" });
  },

  setDescription: (description) => {
    set({ description });
  },

  setMemo: (memo) => {
    set({ memo });
  },

  resetModal: () => {
    set({
      step: "recipient",
      recipient: undefined,
      amount: undefined,
      description: undefined,
      memo: undefined,
      isLoading: false,
      error: undefined,
      transactionHash: undefined,
    });
  },

  sendTransaction: async (keyId: string, contractId: string) => {
    const { recipient, amount } = get();

    if (!recipient || !amount) {
      set({ error: "Missing recipient or amount" });
      return;
    }

    if (!keyId || !contractId) {
      set({ error: "Not authenticated" });
      return;
    }

    set({ isLoading: true, error: undefined });

    try {
      // Import wallet service directly
      const { walletService } = await import(
        "../../wallet/services/wallet.service"
      );

      // Send real transaction
      const result = await walletService.sendXLM(
        recipient.address,
        amount.amount,
        keyId,
        contractId
      );

      // Store transaction hash for success step
      set({
        step: "success",
        transactionHash: result.hash,
      });

      // Close modal after 10 seconds
      setTimeout(() => {
        get().closeModal();
      }, 10000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send transaction";
      set({ error: errorMessage });

      toast.error("Transaction failed", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
