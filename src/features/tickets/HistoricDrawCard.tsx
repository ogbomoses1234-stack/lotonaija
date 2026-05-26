import { memo } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { cn } from '@/utils/cn';
import { formatNGN, formatDateNG } from '@/utils/formatters';

export type HistoricDrawCardProps = {
  ticket: { 
    id: string; 
    numbers: number[]; 
    result: string; 
    payout?: number; 
    drawnAt: string 
  };
};

/**
 * Completed results, payout status, immutable UI
 */
export const HistoricDrawCard = memo(({ ticket }: HistoricDrawCardProps) => {
  // ✅ FIX: Add nullish check for payout
  const isWin = ticket.result === 'win' || (ticket.payout !== undefined && ticket.payout > 0);

  return (
    <GlassCard className={cn("mb-3 opacity-80 border-white/10", isWin && "border-emerald-500/30 bg-emerald-900/10")}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono text-white/40">{ticket.id.slice(0, 8).toUpperCase()}</span>
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", 
          isWin ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
        )}>
          {/* ✅ FIX: Use nullish coalescing for payout */}
          {isWin ? `+${formatNGN(ticket.payout ?? 0, { showDecimals: false })}` : 'No Match'}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 opacity-60">
        {ticket.numbers.map((num) => (
          <span key={num} className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-medium border border-white/5">
            {num.toString().padStart(2, '0')}
          </span>
        ))}
      </div>
      
      <p className="text-[10px] text-white/40 mt-2 text-right">Drawn {formatDateNG(ticket.drawnAt)}</p>
    </GlassCard>
  );
});

HistoricDrawCard.displayName = 'HistoricDrawCard';