import { memo } from 'react';
import { useTicketStore } from '@/store';
import { cn } from '@/utils/cn';
import { GlassCard } from '@/components/common/GlassCard';
import { CountdownTimer } from './CountdownTimer';
import { formatTicketNumbers, formatDateNG } from '@/utils/formatters';
import { DRAW_SCHEDULE } from '@/utils/constants';

export type ActiveDrawCardProps = {
  ticket: import('@/types/tickets.types').Ticket;
  onTransfer: (ticket: import('@/types/tickets.types').Ticket) => void;
};

/**
 * Card displaying unique ID, numbers matched, and interactive countdown
 */
export const ActiveDrawCard = memo(({ ticket, onTransfer }: ActiveDrawCardProps) => {
  const drawClosesAt = Date.now() + 2 * 60 * 60 * 1000; // Mock 2h from now
  const isTransferrable = ticket.status === 'active';

  return (
    <GlassCard className="mb-3 transition-all duration-150 hover:border-white/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded">ID: {ticket.id.slice(0, 8).toUpperCase()}</span>
        <CountdownTimer drawTimestamp={drawClosesAt} compact />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {ticket.numbers.map((num) => (
          <span key={num} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold border border-white/10">
            {num.toString().padStart(2, '0')}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <div className="text-xs text-white/60">
          <p>Tier: <span className="text-white">{ticket.tierId.toUpperCase()}</span></p>
          <p>Purchased: {formatDateNG(ticket.purchasedAt)}</p>
        </div>
        
        {isTransferrable && (
          <button 
            onClick={() => onTransfer(ticket)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-semibold rounded-full transition-colors"
          >
            Transfer Ticket
          </button>
        )}
      </div>
    </GlassCard>
  );
});

ActiveDrawCard.displayName = 'ActiveDrawCard';