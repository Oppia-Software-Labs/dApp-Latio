"use client";

import { ExchangeRate } from "../../types/dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ExchangeRatesProps {
  exchangeRates: ExchangeRate[];
}

export function ExchangeRates({ exchangeRates }: ExchangeRatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Exchange Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exchangeRates.map((rate) => (
            <div
              key={`${rate.from}-${rate.to}`}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-semibold text-sm">
                  {rate.from}
                </div>
                <div>
                  <p className="font-medium">{rate.from} → {rate.to}</p>
                  <p className="text-xs text-muted-foreground">
                    Updated {rate.lastUpdated.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">1 {rate.from} = {rate.rate.toFixed(2)} {rate.to}</p>
                <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">+0.02%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          Rates updated every 30 seconds
        </p>
      </CardContent>
    </Card>
  );
}
