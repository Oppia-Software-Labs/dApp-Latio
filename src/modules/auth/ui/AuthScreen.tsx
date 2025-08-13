"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        await register(name);
      } else {
        await connect();
      }
    } catch (err) {
      // Error handling is done in the store
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-green-500">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isRegister ? "Create Wallet" : "Connect Wallet"}
          </CardTitle>
          <CardDescription>
            {isRegister
              ? "Create a new wallet using your passkey"
              : "Connect to your existing wallet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Wallet Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter wallet name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              disabled={isLoading || (isRegister && !name.trim())}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isRegister ? "Creating..." : "Connecting..."}
                </>
              ) : (
                <>
                  {isRegister ? (
                    <>
                      <Key className="w-4 h-4 mr-2" />
                      Create Wallet
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </>
                  )}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
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

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              🔒 Your wallet is secured with passkey technology. No passwords
              needed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
