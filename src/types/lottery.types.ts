/**
 * Lottery domain types: tiers, draws, selections, play modes
 */

export type PlayMode = 'PICK_NUMBERS' | 'SCRATCH_CARD';

// ✅ Synchronized cleanly with layout config strings to prevent type workarounds
export type TierName = 
  | 'Bronze' 
  | 'Silver' 
  | 'Gold' 
  | 'Tier 1' 
  | 'Tier 2' 
  | 'Tier 3'
  | 'CLASSIC'
  | 'MEGA'
  | 'VIP POWER';

// ✅ Cleaned up colors to match exact Tailwind theme signatures
export type TierColor = 'amber' | 'gray' | 'yellow' | 'purple' | 'cyan' | 'pink';

export type Tier = {
  id: string;
  name: TierName;
  price: number;
  pool: number;
  maxPicks: number;
  color: TierColor;
};

export type TicketSelection = {
  tierId: string;
  numbers: number[];
  quantity: number;
  totalCost: number;
};

export type DrawState = {
  id: string;
  closesAt: number;
  status: 'open' | 'closed' | 'drawing' | 'completed';
  winningNumbers?: number[];
  jackpotPool?: number;
};

export type ScratchCardResult = {
  revealed: boolean;
  matchCount: number;
  prize?: number;
  status: 'playing' | 'won' | 'lost';
};

export type NumberGridConfig = {
  min: number;
  max: number;
  defaultMaxSelection: number;
  cols: { mobile: number; desktop: number };
};