"use client";

import { Transaction } from "../../types/dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Download, 
  ArrowLeftRight, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle,
  ExternalLink 
} from "lucide-react";

interface TransactionsListProps {
  transactions: Transaction[];
}

const typeIcons = {
  send: Send,
  receive: Download,
  exchange: ArrowLeftRight,
  payment: CreditCard,
};

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    text: "Pending"
  },
  completed: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 border-green-200",
    text: "Completed"
  },
  failed: {
    icon: XCircle,
    color: "bg-red-100 text-red-800 border-red-200",
    text: "Failed"
  },
};

export function TransactionsList({ transactions }: TransactionsListProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    const IconComponent = typeIcons[type];
    return <IconComponent className="w-4 h-4" />;
  };

  const getStatusBadge = (status: Transaction['status']) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1 text-xs`}>
        <IconComponent className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
          View All
          <ExternalLink className="w-3 h-3" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatDate(transaction.timestamp)}</span>
                    {transaction.to && (
                      <>
                        <span>•</span>
                        <span>To: {transaction.to}</span>
                      </>
                    )}
                    {transaction.from && (
                      <>
                        <span>•</span>
                        <span>From: {transaction.from}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-sm">
                  {transaction.type === 'send' || transaction.type === 'payment' ? '-' : '+'}
                  {formatCurrency(transaction.amount, transaction.currency)}
                </p>
                {transaction.fee && (
                  <p className="text-xs text-gray-500">
                    Fee: {formatCurrency(transaction.fee, transaction.currency)}
                  </p>
                )}
                <div className="mt-1">
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
