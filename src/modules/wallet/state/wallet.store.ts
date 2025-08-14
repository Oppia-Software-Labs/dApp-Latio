import { create } from "zustand";
import { WalletBalance, WalletInfo, FundRequest } from "../types/wallet.types";
import { walletService } from "../services/wallet.service";
import { toast } from "sonner";

interface MockTransaction {
  hash: string;
  type: string;
  amount: string;
  created_at: string;
}

interface WalletState {
  balance: WalletBalance | null;
  walletInfo: WalletInfo | null;
  transactions: MockTransaction[];
  isLoading: boolean;
  error: string | null;
  fundRequest: FundRequest | null;
}

interface WalletActions {
  fetchBalance: (publicKey: string) => Promise<void>;
  fetchWalletInfo: (publicKey: string) => Promise<void>;
  fetchTransactions: (publicKey: string) => Promise<void>;
  requestFunds: (publicKey: string, amount?: number) => Promise<void>;
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

    async fetchBalance(publicKey: string) {
      set({ isLoading: true, error: null });
      try {
        const balance = await walletService.getWalletBalance(publicKey);
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

    async fetchWalletInfo(publicKey: string) {
      set({ isLoading: true, error: null });
      try {
        console.log("fetching wallet info", publicKey);
        const walletInfo = await walletService.getWalletInfo(publicKey);
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

    async fetchTransactions(publicKey: string) {
      set({ isLoading: true, error: null });
      try {
        const transactions =
          await walletService.getRecentTransactions(publicKey);
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

    async requestFunds(publicKey: string, amount: number = 10000) {
      set({ isLoading: true, error: null });
      try {
        const fundRequest = await walletService.requestTestnetFunds(
          publicKey,
          amount
        );
        set({ fundRequest, isLoading: false });

        if (fundRequest.status === "completed") {
          toast.success("Testnet funds requested successfully!", {
            description: `${fundRequest.amount} XLM will be added to your wallet`,
            duration: 4000,
          });
          // Refresh balance after successful fund request
          await get().fetchBalance(publicKey);
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

    clearError() {
      set({ error: null });
    },
  })
);
