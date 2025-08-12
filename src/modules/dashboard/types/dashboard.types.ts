export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'exchange' | 'payment';
  amount: number;
  currency: string;
  to?: string;
  from?: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  fee?: number;
  exchangeRate?: number;
}

export interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate: Date;
  endDate: Date;
  budget: {
    amount: number;
    currency: string;
    spent: number;
  };
  status: 'planning' | 'active' | 'completed';
  activities: string[];
  accommodation?: string;
  transportation?: string;
}

export interface Balance {
  xlm: number;
  usd: number;
  localCurrency: {
    amount: number;
    currency: string;
    symbol: string;
  };
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: Date;
}

export interface DashboardStats {
  totalTransactions: number;
  totalSpent: number;
  activeTrips: number;
  savings: number;
}
