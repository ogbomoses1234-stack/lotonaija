/**
 * Wallet balance, transactions, funding, and withdrawal types
 */

export type Currency = 'NGN';
export type TransactionType = 
  | 'deposit' 
  | 'withdrawal' 
  | 'purchase' 
  | 'win' 
  | 'transfer_sent' 
  | 'transfer_received' 
  | 'affiliate' 
  | 'refund';
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'processing';

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  reference: string;
  description?: string;
  color: 'green' | 'red' | 'amber' | 'purple';
}

export interface WalletBalance {
  available: number;
  pending: number;
  currency: Currency;
  lastUpdated: string;
}

export interface FundRequest {
  amount: number;
  method: 'paystack' | 'flutterwave' | 'bank_transfer';
  redirectUrl?: string;
  callbackUrl?: string;
}

export interface WithdrawRequest {
  amount: number;
  bankCode: string;
  nuban: string;
  accountName: string;
}

export interface PaymentGatewayResponse {
  success: boolean;
  reference: string;
  redirectUrl?: string;
  authorizationUrl?: string;
  expiresIn: number;
}