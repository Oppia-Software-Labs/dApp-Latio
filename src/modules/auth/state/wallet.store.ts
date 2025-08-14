import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { connectWallet, registerWallet } from "../services/passkey.service";
import { toast } from "sonner";

interface State {
  keyId: string | null;
  contractId: string | null;
  isLoading: boolean;
  error: string | null;
}

interface Actions {
  connect: (keyId?: string) => Promise<void>;
  register: (name: string) => Promise<void>;
  disconnect: () => void;
  clearError: () => void;
}

export const useWalletStore = create<State & Actions>()(
  persist(
    (set) => ({
      keyId: null,
      contractId: null,
      isLoading: false,
      error: null,

      async connect(keyId) {
        set({ isLoading: true, error: null });
        try {
          const result = await connectWallet(keyId);
          set({ 
            keyId: result.keyId, 
            contractId: result.contractId, 
            isLoading: false,
            error: null
          });
          
          toast.success("¡Wallet conectada exitosamente!", {
            description: "Ya puedes acceder a todas las funciones de Latio",
            duration: 4000,
          });

          // Redirigir al dashboard después del login exitoso
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } catch (e: unknown) {
          const errorMessage = e instanceof Error ? e.message : "Error al conectar wallet";
          set({ 
            isLoading: false, 
            error: errorMessage
          });
          
          toast.error("Error al conectar wallet", {
            description: errorMessage,
            duration: 4000,
          });
        }
      },

      async register(name) {
        set({ isLoading: true, error: null });
        try {
          const result = await registerWallet(name);
          set({ 
            keyId: result.keyId, 
            contractId: result.contractId, 
            isLoading: false,
            error: null
          });
          
          toast.success(`¡Wallet "${name}" creada exitosamente!`, {
            description: "Tu wallet está lista para usar",
            duration: 4000,
          });

          // Redirigir al dashboard después del registro exitoso
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } catch (e: unknown) {
          const errorMessage = e instanceof Error ? e.message : "Error al crear wallet";
          set({ 
            isLoading: false, 
            error: errorMessage
          });
          
          toast.error("Error al crear wallet", {
            description: errorMessage,
            duration: 4000,
          });
        }
      },

      disconnect() {
        set({ keyId: null, contractId: null, error: null });
        toast.success("Wallet desconectada", {
          description: "Has cerrado sesión exitosamente",
          duration: 3000,
        });
        
        // Redirigir al login después de desconectar
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      },

      clearError() {
        set({ error: null });
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
