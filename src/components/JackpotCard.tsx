import { memo } from 'react';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';
import type { StandardTier } from '@/config/lottery.config';

export type JackpotCardProps = {
  tier: StandardTier;
  isSelected: boolean;
  onClick: () => void;
  currentTickets?: number;
  totalTickets?: number;
};

export const JackpotCard = memo(({ 
  tier, 
  isSelected, 
  onClick, 
  currentTickets = 0,
  totalTickets = 1000 
}: JackpotCardProps) => {
  const progress = Math.min((currentTickets / totalTickets) * 100, 100);

  // Dynamic assignment mapped strictly to our high-fidelity global style tokens
  const getTierLayoutClasses = (tierId: string) => {
    switch (tierId) {
      case 'tier-1': // Bronze
        return {
          cardBg: 'from-[#28150e] via-[#160c08] to-[#3a1d13] border-amber-900/40',
          accentText: 'text-amber-500',
          progressBar: 'bg-amber-600',
          glow: 'neon-amber',
          textGradient: 'text-white'
        };
      case 'tier-2': // Silver
        return {
          cardBg: 'from-[#162035] via-[#0b101b] to-[#222f4b] border-slate-700/40',
          accentText: 'text-slate-300',
          progressBar: 'bg-slate-400',
          glow: 'neon-cyan',
          textGradient: 'text-white'
        };
      case 'tier-3': // Gold
      default:
        return {
          cardBg: 'from-[#2e1905] via-[#120902] to-[#522c07] border-yellow-600/50',
          accentText: 'text-yellow-400 text-glow',
          progressBar: 'bg-gradient-to-r from-yellow-500 to-amber-400',
          glow: 'neon-amber',
          textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 text-glow'
        };
    }
  };

  const styles = getTierLayoutClasses(tier.id);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col justify-between   p-6 text-left transition-all duration-300 border backdrop-blur-xl overflow-hidden bg-gradient-to-br w-full zigzag-bottom",
        styles.cardBg,
        tier.cardDimensions,
        isSelected 
          ? cn("ring-2 scale-[1.03] border-t-white/30 z-10 shadow-2xl", styles.glow) 
          : "shadow-lg opacity-90 hover:opacity-100 hover:border-white/10 hover:-translate-y-0.5"
      )}
    >
      {/* High-End Glass Morphic Gloss Highlight Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/[0.04] pointer-events-none" />

      {/* Top Section */}
      <div className="w-full relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{tier.badgeIcon}</span>
              <p className="text-white/40 text-[10px] font-black font-mono uppercase tracking-widest">
                {tier.subName}
              </p>
            </div>
            <h3 className="text-white font-black text-2xl tracking-tight font-sans">
              {tier.name} JACKPOT
            </h3>
          </div>

          {/* Active selection beacon indicator */}
          <div className="h-5 flex items-center">
            <span className={cn(
              "w-2.5 h-2.5 rounded-full shadow-sm transition-all duration-300",
              isSelected ? "bg-current animate-pulse" : "bg-white/10",
              isSelected ? styles.accentText : "text-white/20"
            )} />
          </div>
        </div>

        {/* Prize Pool Core Block */}
        <div className="mt-5 mb-4">
          <p className="text-white/40 text-[11px] font-bold font-mono uppercase tracking-wider mb-1">
            Guaranteed Payout Pool
          </p>
          <p className={cn("text-4xl font-black tracking-tight font-sans transition-all", styles.textGradient)}>
            {formatNGN(tier.pool)}
          </p>
        </div>
      </div>

      {/* Mid-Section: Structural Ticket Perforation Divider with Side Notches */}
      <div className="w-full relative my-2 pointer-events-none select-none">
        <div className="ticket-zigzag-divider">
          {/* Right side notch companion anchor */}
          <div className="ticket-zigzag-notch-right" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full space-y-4 relative z-10">
        {/* Ticket Requirement Summary Info */}
        <p className="text-white/50 text-[11px] leading-relaxed max-w-xs font-medium">
          Get a valid entry ticket for every <span className={cn("font-bold font-mono", styles.accentText)}>{formatNGN(tier.price)}</span> accumulated wager value processed.
        </p>

        {/* Linear Managed Micro-Progress Metric */}
        <div className="space-y-1.5">
          <div className="h-1.5 bg-black/40 rounded-full overflow-hidden p-[1px] border border-white/5">
            <div 
              className={cn("h-full rounded-full transition-all duration-700 ease-out", styles.progressBar)}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Current Volume Counter */}
          <div className="flex justify-between items-center text-[10px] font-bold font-mono uppercase tracking-wider text-white/40">
            <span>Pool Allocation</span>
            <span className={cn("font-black", styles.accentText)}>
              {currentTickets.toLocaleString()} / {totalTickets.toLocaleString()} tix
            </span>
          </div>
        </div>
      </div>
    </button>
  );
});

JackpotCard.displayName = 'JackpotCard';