import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { configureAccountSession, isAccountSessionConfigured } from "@/lib/passkey";

/**
 * Hook to automatically configure account session when user is authenticated
 */
export function useAccountSession() {
  const { keyId, contractId, isAuthenticated } = useAuth();

  useEffect(() => {
    const configureSession = async () => {
      if (isAuthenticated && keyId && contractId) {
        try {
          // Only configure if not already configured
          if (!isAccountSessionConfigured()) {
            console.log("Auto-configuring account session");
            await configureAccountSession(keyId, contractId);
          }
        } catch (error) {
          console.error("Error auto-configuring account session:", error);
        }
      }
    };

    configureSession();
  }, [isAuthenticated, keyId, contractId]);

  return {
    isSessionConfigured: isAccountSessionConfigured(),
  };
}
