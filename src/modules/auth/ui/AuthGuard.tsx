"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Solo redirigir si no está cargando y no está autenticado
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading mientras verifica la autenticación
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Verificando autenticación...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar fallback o nada
  if (!isAuthenticated) {
    return fallback || null;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
}
