import type { AffiliateMetric } from '@/types/arcade.types'; // ✅ Removed unused InstantWinResult
import { ARCADE_GAMES } from '@/utils/constants';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const MOCK_ARCADE_GAMES = [...ARCADE_GAMES] as Array<{
  id: string;
  name: string;
  price: number;
  maxWin: number;
  type: 'instant' | 'wheel' | 'scratch';
  imageUrl?: string;
  description?: string;
}>;

const MOCK_AFFILIATE_METRICS: AffiliateMetric = {
  clicks: 247,
  signups: 18,
  activeReferrals: 12,
  totalCommission: 8500,
  pendingPayout: 2500,
  referralCode: 'LOTTO2024',
  conversionRate: 0.073
};

export const mockArcadeApi = {
  getGames: async () => {
    await delay(200);
    return { data: { games: MOCK_ARCADE_GAMES } };
  },

  playGame: async (gameId: string) => {
    await delay(1500);
    const winChance = gameId.includes('scratch') ? 0.3 : 0.25;
    const result = Math.random() < winChance ? 'win' : 'loss';
    const prize = result === 'win' ? Math.floor(Math.random() * 5000) + 500 : 0;
    
    return { 
      data: { 
        gameId, 
        result: result as 'win' | 'loss', 
        prizeAmount: prize,
        playId: `play_${Date.now()}`,
        playedAt: new Date().toISOString()
      } 
    };
  },

  getReferralStats: async () => {
    await delay(300);
    const metrics = { ...MOCK_AFFILIATE_METRICS };
    metrics.clicks += Math.floor(Math.random() * 10);
    metrics.totalCommission += Math.floor(Math.random() * 500);
    return { data: metrics };
  },

  claimCommission: async () => {
    await delay(800);
    const claimed = MOCK_AFFILIATE_METRICS.pendingPayout;
    return { 
      data: { 
        success: true, 
        claimedAmount: claimed, 
        newBalance: 15000 + claimed 
      } 
    };
  }
};