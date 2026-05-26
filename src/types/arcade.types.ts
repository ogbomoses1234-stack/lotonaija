/**
 * Instant-win games, affiliate metrics, and sharing types
 */

export type ArcadeGameType = 'instant' | 'wheel' | 'scratch';
export type ArcadeGameResult = 'win' | 'loss' | 'jackpot';

export interface ArcadeGame {
  id: string;
  name: string;
  price: number;
  maxWin: number;
  type: ArcadeGameType;
  imageUrl?: string; // ✅ Make optional
  description?: string;
  playCount?: number;
}

export interface InstantWinResult {
  gameId: string;
  result: ArcadeGameResult;
  prizeAmount: number;
  playId: string;
  playedAt: string;
  animationDuration?: number;
}

export interface AffiliateMetric {
  clicks: number;
  signups: number;
  activeReferrals: number;
  totalCommission: number;
  pendingPayout: number;
  referralCode: string;
  conversionRate: number;
}

export interface ReferralSharePayload {
  platform: 'whatsapp' | 'twitter' | 'facebook' | 'copy';
  referralCode: string;
  customMessage?: string;
}