"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Clock, ExternalLink } from "lucide-react";

interface StellarTransaction {
  hash: string;
  type: string;
  amount: string;
  created_at: string;
}

interface TransactionsCardProps {
  transactions: StellarTransaction[];
  isLoading: boolean;
}

export function TransactionsCard({
  transactions,
  isLoading,
}: TransactionsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
      case "send":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case "receive":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "payment":
      case "send":
        return "text-red-600";
      case "receive":
        return "text-green-600";
      default:
        return "text-blue-600";
    }
  };

  const handleViewTransaction = (hash: string) => {
    window.open(`https://stellar.expert/explorer/public/tx/${hash}`, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Recent Transactions</p>
            <p className="text-xs text-muted-foreground mt-2">
              SOON will be implemented
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
