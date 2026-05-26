import { memo, useState } from 'react';
import { useTicketStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatNGN, formatDateNG } from '@/utils/formatters';
import { LOTTERY_TIERS } from '@/config/lottery.config';
import { Modal } from '@/components/common/Modal';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import type { Ticket } from '@/types/tickets.types';

export const TicketLedger = memo(() => {
  const { activeTickets, historicTickets } = useTicketStore();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const totalCount = (activeTickets?.length || 0) + (historicTickets?.length || 0);

  // ✅ Helper: Get tier name and price from config
  const getTierInfo = (tierId: string) => {
    const tier = LOTTERY_TIERS.find(t => t.id === tierId);
    return {
      name: tier?.name || 'Unknown',
      price: tier?.price || 200
    };
  };
const renderTicket = (ticket: Ticket) => {
const { name: tierName, price: tierPrice } = getTierInfo(ticket.tierId);
const displayPrice = ticket.price || tierPrice;

// ✅ FIX: Ensure we have at least one valid date
const displayDate = ticket.purchasedAt ?? ticket.drawnAt ?? new Date().toISOString();

return (
<div 
key={ticket.id} 
className="glass-card mb-3 p-4 cursor-pointer hover:border-white/30 transition-colors"
onClick={() => setSelectedTicket(ticket)}
>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-white text-sm">{ticket.id.slice(0, 12)}...</h3>
            <p className="text-xs text-white/60">
              {tierName} • {formatNGN(displayPrice)}
            </p>
          </div>
          <span className={cn(
            "badge text-[10px] px-2 py-0.5",
            ticket.status === 'active' && "badge-pending",
            ticket.status === 'won' && "badge-won",
            ticket.status === 'lost' && "badge-lost",
            ticket.status === 'transferred' && "badge-transferred"
          )}>
            {ticket.status === 'active' ? 'Active' : 
             ticket.status === 'won' ? 'Won' : 
             ticket.status === 'lost' ? 'Lost' : 'Transferred'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {ticket.numbers?.map((num: number) => (
            <span key={num} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
              {num.toString().padStart(2, '0')}
            </span>
          ))}
        </div>
        
   <p className="text-[10px] text-white/40">
Purchased: {formatDateNG(ticket.purchasedAt ?? ticket.drawnAt ?? new Date())}
</p>
      </div>
    );
  };

  return (
    <>
      <div className="safe-area pt-20 pb-24 px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Tickets</h1>
          <span className="text-white/60 text-sm">{totalCount} total</span>
        </div>

        {/* Active Tickets */}
        {activeTickets?.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-white/80 mb-3">Active Draws</h2>
            {activeTickets.map(ticket => renderTicket(ticket))}
          </div>
        ) : (
          <div className="glass-card p-6 text-center text-white/50 mb-6">
            <p className="text-sm">No active tickets</p>
            <p className="text-xs mt-1">Select numbers in Play to get started</p>
          </div>
        )}

        {/* Historic Tickets */}
        {historicTickets?.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-white/80 mb-3">Past Results</h2>
            {historicTickets.map(ticket => renderTicket(ticket))}
          </div>
        )}
      </div>

      {/* ✅ Ticket Details Modal */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title="Ticket Details"
        size="md"
        footer={
          <PrimaryButton variant="ghost" fullWidth onClick={() => setSelectedTicket(null)}>
            Close
          </PrimaryButton>
        }
      >
        {selectedTicket && (
          <div className="space-y-4">
            {/* Ticket ID & Status */}
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div>
                <p className="text-xs text-white/50">Ticket ID</p>
                <p className="font-mono text-sm text-white">{selectedTicket.id}</p>
              </div>
              <span className={cn(
                "badge text-[10px] px-2 py-0.5",
                selectedTicket.status === 'active' && "badge-pending",
                selectedTicket.status === 'won' && "badge-won",
                selectedTicket.status === 'lost' && "badge-lost",
                selectedTicket.status === 'transferred' && "badge-transferred"
              )}>
                {selectedTicket.status.toUpperCase()}
              </span>
            </div>

            {/* Tier & Price */}
            <div className="p-3 bg-white/5 rounded-xl">
              <p className="text-xs text-white/50 mb-1">Tier</p>
              <p className="font-bold text-white">{getTierInfo(selectedTicket.tierId).name}</p>
              <p className="text-xs text-white/50 mt-2 mb-1">Price Paid</p>
              <p className="text-lg font-bold text-brand-accent">
                {formatNGN(selectedTicket.price || getTierInfo(selectedTicket.tierId).price)}
              </p>
            </div>

            {/* Numbers */}
            <div className="p-3 bg-white/5 rounded-xl">
              <p className="text-xs text-white/50 mb-2">Selected Numbers</p>
              <div className="flex flex-wrap gap-2">
                {selectedTicket.numbers.map((num: number) => (
                  <span 
                    key={num} 
                    className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-sm font-bold text-white"
                  >
                    {num.toString().padStart(2, '0')}
                  </span>
                ))}
              </div>
            </div>

            {/* Draw Info */}
            <div className="p-3 bg-white/5 rounded-xl">
              <p className="text-xs text-white/50 mb-1">Draw ID</p>
              <p className="font-mono text-sm text-white">{selectedTicket.drawId}</p>
              <p className="text-xs text-white/50 mt-2 mb-1">Purchased At</p>
              <p className="text-sm text-white">{formatDateNG(selectedTicket.purchasedAt, { showTime: true })}</p>
            </div>

            {/* Payout (if won) */}
            {selectedTicket.payout !== undefined && selectedTicket.payout > 0 && (
              <div className="p-3 bg-brand-success/10 border border-brand-success/30 rounded-xl">
                <p className="text-xs text-brand-success/80 mb-1">Prize Won</p>
                <p className="text-xl font-bold text-brand-success">
                  +{formatNGN(selectedTicket.payout)}
                </p>
              </div>
            )}

            {/* Transfer Info (if transferred) */}
            {selectedTicket.transferredTo && (
              <div className="p-3 bg-brand-transfer/10 border border-brand-transfer/30 rounded-xl">
                <p className="text-xs text-brand-transfer/80 mb-1">Transferred To</p>
                <p className="text-sm text-white font-mono">{selectedTicket.transferredTo.phone}</p>
                <p className="text-xs text-white/50 mt-1">
                  {formatDateNG(selectedTicket.transferredTo.transferredAt)}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
});

TicketLedger.displayName = 'TicketLedger';
export default TicketLedger;