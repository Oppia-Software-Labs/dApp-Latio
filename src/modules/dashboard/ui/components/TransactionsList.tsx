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
  ExternalLink,
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
    text: "Pending",
  },
  completed: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 border-green-200",
    text: "Completed",
  },
  failed: {
    icon: XCircle,
    color: "bg-red-100 text-red-800 border-red-200",
    text: "Failed",
  },
};

export function TransactionsList({}: TransactionsListProps) {

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
          View All
          <ExternalLink className="w-3 h-3" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Recent Transactions</p>
          <p className="text-xs text-muted-foreground mt-2">
            SOON will be implemented
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
