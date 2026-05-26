import { USE_MOCK_API } from './config';
import type { FundRequest, WithdrawRequest } from '@/types/wallet.types'; // ✅ Removed unused WalletBalance, Transaction
import apiClient from './client';
import { mockWalletApi } from './mock/wallet.mock.api';

export const walletApi = {
  getBalance: async () => {
    if (USE_MOCK_API) return mockWalletApi.getBalance();
    return apiClient.get<{ available: number; pending: number; currency: string; lastUpdated: string }>('/wallet/balance');
  },

  initiateDeposit: async (data: FundRequest) => {
    if (USE_MOCK_API) return mockWalletApi.initiateDeposit(data);
    return apiClient.post<{ success: boolean; reference: string; redirectUrl?: string; authorizationUrl?: string; expiresIn: number }>('/wallet/fund', data);
  },

  confirmPayment: async (reference: string) => {
    if (USE_MOCK_API) return mockWalletApi.confirmPayment(reference);
    return apiClient.post<{ success: boolean; newBalance: number }>('/wallet/confirm', { reference });
  },

  withdraw: async (data: WithdrawRequest) => {
    if (USE_MOCK_API) return mockWalletApi.withdraw(data);
    return apiClient.post<{ requestId: string; status: 'processing' | 'completed' | 'failed'; eta: string }>('/wallet/withdraw', data);
  },

  getHistory: async (limit = 20) => {
    if (USE_MOCK_API) return mockWalletApi.getHistory(limit);
    return apiClient.get<{ 
      transactions: Array<{
        id: string;
        date: string;
        type: string;
        amount: number;
        status: string;
        reference: string;
        description?: string;
        color: string;
      }> 
    }>('/wallet/history', { params: { limit } });
  }
};