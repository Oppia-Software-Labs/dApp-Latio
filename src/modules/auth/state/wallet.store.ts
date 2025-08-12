import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { connectWallet, registerWallet } from "../services/passkey.service";

interface State {
  keyId: string | null;
  contractId: string | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

interface Actions {
  connect: (keyId?: string) => Promise<void>;
  register: (name: string) => Promise<void>;
  disconnect: () => void;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useWalletStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      keyId: null,
      contractId: null,
      isLoading: false,
      error: null,
      success: null,

      async connect(keyId) {
        set({ isLoading: true, error: null, success: null });
        try {
          const result = await connectWallet(keyId);
          set({ 
            keyId: result.keyId, 
            contractId: result.contractId, 
            isLoading: false,
            error: null,
            success: "¡Wallet conectada exitosamente!"
          });
          
          // Redirigir al dashboard después de un breve delay
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/dashboard';
            }
          }, 1500);
        } catch (e: unknown) {
          set({ 
            isLoading: false, 
            error: e instanceof Error ? e.message : "Error al conectar wallet",
            success: null
          });
        }
      },

      async register(name) {
        set({ isLoading: true, error: null, success: null });
        try {
          const result = await registerWallet(name);
          set({ 
            keyId: result.keyId, 
            contractId: result.contractId, 
            isLoading: false,
            error: null,
            success: `¡Wallet "${name}" creada exitosamente!`
          });
          
          // Redirigir al dashboard después de un breve delay
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/dashboard';
            }
          }, 1500);
        } catch (e: unknown) {
          set({ 
            isLoading: false, 
            error: e instanceof Error ? e.message : "Error al crear wallet",
            success: null
          });
        }
      },

      disconnect() {
        set({ keyId: null, contractId: null, error: null, success: null });
      },

      clearError() {
        set({ error: null });
      },

      clearSuccess() {
        set({ success: null });
      },
    }),
    {
      name: "latio-wallet",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        keyId: state.keyId, 
        contractId: state.contractId 
      }),
    }
  )
);
