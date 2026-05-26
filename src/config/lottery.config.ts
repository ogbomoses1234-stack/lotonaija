import type { Tier } from '@/types/lottery.types';

export interface StandardTier extends Tier {
  subName: string;
  bgClass: string;
  accentTextClass: string;
  glowClass: string;
  tagBgClass: string;
  ringClass: string;
  baseTicketsSold: number;
  cardDimensions: string; // Tailors unique spatial dominance for premium tiers
  badgeIcon: string;
}

export const LOTTERY_TIERS: StandardTier[] = [
  { 
    id: 'tier-1', 
    name: 'CLASSIC', 
    subName: 'BRONZE DAILY LIGHT',
    price: 200, 
    pool: 1000000,
    maxPicks: 6,
    color: 'amber', // Matches Bronze copper/amber tokens
    bgClass: 'from-[#2e1810] via-[#1a0f0a] to-[#422216]/60 border-amber-900/60', 
    accentTextClass: 'text-amber-500',
    glowClass: 'shadow-amber-950/40',
    tagBgClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    ringClass: 'ring-amber-700 border-amber-500/40',
    baseTicketsSold: 342,
    cardDimensions: 'w-full min-h-[340px]', 
    badgeIcon: '🥉'
  },
  { 
    id: 'tier-2', 
    name: 'MEGA', 
    subName: 'SILVER SPEED STRIKE',
    price: 500, 
    pool: 500000,
    maxPicks: 6,
    color: 'cyan', // Matches Silver chrome/cyan tokens
    bgClass: 'from-[#1e293b] via-[#0f172a] to-[#334155]/60 border-slate-700/60', 
    accentTextClass: 'text-slate-300',
    glowClass: 'shadow-slate-950/40',
    tagBgClass: 'bg-slate-300/10 text-slate-300 border-slate-300/20',
    ringClass: 'ring-slate-400 border-slate-300/40',
    baseTicketsSold: 789,
    cardDimensions: 'w-full min-h-[340px]',
    badgeIcon: '🥈'
  },
  { 
    id: 'tier-3', 
    name: 'VIP POWER', 
    subName: 'GOLDEN ULTIMATE MAX',
    price: 1000, 
    pool: 200000,
    maxPicks: 6,
    color: 'yellow', // Premium Golden/Yellow tokens
    bgClass: 'from-[#422006] via-[#1c0d02] to-[#713f12]/80 border-yellow-600/70', 
    accentTextClass: 'text-yellow-400 font-extrabold text-glow',
    glowClass: 'shadow-yellow-600/20 neon-purple', // Extra outer glow setup
    tagBgClass: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40 animate-pulse',
    ringClass: 'ring-yellow-400 border-yellow-300/60',
    baseTicketsSold: 124,
    cardDimensions: 'w-full min-h-[360px] md:scale-[1.02]', // Slightly taller and crispier layout presence
    badgeIcon: '👑'
  }
];