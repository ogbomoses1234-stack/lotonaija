import type { Tier, DrawState } from '@/types/lottery.types';
import { LOTTERY_TIERS } from '@/utils/constants';


export const MOCK_TIERS: readonly Tier[] = LOTTERY_TIERS;

export const MOCK_ACTIVE_DRAW: DrawState = {
  id: 'draw_20240524_2000',
  closesAt: Date.now() + 2 * 60 * 60 * 1000, // 2 hours from now
  status: 'open',
  jackpotPool: 50_000_000
};

export const MOCK_WINNING_NUMBERS = [7, 14, 23, 31, 42, 49];

export const MOCK_TICKET_PURCHASE = {
  ticketId: `ticket_${Date.now()}`,
  drawId: MOCK_ACTIVE_DRAW.id,
  status: 'confirmed' as const
};