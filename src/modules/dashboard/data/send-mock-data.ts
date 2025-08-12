import { SendRecipient, CurrencyOption } from "../types/send.types";

export const mockRecipients: SendRecipient[] = [
  {
    id: "1",
    name: "Maria González",
    address: "GABC1234567890...",
    avatar: "MG",
    isRecent: true,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    address: "GDEF0987654321...",
    avatar: "CR",
    isRecent: true,
  },
  {
    id: "3",
    name: "Hotel San José",
    address: "GHIJ1122334455...",
    avatar: "HS",
    isRecent: false,
  },
  {
    id: "4",
    name: "Restaurant El Patio",
    address: "GKLM6677889900...",
    avatar: "RE",
    isRecent: false,
  },
];

export const mockCurrencies: CurrencyOption[] = [
  {
    code: "XLM",
    name: "Stellar Lumens",
    symbol: "XLM",
    balance: 1245.90,
    rate: 1.0,
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    balance: 132.12,
    rate: 0.106, // 1 XLM = 0.106 USD
  },
  {
    code: "CRC",
    name: "Costa Rican Colón",
    symbol: "₡",
    balance: 67500,
    rate: 54.2, // 1 XLM = 54.2 CRC
  },
];

export const mockFees = {
  xlm: 0.00001, // Stellar network fee
  usd: 0.50,    // Service fee
  crc: 25,      // Service fee in CRC
};

export const calculateFee = (currency: string, amount: number): number => {
  switch (currency) {
    case "XLM":
      return mockFees.xlm;
    case "USD":
      return mockFees.usd;
    case "CRC":
      return mockFees.crc;
    default:
      return 0;
  }
};

export const calculateXlmEquivalent = (amount: number, currency: string): number => {
  const currencyData = mockCurrencies.find(c => c.code === currency);
  if (!currencyData) return amount;
  
  return amount / currencyData.rate;
};

export const calculateTotal = (amount: number, fee: number): number => {
  return amount + fee;
};
