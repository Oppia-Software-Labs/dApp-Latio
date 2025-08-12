"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../hooks/useAuth";
import { Wallet, Key, User, ArrowRight, Loader2 } from "lucide-react";

export function AuthScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const { connect, register, isLoading, error, clearError } = useAuth();

  // Limpiar errores cuando cambia el modo
  useEffect(() => {
    clearError();
  }, [isRegister, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      if (isRegister) {
        if (!name.trim()) {
          throw new Error("El nombre es requerido");
        }
        await register(name.trim());
      } else {
        await connect();
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isRegister ? "Crear Wallet" : "Conectar Wallet"}
          </CardTitle>
          <CardDescription className="text-center">
            {isRegister 
              ? "Crea tu wallet con Passkey para empezar a usar Latio"
              : "Conecta tu wallet existente con Passkey"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de tu wallet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Mi Wallet Latio"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRegister ? "Creando wallet..." : "Conectando..."}
                </>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  {isRegister ? "Crear con Passkey" : "Conectar con Passkey"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isRegister ? "¿Ya tienes una wallet?" : "¿No tienes una wallet?"}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={() => {
                  setIsRegister(!isRegister);
                  clearError();
                }}
              >
                {isRegister ? "Conectar existente" : "Crear nueva"}
              </Button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Seguridad garantizada con
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Key className="h-3 w-3" />
                  <span>Passkey</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  <span>Stellar</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
