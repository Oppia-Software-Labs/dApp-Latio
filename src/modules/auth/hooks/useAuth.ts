import { useWalletStore } from "../state/wallet.store";

export function useAuth() {
  const { keyId, contractId, isLoading, error, connect, register, disconnect, clearError } = useWalletStore();

  const isAuthenticated = !!keyId && !!contractId;

  return {
    // State
    keyId,
    contractId,
    isLoading,
    error,
    isAuthenticated,
    
    // Actions
    connect,
    register,
    disconnect,
    clearError,
  };
}
