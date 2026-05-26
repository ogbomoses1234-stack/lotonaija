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
const activeTickets = useTicketStore((s) => s.activeTickets);
const historicTickets = useTicketStore((s) => s.historicTickets);
const executeTransfer = useTicketStore((s) => s.executeTransfer);
  // ✅ NEW: State for details modal
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  
  // Transfer modal state
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
    const success = await executeTransfer(payload);
      if (success) {
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

  // ✅ NEW: Open details modal
  const openDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDetailsModalOpen(true);
  };

  const renderTicket = (ticket: Ticket) => {
    const { name: tierName, price: tierPrice } = getTierInfo(ticket.tierId);
    const displayPrice = ticket.price || tierPrice;

    return (
      <div
        key={ticket.id}
        // ✅ Make entire card tappable for details
        onClick={() => openDetails(ticket)}
        className="group relative mb-4 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5 transition-all duration-300 hover:border-brand-primary hover:shadow-md cursor-pointer"
      >
        {/* Perforation effect */}
        <div className="absolute inset-0 border-2 border-dotted border-gray-200 rounded-2xl pointer-events-none" />

        {/* Ticket Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* Foil badge */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 border border-gray-300 flex items-center justify-center">
              <span className="text-xs font-black text-gray-500 font-mono">T</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">
                {ticket.id.slice(0, 12)}...
              </p>
              <p className="text-xs text-gray-500">
                {tierName} · {formatNGN(displayPrice)}
              </p>
            </div>
          </div>
          <span
            className={cn(
              'badge text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border',
              ticket.status === 'active' &&
                'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
              ticket.status === 'won' &&
                'bg-amber-100 text-amber-700 border-amber-300',
              ticket.status === 'lost' &&
                'bg-red-50 text-red-600 border-red-200',
              ticket.status === 'transferred' &&
                'bg-gray-100 text-gray-500 border-gray-300',
            )}
          >
            {ticket.status === 'active'
              ? 'Active'
              : ticket.status === 'won'
              ? 'Won'
              : ticket.status === 'lost'
              ? 'Lost'
              : 'Transferred'}
          </span>
        </div>

        {/* Numbers */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ticket.numbers?.map((num: number) => (
            <span
              key={num}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors',
                ticket.status === 'won'
                  ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                  : 'bg-gray-50 border-gray-200 text-gray-700',
              )}
            >
              {num.toString().padStart(2, '0')}
            </span>
          ))}
        </div>

        {/* Purchase date + transfer button */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-gray-400 font-mono">
            Purchased {formatDateNG(ticket.purchasedAt)}
          </p>
          {/* ✅ Transfer button only for active tickets - stops propagation to avoid opening details */}
          {ticket.status === 'active' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTicket(ticket);
                setTransferModalOpen(true);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-primary/80 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Transfer
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="safe-area pt-6 pb-24 px-4 bg-base-body min-h-screen">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-black tracking-tight">My Tickets</h1>
          <span className="text-sm text-gray-400 font-mono">
            {(activeTickets?.length || 0) + (historicTickets?.length || 0)} total
          </span>
        </div>

        {/* Active Tickets */}
        {activeTickets?.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Active Draws
            </h2>
            {activeTickets.map((ticket) => renderTicket(ticket))}
          </div>
        ) : (
          <div className="mb-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-400 font-bold text-sm">No active tickets</p>
            <p className="text-gray-400 text-xs mt-1">
              Select numbers in Play to get started
            </p>
          </div>
        )}

        {/* Historic Tickets */}
        {historicTickets?.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Past Results
            </h2>
            {historicTickets.map((ticket) => renderTicket(ticket))}
          </div>
        )}
      </div>

      {/* ✅ NEW: Ticket Details Modal */}
      <Modal
        isOpen={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedTicket(null);
        }}
        title="Ticket Details"
        size="md"
        footer={
          <div className="flex gap-3 w-full">
            {/* Transfer button only for active tickets */}
            {selectedTicket?.status === 'active' && (
              <PrimaryButton
                variant="ghost"
                className="flex-1"
                onClick={() => {
                  setDetailsModalOpen(false);
                  setTransferModalOpen(true);
                }}
              >
                Transfer Ticket
              </PrimaryButton>
            )}
            <PrimaryButton
              variant="primary"
              className="flex-1"
              onClick={() => {
                setDetailsModalOpen(false);
                setSelectedTicket(null);
              }}
            >
              Close
            </PrimaryButton>
          </div>
        }
      >
        {selectedTicket && (
          <div className="space-y-5">
            {/* Ticket ID & Status Header */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-1">Ticket ID</p>
                <p className="font-mono text-sm text-gray-900 font-bold">{selectedTicket.id}</p>
              </div>
              <span
                className={cn(
                  'badge text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border',
                  selectedTicket.status === 'active' &&
                    'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
                  selectedTicket.status === 'won' &&
                    'bg-amber-100 text-amber-700 border-amber-300',
                  selectedTicket.status === 'lost' &&
                    'bg-red-50 text-red-600 border-red-200',
                  selectedTicket.status === 'transferred' &&
                    'bg-gray-100 text-gray-500 border-gray-300',
                )}
              >
                {selectedTicket.status.toUpperCase()}
              </span>
            </div>

            {/* Tier & Price */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-2">Tier</p>
              <p className="font-bold text-gray-900 text-lg">{getTierInfo(selectedTicket.tierId).name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mt-3 mb-1">Price Paid</p>
              <p className="text-2xl font-black text-brand-primary">
                {formatNGN(selectedTicket.price || getTierInfo(selectedTicket.tierId).price)}
              </p>
            </div>

            {/* Selected Numbers */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-3">Selected Numbers</p>
              <div className="flex flex-wrap gap-2">
                {selectedTicket.numbers.map((num: number) => (
                  <span
                    key={num}
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border',
                      selectedTicket.status === 'won'
                        ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                        : 'bg-white border-gray-200 text-gray-700'
                    )}
                  >
                    {num.toString().padStart(2, '0')}
                  </span>
                ))}
              </div>
            </div>

            {/* Draw & Purchase Info */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-1">Draw ID</p>
                <p className="font-mono text-sm text-gray-900">{selectedTicket.drawId}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-1">Purchased At</p>
                <p className="text-sm text-gray-900">{formatDateNG(selectedTicket.purchasedAt, { showTime: true })}</p>
              </div>
            </div>

            {/* Payout (if won) */}
            {selectedTicket.payout !== undefined && selectedTicket.payout > 0 && (
              <div className="p-4 rounded-xl bg-brand-success/10 border border-brand-success/30">
                <p className="text-[10px] text-brand-success uppercase tracking-wider font-mono mb-1">Prize Won</p>
                <p className="text-2xl font-black text-brand-success">
                  +{formatNGN(selectedTicket.payout)}
                </p>
              </div>
            )}

            {/* Transfer Info (if transferred) */}
            {selectedTicket.transferredTo && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-2">Transferred To</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-900 font-mono">{selectedTicket.transferredTo.phone}</p>
                  <p className="text-xs text-gray-500">{selectedTicket.transferredTo.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {formatDateNG(selectedTicket.transferredTo.transferredAt, { showTime: true })}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Transfer Modal – light version */}
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
          <div className="space-y-5">
            {/* Ticket summary card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
              <span className="text-sm text-gray-500 font-mono">Transferring:</span>
              <span className="font-bold text-gray-900 font-mono">
                Ticket #{selectedTicket.id.slice(0, 6)}
              </span>
            </div>

            {/* Recipient input */}
            <div>
              <InputField
                label="Recipient Phone"
                value={recipientPhone}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setRecipientPhone(raw);
                  setIsVerified(false);
                }}
                prefix={<span className="text-gray-900 font-medium select-none">+234</span>}
                placeholder="801 234 5678"
                inputMode="numeric"
                success={isVerified ? 'Verified: Chukwudi O.' : undefined}
                error={
                  !isVerified && recipientPhone.length > 0 && recipientPhone.length !== 10
                    ? 'Invalid format'
                    : undefined
                }
              />
              {!isVerified && recipientPhone.length === 10 && (
                <button
                  onClick={handleVerifyPhone}
                  className="mt-2 w-full py-2 text-sm font-bold text-brand-primary hover:underline"
                >
                  Verify Recipient
                </button>
              )}
              <p className="text-[10px] text-gray-400 mt-1">
                Enter the recipient's Nigerian phone number. We'll verify their account.
              </p>
            </div>

            {/* Irreversible warning */}
            <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 flex gap-3 items-start">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                ⚠️ <strong>IRREVERSIBLE ACTION:</strong> Physical ticket ownership will be permanently reassigned. Future winning payouts will route exclusively to the target balance ledger. This transaction cannot be undone or disputed.
              </p>
            </div>

            {/* Confirmation checkbox */}
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