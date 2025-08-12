import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { connectWallet, registerWallet } from "../services/passkey.service";

interface State { keyId: string | null; contractId: string | null; isLoading: boolean; error: string | null; }
interface Actions { connect: (keyId?: string) => Promise<void>; register: (name: string) => Promise<void>; disconnect: () => void; }

export const useWalletStore = create<State & Actions>()(
  persist(
    (set) => ({
      keyId: null,
      contractId: null,
      isLoading: false,
      error: null,

      async connect(keyId) {
        set({ isLoading: true, error: null });
        try { const r = await connectWallet(keyId); set({ ...r, isLoading: false }); }
        catch (e: unknown) { set({ isLoading: false, error: e instanceof Error ? e.message : "Connection failed" }); }
      },

      async register(name) {
        set({ isLoading: true, error: null });
        try { const r = await registerWallet(name); set({ ...r, isLoading: false }); }
        catch (e: unknown) { set({ isLoading: false, error: e instanceof Error ? e.message : "Registration failed" }); }
      },

      disconnect() { set({ keyId: null, contractId: null, error: null }); },
    }),
    { name: "latio-wallet", storage: createJSONStorage(() => localStorage), partialize: (s) => ({ keyId: s.keyId, contractId: s.contractId }) }
  )
);
