import { USE_MOCK_API } from './config';
import type { DrawState } from '@/types/lottery.types'; // ✅ Removed unused Tier import
import apiClient from './client';
import { mockLotteryApi } from './mock/lottery.mock.api';

export const lotteryApi = {
  getTiers: async () => {
    if (USE_MOCK_API) return mockLotteryApi.getTiers();
    return apiClient.get<{ tiers: Array<{ id: string; name: string; price: number; pool: number; maxPicks: number }> }>('/lottery/tiers');
  },

  getActiveDraw: async () => {
    if (USE_MOCK_API) return mockLotteryApi.getActiveDraw();
    return apiClient.get<DrawState>('/lottery/active');
  },

  purchaseTicket: async (data: { tierId: string; numbers: number[]; paymentReference?: string }) => {
    if (USE_MOCK_API) return mockLotteryApi.purchaseTicket(data);
    return apiClient.post<{ ticketId: string; drawId: string; status: 'confirmed' | 'pending' }>('/lottery/purchase', data);
  },

  getDrawResults: async (drawId: string) => {
    if (USE_MOCK_API) return mockLotteryApi.getDrawResults(drawId);
    return apiClient.get<{ winningNumbers: number[]; jackpotAmount: number; winners: number }>('/lottery/results', { 
      params: { drawId } 
    });
  }
};