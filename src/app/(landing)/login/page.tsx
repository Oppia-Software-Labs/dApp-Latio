import { AuthScreen } from "@/modules/auth/ui/AuthScreen";
import { AuthRedirect } from "@/modules/auth/ui/AuthRedirect";

export default function LoginPage() {
  return (
    <AuthRedirect>
      <AuthScreen />
    </AuthRedirect>
  );
}
