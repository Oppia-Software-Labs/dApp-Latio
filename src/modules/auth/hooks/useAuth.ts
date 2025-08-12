import { useWalletStore } from "../state/wallet.store";

export function useAuth() {
  const { keyId, contractId, isLoading, error, success, connect, register, disconnect, clearError, clearSuccess } = useWalletStore();

  const isAuthenticated = !!keyId && !!contractId;

  return {
    // State
    keyId,
    contractId,
    isLoading,
    error,
    success,
    isAuthenticated,
    
    // Actions
    connect,
    register,
    disconnect,
    clearError,
    clearSuccess,
  };
}
