import {
  WalletBalance,
  WalletInfo,
  FundRequest,
  WalletTransaction,
} from "../types/wallet.types";
import { native } from "@/lib/passkey";

interface StellarBalance {
  asset_type: string;
  balance: string;
}

interface StellarTransaction {
  hash: string;
  type: string;
  amount: string;
  created_at: string;
}

export class WalletService {
  private static instance: WalletService;

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  /**
   * Get real wallet balance from Stellar network
   */
  async getWalletBalance(contractId: string): Promise<WalletBalance> {
    if (!contractId || contractId.trim() === "") {
      throw new Error("Invalid contract ID: contractId is empty or undefined");
    }
    console.log("contractId", contractId);
    try {
      console.log("Fetching balance for contractId:", contractId);

      // Get balance using native client from passkey
      const { result } = await native.balance({ id: contractId });
      const xlmAmount = parseFloat(
        (Number(result.toString()) / 1e7).toFixed(2)
      );
      console.log("xlmAmount", xlmAmount);
      // Mock USD conversion (in real app, you'd use a real exchange rate API)
      const usdAmount = xlmAmount * 0.12; // Mock rate: 1 XLM = $0.12

      // Mock local currency (MXN)
      const mxnAmount = usdAmount * 18.5; // Mock rate: 1 USD = 18.5 MXN

      // Mock EUR currency
      const eurAmount = usdAmount * 0.85; // Mock rate: 1 USD = 0.85 EUR

      return {
        xlm: xlmAmount,
        usd: usdAmount,
        localCurrency: {
          amount: mxnAmount,
          currency: "MXN",
          symbol: "$",
        },
        eur: {
          amount: eurAmount,
          currency: "EUR",
          symbol: "€",
        },
      };
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      // Return mock data if network fails
      return {
        xlm: 0,
        usd: 0,
        localCurrency: {
          amount: 0,
          currency: "MXN",
          symbol: "$",
        },
        eur: {
          amount: 0,
          currency: "EUR",
          symbol: "€",
        },
      };
    }
  }

  /**
   * Get wallet information
   */
  async getWalletInfo(contractId: string): Promise<WalletInfo> {
    try {
      const response = await fetch(
        `https://horizon-testnet.stellar.org/accounts/${contractId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch account: ${response.statusText}`);
      }

      const accountData = await response.json();

      return {
        address: contractId,
        publicKey: contractId,
        network: "testnet",
        createdAt: new Date(accountData.created_at),
        lastActivity: new Date(),
      };
    } catch (error) {
      console.error("Error fetching wallet info:", error);
      return {
        address: contractId,
        publicKey: contractId,
        network: "testnet",
        createdAt: new Date(),
        lastActivity: new Date(),
      };
    }
  }

  /**
   * Request testnet funds using API route
   */
  async requestTestnetFunds(
    contractId: string,
    amount: number = 10000
  ): Promise<FundRequest> {
    if (!contractId || contractId.trim() === "") {
      throw new Error("Invalid contract ID: contractId is empty or undefined");
    }

    try {
      console.log("Requesting testnet funds for contractId:", contractId);

      // Use API route to fund the smart wallet
      const response = await fetch(`/api/fund/${contractId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fund wallet");
      }

      const result = await response.json();

      return {
        amount: result.amount,
        currency: result.currency,
        status: "completed",
        timestamp: new Date(),
        transactionId: result.hash,
      };
    } catch (error) {
      console.error("Error requesting testnet funds:", error);
      return {
        amount: 0,
        currency: "XLM",
        status: "failed",
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get recent transactions (mocked for now)
   */
  async getRecentTransactions(
    contractId: string,
    limit: number = 10
  ): Promise<WalletTransaction[]> {
    console.log("Fetching mock transactions for contractId:", contractId);

    // Mock transaction data
    const mockTransactions: WalletTransaction[] = [
      {
        id: "txn_001",
        type: "send",
        amount: 5.5,
        currency: "XLM",
        to: "GASDD...NL6",
        from: contractId,
        description: "Payment to friend",
        status: "completed",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        fee: 0.00001,
        hash: "abc123...def456",
      },
      {
        id: "txn_002",
        type: "receive",
        amount: 25.0,
        currency: "XLM",
        to: contractId,
        from: "Friendbot",
        description: "Testnet funding",
        status: "completed",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        fee: 0.00001,
        hash: "def456...ghi789",
      },
      {
        id: "txn_003",
        type: "exchange",
        amount: 10.0,
        currency: "XLM",
        description: "XLM to USD exchange",
        status: "completed",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        fee: 0.00001,
        hash: "ghi789...jkl012",
      },
      {
        id: "txn_004",
        type: "payment",
        amount: 2.5,
        currency: "XLM",
        to: "GASDD...NL6",
        from: contractId,
        description: "Coffee payment",
        status: "pending",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        fee: 0.00001,
        hash: "jkl012...mno345",
      },
      {
        id: "txn_005",
        type: "receive",
        amount: 15.0,
        currency: "XLM",
        to: contractId,
        from: "GASDD...NL6",
        description: "Refund",
        status: "completed",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        fee: 0.00001,
        hash: "mno345...pqr678",
      },
    ];

    // Return limited number of transactions
    return mockTransactions.slice(0, limit);
  }
}

export const walletService = WalletService.getInstance();
