"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TransactionsCardProps {
  transactions: any[];
  isLoading: boolean;
}

export function TransactionsCard({
  transactions,
  isLoading,
}: TransactionsCardProps) {

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
