import { useWalletStore } from "../state/wallet.store";
export function useLogin(){
  const { connect, isLoading, error } = useWalletStore();
  return { connect, isLoading, error };
}
