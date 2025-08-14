import { create } from "zustand";
import {
  WalletBalance,
  WalletInfo,
  FundRequest,
  WalletTransaction,
} from "../types/wallet.types";
import { walletService } from "../services/wallet.service";
import { toast } from "sonner";

interface WalletState {
  balance: WalletBalance | null;
  walletInfo: WalletInfo | null;
  transactions: WalletTransaction[];
  isLoading: boolean;
  error: string | null;
  fundRequest: FundRequest | null;
}

interface WalletActions {
  fetchBalance: (contractId: string) => Promise<void>;
  fetchWalletInfo: (contractId: string) => Promise<void>;
  fetchTransactions: (contractId: string) => Promise<void>;
  requestFunds: (contractId: string, amount?: number) => Promise<void>;
  sendXLM: (
    to: string,
    amount: number,
    keyId: string,
    contractId: string
  ) => Promise<void>;
  clearError: () => void;
}

export const useWalletStore = create<WalletState & WalletActions>(
  (set, get) => ({
    balance: null,
    walletInfo: null,
    transactions: [],
    isLoading: false,
    error: null,
    fundRequest: null,

    async fetchBalance(contractId: string) {
      set({ isLoading: true, error: null });
      try {
        const balance = await walletService.getWalletBalance(contractId);
        set({ balance, isLoading: false });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error fetching balance";
        set({ error: errorMessage, isLoading: false });
        toast.error("Error fetching balance", {
          description: errorMessage,
          duration: 4000,
        });
      }
    },

    async fetchWalletInfo(contractId: string) {
      set({ isLoading: true, error: null });
      try {
        const walletInfo = await walletService.getWalletInfo(contractId);
        set({ walletInfo, isLoading: false });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error fetching wallet info";
        set({ error: errorMessage, isLoading: false });
        toast.error("Error fetching wallet info", {
          description: errorMessage,
          duration: 4000,
        });
      }
    },

    async fetchTransactions(contractId: string) {
      set({ isLoading: true, error: null });
      try {
        const transactions =
          await walletService.getRecentTransactions(contractId);
        set({ transactions, isLoading: false });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Error fetching transactions";
        set({ error: errorMessage, isLoading: false });
        toast.error("Error fetching transactions", {
          description: errorMessage,
          duration: 4000,
        });
      }
    },

    async requestFunds(contractId: string, amount: number = 10000) {
      set({ isLoading: true, error: null });
      try {
        const fundRequest = await walletService.requestTestnetFunds(
          contractId,
          amount
        );
        set({ fundRequest, isLoading: false });

        if (fundRequest.status === "completed") {
          toast.success("Testnet funds requested successfully!", {
            description: `${fundRequest.amount} XLM will be added to your wallet`,
            duration: 4000,
          });
          // Refresh balance after successful fund request
          await get().fetchBalance(contractId);
        } else {
          toast.error("Failed to request testnet funds", {
            description: "Please try again later",
            duration: 4000,
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error requesting funds";
        set({ error: errorMessage, isLoading: false });
        toast.error("Error requesting funds", {
          description: errorMessage,
          duration: 4000,
        });
      }
    },

    async sendXLM(
      to: string,
      amount: number,
      keyId: string,
      contractId: string
    ) {
      set({ isLoading: true, error: null });
      try {
        const result = await walletService.sendXLM(
          to,
          amount,
          keyId,
          contractId
        );
        set({ isLoading: false });

        toast.success("XLM sent successfully!", {
          description: `${amount} XLM sent to ${to}`,
          duration: 4000,
        });

        // Refresh balance and transactions after successful send
        await get().fetchBalance(contractId);
        await get().fetchTransactions(contractId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error sending XLM";
        set({ error: errorMessage, isLoading: false });
        toast.error("Error sending XLM", {
          description: errorMessage,
          duration: 4000,
        });
      }
    },

    clearError() {
      set({ error: null });
    },
  })
);
