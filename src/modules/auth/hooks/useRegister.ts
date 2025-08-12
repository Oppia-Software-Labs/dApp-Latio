import { useWalletStore } from "../state/wallet.store";
export function useRegister(){
  const { register, isLoading, error } = useWalletStore();
  return { register, isLoading, error };
}
