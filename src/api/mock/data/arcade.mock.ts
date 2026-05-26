import type { ArcadeGame, AffiliateMetric, InstantWinResult } from '@/types/arcade.types';
import { ARCADE_GAMES } from '@/utils/constants';

// ✅ Fix: Convert readonly const to mutable array
export const MOCK_ARCADE_GAMES: ArcadeGame[] = [...ARCADE_GAMES] as ArcadeGame[];

export const MOCK_AFFILIATE_METRICS: AffiliateMetric = {
  clicks: 247,
  signups: 18,
  activeReferrals: 12,
  totalCommission: 8500,
  pendingPayout: 2500,
  referralCode: 'LOTTO2024',
  conversionRate: 0.073
};

export const MOCK_INSTANT_WIN: InstantWinResult = {
  gameId: 'scratch-mini',
  result: Math.random() > 0.7 ? 'win' : 'loss',
  prizeAmount: Math.random() > 0.7 ? 5000 : 0,
  playId: `play_${Date.now()}`,
  playedAt: new Date().toISOString()
};