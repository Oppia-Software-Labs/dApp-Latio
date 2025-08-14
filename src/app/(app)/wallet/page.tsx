import { WalletScreen } from "@/modules/wallet/ui/WalletScreen";
import { AuthGuard } from "@/modules/auth/ui/AuthGuard";

export default function WalletPage() {
  return (
    // <AuthGuard>
    <WalletScreen />
  );
}
