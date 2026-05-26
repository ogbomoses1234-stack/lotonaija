import type { FundRequest, WithdrawRequest } from '@/types/wallet.types';
import { 
  addTransaction, 
  deductBalance, 
  addBalance,
  getBalance,
  getTransactions 
} from './shared-mock-state';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockWalletApi = {
  getBalance: async () => {
    await delay(200);
    // ✅ Return BOTH 'available' and 'balance' to support any consumer
    const balance = getBalance();
    return { 
      data: { 
        available: balance,
        balance: balance, // ✅ Add this for store compatibility
        pending: 0,
        currency: 'NGN',
        lastUpdated: new Date().toISOString()
      } 
    };
  },

  initiateDeposit: async (_data: FundRequest) => {
    await delay(1500);
    return { data: { success: true, reference: `REF_${Date.now()}`, redirectUrl: undefined, authorizationUrl: undefined, expiresIn: 900 } };
  },
  confirmPayment: async (_reference: string) => {
    await delay(500);
    const amount = 5000;
    addBalance(amount);
    addTransaction({
      date: new Date().toISOString(),
      type: 'deposit',
      amount,
      status: 'completed',
      reference: `REF_${Date.now()}`,
      description: 'Mock wallet funding',
      color: 'green'
    });
    return { data: { success: true, newBalance: getBalance() } };
  },
  withdraw: async (data: WithdrawRequest) => {
    await delay(1200);
    const currentBalance = getBalance();
    if (data.amount > currentBalance) throw new Error('Insufficient balance');
    
    deductBalance(data.amount);
    addTransaction({
      date: new Date().toISOString(),
      type: 'withdrawal',
      amount: -data.amount,
      status: 'processing',
      reference: `REF_WD_${Date.now()}`,
      description: `Withdrawal to ${data.nuban.slice(-4)}`,
      color: 'purple'
    });
    return { data: { requestId: `req_${Date.now()}`, status: 'processing' as const, eta: '24-48 hours' } };
  },
  getHistory: async (limit = 20) => {
    await delay(300);
    return { data: { transactions: getTransactions().slice(0, limit) } };
  }
};