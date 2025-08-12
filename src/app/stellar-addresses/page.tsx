"use client";

import { StellarAddress, SimpleStellarAddress } from "@/components/ui/stellar-address";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StellarAddressesPage() {
  // Ejemplos de direcciones Stellar
  const exampleAddresses = [
    "GASDD1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ234567NL6",
    "GBM6W5DUAL7YWWAMGMMZTFIZOQDRO6GWL3WTSE7TGLU2K3L3KKY5I5R7L",
    "GCLWGQPMKX6S7V4KLPESMZFEPVQK4QCMQCR2QZJX7FZ6Y9G8H2I3J4K5L",
    "GA5XIGA5C7QTPTWXQHY6MC3RM6A35CHXTYVJ4ER6X5ER7ER8ER9ER0ER1",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generador de Direcciones Stellar
          </h1>
          <p className="text-lg text-gray-600">
            Genera y formatea direcciones de wallet Stellar en el formato estándar
          </p>
        </div>

        {/* Componente principal */}
        <StellarAddress />

        {/* Ejemplos de direcciones simples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Ejemplos de Direcciones Stellar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {exampleAddresses.map((address, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-8">#{index + 1}</span>
                <SimpleStellarAddress address={address} className="flex-1" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Información técnica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Especificaciones Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Formato de Dirección</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Empieza con &quot;G&quot;</li>
                  <li>• 55 caracteres adicionales</li>
                  <li>• Solo letras mayúsculas y números</li>
                  <li>• Sin caracteres especiales</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Caracteres Válidos</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• A-Z (26 letras)</li>
                  <li>• 2-7 (6 números)</li>
                  <li>• Total: 32 caracteres</li>
                  <li>• Base32 encoding</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Ejemplo de Formato</h3>
              <p className="font-mono text-sm text-blue-700">
                GASDD1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ234567NL6
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Formato corto: GASDD...NL6
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Casos de uso */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Casos de Uso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-medium mb-2">Wallets Móviles</h3>
                <p className="text-sm text-gray-600">
                  Mostrar direcciones de forma compacta en interfaces móviles
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">💼</div>
                <h3 className="font-medium mb-2">Dashboards</h3>
                <p className="text-sm text-gray-600">
                  Listar múltiples direcciones en tablas y listas
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🔗</div>
                <h3 className="font-medium mb-2">Enlaces de Pago</h3>
                <p className="text-sm text-gray-600">
                  Generar direcciones para transacciones específicas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
