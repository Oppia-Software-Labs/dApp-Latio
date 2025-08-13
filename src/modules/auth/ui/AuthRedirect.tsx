"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AuthRedirectProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AuthRedirect({ children, redirectTo = "/dashboard" }: AuthRedirectProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    } else if (!isLoading) {
      setIsChecking(false);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Mostrar loading mientras verifica la autenticación
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Verificando autenticación...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar el contenido (login/register)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Si está autenticado, no mostrar nada (se está redirigiendo)
  return null;
}
