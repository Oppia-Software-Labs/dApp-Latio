import { WalletBalance, WalletInfo, FundRequest } from "../types/wallet.types";

interface MockTransaction {
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
  async getWalletBalance(publicKey: string): Promise<WalletBalance> {
    try {
      // For now, return mock data while we resolve SDK issues
      // In production, this would call the Stellar Horizon API
      const mockXlmAmount = Math.random() * 1000; // Random amount for demo
      const usdAmount = mockXlmAmount * 0.12; // Mock rate: 1 XLM = $0.12
      const mxnAmount = usdAmount * 18.5; // Mock rate: 1 USD = 18.5 MXN

      return {
        xlm: mockXlmAmount,
        usd: usdAmount,
        localCurrency: {
          amount: mxnAmount,
          currency: "MXN",
          symbol: "$",
        },
      };
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      return {
        xlm: 0,
        usd: 0,
        localCurrency: {
          amount: 0,
          currency: "MXN",
          symbol: "$",
        },
      };
    }
  }

  /**
   * Get wallet information
   */
  async getWalletInfo(publicKey: string): Promise<WalletInfo> {
    try {
      return {
        address: publicKey,
        publicKey: publicKey,
        network: "testnet",
        createdAt: new Date(),
        lastActivity: new Date(),
      };
    } catch (error) {
      console.error("Error fetching wallet info:", error);
      return {
        address: publicKey,
        publicKey: publicKey,
        network: "testnet",
        createdAt: new Date(),
        lastActivity: new Date(),
      };
    }
  }

  /**
   * Request testnet funds (Friendbot)
   */
  async requestTestnetFunds(
    publicKey: string,
    amount: number = 10000
  ): Promise<FundRequest> {
    try {
      // Friendbot endpoint for testnet funding
      const response = await fetch(
        `https://friendbot.stellar.org/?addr=${publicKey}`
      );

      if (!response.ok) {
        throw new Error(`Friendbot request failed: ${response.statusText}`);
      }

      const result = await response.json();

      return {
        amount: amount / 1000000, // Convert from stroops to XLM
        currency: "XLM",
        status: "completed",
        timestamp: new Date(),
        transactionId: result.hash,
      };
    } catch (error) {
      console.error("Error requesting testnet funds:", error);
      return {
        amount: amount / 1000000,
        currency: "XLM",
        status: "failed",
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get recent transactions
   */
  async getRecentTransactions(
    publicKey: string,
    limit: number = 10
  ): Promise<MockTransaction[]> {
    try {
      // For now, return mock transactions
      // In production, this would call the Stellar Horizon API
      const mockTransactions: MockTransaction[] = [
        {
          hash: "mock_tx_1",
          type: "payment",
          amount: "100",
          created_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          hash: "mock_tx_2",
          type: "receive",
          amount: "50",
          created_at: new Date(Date.now() - 7200000).toISOString(),
        },
      ];

      return mockTransactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  }
}

export const walletService = WalletService.getInstance();
