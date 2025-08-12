"use client";

import { Balance } from "../../types/dashboard.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Download, TrendingUp } from "lucide-react";
import { useSendStore } from "../../state/send.store";

interface BalanceCardProps {
  balance: Balance;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const { openModal } = useSendStore();

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Wallet Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* XLM Balance */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stellar (XLM)</p>
              <p className="text-2xl font-bold text-gray-900">
                {balance.xlm.toLocaleString()} XLM
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">≈ {formatCurrency(balance.usd, 'USD')}</p>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.4%
              </div>
            </div>
          </div>
        </div>

        {/* Local Currency */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Local ({balance.localCurrency.currency})</p>
              <p className="text-xl font-semibold text-gray-900">
                {balance.localCurrency.symbol}{balance.localCurrency.amount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">≈ {formatCurrency(balance.usd, 'USD')}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={openModal}
            className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Receive
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
