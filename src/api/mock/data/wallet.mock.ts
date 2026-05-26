import type { WalletBalance, Transaction } from '@/types/wallet.types';

export const MOCK_BALANCE: WalletBalance = {
  available: 15000,
  pending: 0,
  currency: 'NGN',
  lastUpdated: new Date().toISOString()
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_001',
    date: new Date(Date.now() - 86400000).toISOString(),
    type: 'deposit',
    amount: 10000,
    status: 'completed',
    reference: 'REF_DEP_001',
    description: 'Wallet funding via Paystack',
    color: 'green'
  },
  {
    id: 'tx_002',
    date: new Date(Date.now() - 43200000).toISOString(),
    type: 'purchase',
    amount: -1200,
    status: 'completed',
    reference: 'REF_TKT_001',
    description: 'Lottery ticket purchase',
    color: 'red'
  },
  {
    id: 'tx_003',
    date: new Date(Date.now() - 21600000).toISOString(),
    type: 'win',
    amount: 5000,
    status: 'completed',
    reference: 'REF_WIN_001',
    description: 'Prize from draw #draw_20240523',
    color: 'amber'
  }
];

export const MOCK_PAYMENT_GATEWAY = {
  success: true,
  reference: `REF_PAY_${Date.now()}`,
  redirectUrl: undefined, // Mock: no actual redirect
  authorizationUrl: undefined,
  expiresIn: 900
};