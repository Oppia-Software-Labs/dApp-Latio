import { WalletBalance, WalletInfo, FundRequest } from "../types/wallet.types";

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
    try {
      console.log('Fetching balance for contractId:', contractId);
      
      // For now, simulate real balance fetching
      // In production, this would call the Stellar Horizon API directly
      const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${contractId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch account: ${response.statusText}`);
      }
      
      const accountData = await response.json();
      
      // Get XLM balance (native asset)
      const xlmBalance = accountData.balances.find(
        (balance: StellarBalance) => balance.asset_type === "native"
      );
      const xlmAmount = xlmBalance ? parseFloat(xlmBalance.balance) : 0;

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
      const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${contractId}`);
      
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
   * Request testnet funds (Friendbot)
   */
  async requestTestnetFunds(
    contractId: string,
    amount: number = 10000
  ): Promise<FundRequest> {
    try {
      console.log('Requesting testnet funds for contractId:', contractId);
      
      // Friendbot endpoint for testnet funding
      const response = await fetch(
        `https://friendbot.stellar.org/?addr=${contractId}`
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
    contractId: string,
    limit: number = 10
  ): Promise<StellarTransaction[]> {
    try {
      console.log('Fetching transactions for contractId:', contractId);
      
      const response = await fetch(
        `https://horizon-testnet.stellar.org/accounts/${contractId}/transactions?limit=${limit}&order=desc`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data._embedded.records || [];
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  }
}

export const walletService = WalletService.getInstance();
