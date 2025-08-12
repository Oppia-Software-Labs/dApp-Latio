export interface SendRecipient {
  id: string;
  name: string;
  address: string;
  avatar?: string;
  isRecent?: boolean;
}

export interface SendAmount {
  amount: number;
  currency: string;
  xlmEquivalent: number;
  fee: number;
  total: number;
}

export interface SendTransaction {
  recipient: SendRecipient;
  amount: SendAmount;
  description?: string;
  memo?: string;
}

export interface SendModalState {
  isOpen: boolean;
  step: 'recipient' | 'amount' | 'confirm' | 'success';
  recipient?: SendRecipient;
  amount?: SendAmount;
  description?: string;
  memo?: string;
  isLoading: boolean;
  error?: string;
}

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  balance: number;
  rate: number; // Rate to XLM
}
