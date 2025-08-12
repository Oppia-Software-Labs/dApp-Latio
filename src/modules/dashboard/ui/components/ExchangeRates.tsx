"use client";

import { ExchangeRate } from "../../types/dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight, TrendingUp, TrendingDown } from "lucide-react";

interface ExchangeRatesProps {
  exchangeRates: ExchangeRate[];
}

export function ExchangeRates({ exchangeRates }: ExchangeRatesProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getTrendIcon = () => {
    // Mock trend - in real app this would come from API
    const isUp = Math.random() > 0.5;
    return isUp ? (
      <TrendingUp className="w-3 h-3 text-green-500" />
    ) : (
      <TrendingDown className="w-3 h-3 text-red-500" />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5" />
          Exchange Rates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {exchangeRates.map((rate) => (
            <div
              key={`${rate.from}-${rate.to}`}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">
                    {rate.from}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {rate.from} → {rate.to}
                  </p>
                  <p className="text-xs text-gray-500">
                    Updated {formatDate(rate.lastUpdated)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-sm">
                  1 {rate.from} = {rate.rate.toFixed(2)} {rate.to}
                </p>
                <div className="flex items-center justify-end gap-1 text-xs text-gray-500 mt-1">
                  {getTrendIcon()}
                  <span>+0.02%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            Rates update every 30 seconds • Powered by Stellar DEX
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
