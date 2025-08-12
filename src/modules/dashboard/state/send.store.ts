import { create } from "zustand";
import { SendModalState, SendRecipient, SendAmount } from "../types/send.types";
import { toast } from "sonner";

interface SendStore extends SendModalState {
  // Actions
  openModal: () => void;
  closeModal: () => void;
  setStep: (step: SendModalState['step']) => void;
  setRecipient: (recipient: SendRecipient) => void;
  setAmount: (amount: SendAmount) => void;
  setDescription: (description: string) => void;
  setMemo: (memo: string) => void;
  resetModal: () => void;
  sendTransaction: () => Promise<void>;
}

const initialState: SendModalState = {
  isOpen: false,
  step: 'recipient',
  isLoading: false,
};

export const useSendStore = create<SendStore>((set, get) => ({
  ...initialState,

  openModal: () => {
    set({ isOpen: true, step: 'recipient', error: undefined });
  },

  closeModal: () => {
    set({ isOpen: false });
    get().resetModal();
  },

  setStep: (step) => {
    set({ step, error: undefined });
  },

  setRecipient: (recipient) => {
    set({ recipient, step: 'amount' });
  },

  setAmount: (amount) => {
    set({ amount, step: 'confirm' });
  },

  setDescription: (description) => {
    set({ description });
  },

  setMemo: (memo) => {
    set({ memo });
  },

  resetModal: () => {
    set({
      step: 'recipient',
      recipient: undefined,
      amount: undefined,
      description: undefined,
      memo: undefined,
      isLoading: false,
      error: undefined,
    });
  },

  sendTransaction: async () => {
    const { recipient, amount, description } = get();
    
    if (!recipient || !amount) {
      set({ error: "Missing recipient or amount" });
      return;
    }

    set({ isLoading: true, error: undefined });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful transaction
      toast.success("Transaction sent successfully!", {
        description: `${amount.amount} ${amount.currency} sent to ${recipient.name}`,
        duration: 5000,
      });

      set({ step: 'success' });

      // Close modal after 3 seconds
      setTimeout(() => {
        get().closeModal();
      }, 3000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send transaction";
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
