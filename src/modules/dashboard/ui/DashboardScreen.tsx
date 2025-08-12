"use client";

export function DashboardScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Dashboard Coming Soon
        </h1>
        <p className="text-gray-600 mb-8">
          The dashboard module is under development. This will include wallet management, 
          transaction history, and currency exchange features.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Planned Features</h2>
          <ul className="text-left space-y-2 text-gray-600">
            <li>• Multi-currency wallet management</li>
            <li>• Real-time exchange rates</li>
            <li>• Transaction history and analytics</li>
            <li>• Cross-border payment tools</li>
            <li>• Business integration dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
