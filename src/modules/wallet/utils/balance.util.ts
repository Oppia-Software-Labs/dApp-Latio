import { WalletBalance } from "../types/wallet.types";

export interface CurrencyBalance {
  code: string;
  name: string;
  symbol: string;
  balance: number;
  rate: number;
}

/**
 * Get available currencies with real balance from wallet
 */
export function getAvailableCurrencies(walletBalance: WalletBalance | null): CurrencyBalance[] {
  if (!walletBalance) {
    return [
      {
        code: "XLM",
        name: "Stellar Lumens",
        symbol: "XLM",
        balance: 0,
        rate: 1.0,
      },
      {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        balance: 0,
        rate: 0.12, // 1 XLM = 0.12 USD
      },
      {
        code: "EUR",
        name: "Euro",
        symbol: "€",
        balance: 0,
        rate: 0.102, // 1 XLM = 0.102 EUR
      },
    ];
  }

  return [
    {
      code: "XLM",
      name: "Stellar Lumens",
      symbol: "XLM",
      balance: walletBalance.xlm,
      rate: 1.0,
    },
    {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
      balance: walletBalance.usd,
      rate: walletBalance.xlm > 0 ? walletBalance.usd / walletBalance.xlm : 0.12,
    },
    {
      code: "EUR",
      name: "Euro",
      symbol: "€",
      balance: walletBalance.eur.amount,
      rate: walletBalance.xlm > 0 ? walletBalance.eur.amount / walletBalance.xlm : 0.102,
    },
  ];
}

/**
 * Get balance for a specific currency
 */
export function getCurrencyBalance(
  walletBalance: WalletBalance | null,
  currencyCode: string
): number {
  if (!walletBalance) return 0;

  switch (currencyCode) {
    case "XLM":
      return walletBalance.xlm;
    case "USD":
      return walletBalance.usd;
    case "EUR":
      return walletBalance.eur.amount;
    default:
      return 0;
  }
}

/**
 * Format balance with proper currency formatting
 */
export function formatBalance(balance: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(balance);
}

/**
 * Check if user has sufficient balance for a transaction
 */
export function hasSufficientBalance(
  walletBalance: WalletBalance | null,
  amount: number,
  currencyCode: string
): boolean {
  const availableBalance = getCurrencyBalance(walletBalance, currencyCode);
  return availableBalance >= amount;
}
