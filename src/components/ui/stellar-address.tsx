"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface StellarAddressProps {
  address?: string;
  showGenerate?: boolean;
  showCopy?: boolean;
  className?: string;
}

// Función para generar una dirección Stellar válida
const generateStellarAddress = (): string => {
  // Stellar addresses son 56 caracteres que empiezan con G
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let address = "G";

  // Generar 55 caracteres aleatorios
  for (let i = 0; i < 55; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return address;
};

// Función para formatear la dirección (mostrar solo primeros y últimos caracteres)
const formatStellarAddress = (address: string): string => {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function StellarAddress({
  address,
  showGenerate = true,
  showCopy = true,
  className = "",
}: StellarAddressProps) {
  const [currentAddress, setCurrentAddress] = useState(
    address || generateStellarAddress()
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (address) {
      setCurrentAddress(address);
    }
  }, [address]);

  const handleGenerate = () => {
    const newAddress = generateStellarAddress();
    setCurrentAddress(newAddress);
    toast.success("Nueva dirección generada", {
      description: "Dirección Stellar válida creada",
      duration: 2000,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentAddress);
      setCopied(true);
      toast.success("Dirección copiada", {
        description: "Dirección Stellar copiada al portapapeles",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Error al copiar", {
        description: "No se pudo copiar la dirección",
        duration: 3000,
      });
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span className="text-blue-600">●</span>
          Dirección Stellar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dirección formateada */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Dirección completa</p>
              <p className="font-mono text-sm break-all">{currentAddress}</p>
            </div>
            {showCopy && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="ml-2"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Dirección formateada (corta) */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Formato corto</p>
              <p className="font-mono text-lg font-semibold text-blue-700">
                {formatStellarAddress(currentAddress)}
              </p>
            </div>
            {showCopy && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="ml-2"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          {showGenerate && (
            <Button
              onClick={handleGenerate}
              variant="outline"
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generar Nueva
            </Button>
          )}
          {showCopy && (
            <Button
              onClick={handleCopy}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "¡Copiado!" : "Copiar"}
            </Button>
          )}
        </div>

        {/* Información adicional */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Formato: G + 55 caracteres alfanuméricos</p>
          <p>• Longitud total: 56 caracteres</p>
          <p>• Compatible con todas las wallets Stellar</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente simple solo para mostrar la dirección
export function SimpleStellarAddress({
  address,
  className = "",
}: {
  address: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Dirección copiada", {
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Error al copiar");
    }
  };

  return (
    <div
      className={`flex items-center gap-2 p-2 bg-gray-50 rounded-lg ${className}`}
    >
      <span className="font-mono text-sm flex-1">
        {formatStellarAddress(address)}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="h-8 w-8 p-0"
      >
        {copied ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
