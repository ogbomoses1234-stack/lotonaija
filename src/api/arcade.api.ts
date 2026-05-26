import { USE_MOCK_API } from './config';
import type { AffiliateMetric } from '@/types/arcade.types'; // ✅ Removed unused InstantWinResult
import apiClient from './client';
import { mockArcadeApi } from './mock/arcade.mock.api';

export const arcadeApi = {
  getGames: async () => {
    if (USE_MOCK_API) return mockArcadeApi.getGames();
    return apiClient.get<{ games: Array<{ id: string; name: string; price: number; maxWin: number; type: string }> }>('/arcade/games');
  },

  playGame: async (gameId: string) => {
    if (USE_MOCK_API) return mockArcadeApi.playGame(gameId);
    return apiClient.post<{ result: 'win' | 'loss'; winnings: number; playId: string }>('/arcade/play', { gameId });
  },

  getReferralStats: async () => {
    if (USE_MOCK_API) return mockArcadeApi.getReferralStats();
    return apiClient.get<AffiliateMetric>('/arcade/referrals/stats');
  },

  claimCommission: async () => {
    if (USE_MOCK_API) return mockArcadeApi.claimCommission();
    return apiClient.post<{ success: boolean; claimedAmount: number; newBalance: number }>('/arcade/referrals/claim');
  }
};