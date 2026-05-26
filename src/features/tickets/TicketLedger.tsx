import { memo, useState } from 'react';
import { useTicketStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatNGN, formatDateNG } from '@/utils/formatters';
import { LOTTERY_TIERS } from '@/config/lottery.config';
import { Modal } from '@/components/common/Modal';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { InputField } from '@/components/common/InputField';
import { ComplianceCheckbox } from '@/features/auth/ComplianceCheckbox';
import type { Ticket, TransferPayload } from '@/types/tickets.types';

export const TicketLedger = memo(() => {
  const { activeTickets, historicTickets, actions } = useTicketStore();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  const getTierInfo = (tierId: string) => {
    const tier = LOTTERY_TIERS.find(t => t.id === tierId);
    return {
      name: tier?.name || 'Unknown',
      price: tier?.price || 200
    };
  };

  const handleVerifyPhone = async () => {
    if (recipientPhone.length !== 10) return;
    
    // Mock verification - in production, call real API
    await new Promise(res => setTimeout(res, 600));
    setIsVerified(true);
  };

  const handleTransfer = async () => {
    if (!selectedTicket || !isVerified || !isConfirmed) return;
    
    setIsTransferring(true);
    try {
      const payload: TransferPayload = {
        ticketId: selectedTicket.id,
        recipientPhone: `+234${recipientPhone}`,
        confirmIrreversible: true
      };
      
      const success = await actions.executeTransfer(payload);
      if (success) {
        // Reset modal state
        setTransferModalOpen(false);
        setSelectedTicket(null);
        setRecipientPhone('');
        setIsVerified(false);
        setIsConfirmed(false);
      }
    } catch (err) {
      console.error('Transfer failed:', err);
      alert('Transfer failed. Please try again.');
    } finally {
      setIsTransferring(false);
    }
  };

  const renderTicket = (ticket: Ticket) => {
    const { name: tierName, price: tierPrice } = getTierInfo(ticket.tierId);
    const displayPrice = ticket.price || tierPrice;

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
          Purchased: {formatDateNG(ticket.purchasedAt)}
        </p>

        {/* ✅ Transfer Button for Active Tickets */}
        {ticket.status === 'active' && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening details modal
              setSelectedTicket(ticket);
              setTransferModalOpen(true);
            }}
            className="mt-3 w-full py-2 rounded-xl bg-purple-600/20 border border-purple-600/40 text-purple-400 font-semibold flex items-center justify-center gap-2 hover:bg-purple-600/30 transition-colors text-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Transfer Ticket
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="safe-area pt-20 pb-24 px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Tickets</h1>
          <span className="text-white/60 text-sm">
            {(activeTickets?.length || 0) + (historicTickets?.length || 0)} total
          </span>
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

      {/* ✅ Transfer Modal */}
      <Modal
        isOpen={transferModalOpen}
        onClose={() => {
          setTransferModalOpen(false);
          setRecipientPhone('');
          setIsVerified(false);
          setIsConfirmed(false);
        }}
        title="Transfer Ticket Ownership"
        size="md"
        footer={
          <PrimaryButton
            variant="transfer"
            fullWidth
            disabled={!isVerified || !isConfirmed || isTransferring}
            loading={isTransferring}
            onClick={handleTransfer}
          >
            Confirm & Transfer
          </PrimaryButton>
        }
      >
        {selectedTicket && (
          <div className="space-y-4">
            {/* Ticket Summary */}
            <div className="glass-panel p-3 rounded-xl bg-white/5 flex justify-between items-center text-sm">
              <span className="text-white/60">Transferring:</span>
              <span className="font-bold text-white">Ticket #{selectedTicket.id.slice(0, 6)}</span>
            </div>

            {/* Recipient Verification */}
            <div className="space-y-2">
              <InputField
                label="Recipient Phone"
                value={recipientPhone}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setRecipientPhone(raw);
                  setIsVerified(false);
                }}
                prefix={<span className="text-white/80 font-medium select-none">+234</span>}
                placeholder="801 234 5678"
                inputMode="numeric"
                success={isVerified ? 'Verified: Chukwudi O.' : undefined}
                error={!isVerified && recipientPhone.length > 0 && recipientPhone.length !== 10 ? "Invalid format" : undefined}
              />
              
              {!isVerified && recipientPhone.length === 10 && (
                <PrimaryButton 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleVerifyPhone}
                  className="w-full"
                >
                  Verify Recipient
                </PrimaryButton>
              )}
              
              <p className="text-[10px] text-white/40">
                Enter the recipient's Nigerian phone number. We'll verify their account.
              </p>
            </div>

            {/* Irreversible Disclaimer */}
            <div className={cn(
              "bg-amber-900/30 border border-amber-500/40 rounded-[20px] p-4",
              "flex gap-3 items-start"
            )}>
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
                ⚠️ <strong>IRREVERSIBLE ACTION:</strong> Physical ticket ownership will be permanently reassigned. Future winning payouts will route exclusively to the target balance ledger. This transaction cannot be undone or disputed.
              </p>
            </div>

            {/* Confirmation Checkbox */}
            <ComplianceCheckbox
              checked={isConfirmed}
              onCheckedChange={setIsConfirmed}
            />
          </div>
        )}
      </Modal>
    </>
  );
});

TicketLedger.displayName = 'TicketLedger';
export default TicketLedger;