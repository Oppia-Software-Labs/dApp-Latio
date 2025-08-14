"use client";

import { useAccountSession } from "@/modules/auth/hooks/useAccountSession";

export function AccountSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // This hook will automatically configure the account session
  // when the user is authenticated
  useAccountSession();

  return <>{children}</>;
}
