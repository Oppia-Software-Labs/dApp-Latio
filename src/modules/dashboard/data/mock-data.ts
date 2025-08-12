import { Transaction, Trip, Balance, QuickAction, ExchangeRate, DashboardStats } from "../types/dashboard.types";

export const mockBalance: Balance = {
  xlm: 1245.90,
  usd: 132.12,
  localCurrency: {
    amount: 67500,
    currency: "CRC",
    symbol: "₡"
  }
};

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "payment",
    amount: 25.50,
    currency: "USD",
    to: "Hotel San José",
    description: "Hotel payment for Costa Rica trip",
    status: "completed",
    timestamp: new Date("2024-01-15T10:30:00"),
    fee: 0.50,
    exchangeRate: 1.0
  },
  {
    id: "2",
    type: "exchange",
    amount: 100,
    currency: "USD",
    description: "USD to CRC exchange",
    status: "completed",
    timestamp: new Date("2024-01-14T15:20:00"),
    fee: 1.00,
    exchangeRate: 520.50
  },
  {
    id: "3",
    type: "send",
    amount: 50,
    currency: "USD",
    to: "Maria G.",
    description: "Split dinner bill",
    status: "completed",
    timestamp: new Date("2024-01-13T20:15:00"),
    fee: 0.25
  },
  {
    id: "4",
    type: "receive",
    amount: 75,
    currency: "USD",
    from: "Carlos R.",
    description: "Tour guide payment",
    status: "completed",
    timestamp: new Date("2024-01-12T14:45:00"),
    fee: 0.25
  },
  {
    id: "5",
    type: "payment",
    amount: 15.30,
    currency: "USD",
    to: "Restaurant El Patio",
    description: "Lunch payment",
    status: "pending",
    timestamp: new Date("2024-01-15T12:00:00"),
    fee: 0.30
  }
];

export const mockTrips: Trip[] = [
  {
    id: "1",
    destination: "San José",
    country: "Costa Rica",
    startDate: new Date("2024-01-14"),
    endDate: new Date("2024-01-20"),
    budget: {
      amount: 500,
      currency: "USD",
      spent: 325.50
    },
    status: "active",
    activities: ["Beach visit", "City tour", "Coffee plantation"],
    accommodation: "Hotel San José",
    transportation: "Rental car"
  },
  {
    id: "2",
    destination: "Mexico City",
    country: "Mexico",
    startDate: new Date("2024-02-10"),
    endDate: new Date("2024-02-15"),
    budget: {
      amount: 800,
      currency: "USD",
      spent: 0
    },
    status: "planning",
    activities: ["Pyramids tour", "Food tour", "Museums"],
    accommodation: "Airbnb Centro",
    transportation: "Metro + Uber"
  }
];

export const mockExchangeRates: ExchangeRate[] = [
  {
    from: "USD",
    to: "CRC",
    rate: 520.50,
    lastUpdated: new Date()
  },
  {
    from: "USD",
    to: "MXN",
    rate: 17.25,
    lastUpdated: new Date()
  },
  {
    from: "USD",
    to: "COP",
    rate: 3950.00,
    lastUpdated: new Date()
  }
];

export const mockStats: DashboardStats = {
  totalTransactions: 15,
  totalSpent: 325.50,
  activeTrips: 1,
  savings: 174.50
};

export const mockQuickActions: QuickAction[] = [
  {
    id: "send",
    title: "Send Money",
    description: "Send to friends or family",
    icon: "Send",
    action: () => console.log("Send money"),
    color: "blue"
  },
  {
    id: "exchange",
    title: "Exchange",
    description: "Convert currencies",
    icon: "ArrowLeftRight",
    action: () => console.log("Exchange"),
    color: "green"
  },
  {
    id: "pay",
    title: "Pay",
    description: "Pay merchants",
    icon: "CreditCard",
    action: () => console.log("Pay"),
    color: "purple"
  },
  {
    id: "trip",
    title: "Plan Trip",
    description: "Create travel budget",
    icon: "MapPin",
    action: () => console.log("Plan trip"),
    color: "orange"
  }
];
