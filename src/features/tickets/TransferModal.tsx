import { memo, useState } from 'react';
import { useTicketStore } from '@/store';
import { BottomSheet } from '@/components/common/BottomSheet';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { RecipientVerifier } from './RecipientVerifier';
import { TransferDisclaimer } from './TransferDisclaimer';
import type { Ticket } from '@/types/tickets.types';

export type TransferModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
};

/**
 * Button invocation slides up isolated input panel layout
 * Pre-result conditions, recipient verification, irreversible execution
 */
export const TransferModal = memo(({ isOpen, onClose, ticket }: TransferModalProps) => {
  const { actions } = useTicketStore();
  const [recipientPhone, setRecipientPhone] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExecute = async () => {
    if (!ticket || !recipientPhone) return;
    setIsSubmitting(true);
    const success = await actions.executeTransfer({
      ticketId: ticket.id,
      recipientPhone,
      confirmIrreversible: true
    });
    if (success) {
      onClose();
      setIsConfirmed(false);
      setRecipientPhone('');
    }
    setIsSubmitting(false);
  };

  const isDisabled = !recipientPhone || !isConfirmed || isSubmitting;

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Transfer Ownership"
      footer={
        <PrimaryButton
          variant="transfer"
          fullWidth
          disabled={isDisabled}
          loading={isSubmitting}
          onClick={handleExecute}
        >
          Confirm & Transfer
        </PrimaryButton>
      }
    >
      {!ticket ? (
        <p className="text-sm text-white/60 text-center py-4">Select a ticket to transfer.</p>
      ) : (
        <div className="space-y-4">
          <RecipientVerifier 
            onVerified={setRecipientPhone} 
            onError={() => setIsConfirmed(false)} 
          />
          
          <div className="glass-panel p-3 rounded-xl bg-white/5 flex justify-between items-center text-sm">
            <span className="text-white/60">Transferring:</span>
            <span className="font-bold text-white">Ticket #{ticket.id.slice(0, 6)}</span>
          </div>

          <TransferDisclaimer />

          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
            <input 
              type="checkbox" 
              checked={isConfirmed} 
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-md border-2 border-white/30 flex items-center justify-center peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-colors">
              <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-xs text-white/80">I understand this action is irreversible and accept full responsibility.</span>
          </label>
        </div>
      )}
    </BottomSheet>
  );
});

TransferModal.displayName = 'TransferModal';