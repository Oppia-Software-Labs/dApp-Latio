"use client";

import { StellarAddress } from "@/components/ui/stellar-address";
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
            Componente Stellar Address
          </h1>
          <p className="text-lg text-gray-600">
            Componente simple para acortar direcciones Stellar en UI
          </p>
        </div>

        {/* Ejemplos de direcciones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Ejemplos de Direcciones Stellar Acortadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exampleAddresses.map((address, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500 w-8">#{index + 1}</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Dirección completa:</p>
                  <p className="font-mono text-sm break-all">{address}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Formato corto:</p>
                  <StellarAddress address={address} className="text-lg font-semibold text-blue-700" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cómo usar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Cómo Usar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <p>import {"{ StellarAddress }"} from &quot;@/components/ui/stellar-address&quot;;</p>
              <br />
              <p>&lt;StellarAddress address=&quot;GASDD1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ234567NL6&quot; /&gt;</p>
              <p>{/* Resultado: GASDD...NL6 */}</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Props Disponibles</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <code>address</code>: string (requerido) - Dirección Stellar completa</li>
                <li>• <code>className</code>: string (opcional) - Clases CSS adicionales</li>
              </ul>
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
                  Mostrar direcciones en enlaces de pago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
