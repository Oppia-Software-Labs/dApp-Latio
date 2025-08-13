export interface WalletBalance {
  xlm: number;
  usd: number;
  localCurrency: {
    amount: number;
    currency: string;
    symbol: string;
  };
}

export interface WalletTransaction {
  id: string;
  type: "send" | "receive" | "exchange" | "payment";
  amount: number;
  currency: string;
  to?: string;
  from?: string;
  description: string;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
  fee?: number;
  exchangeRate?: number;
}

export interface WalletInfo {
  address: string;
  publicKey: string;
  network: "testnet" | "mainnet";
  createdAt: Date;
  lastActivity: Date;
}

export interface FundRequest {
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
  transactionId?: string;
}
