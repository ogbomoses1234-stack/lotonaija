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

export const TransferModal = memo(({ isOpen, onClose, ticket }: TransferModalProps) => {
  const executeTransfer = useTicketStore((s) => s.executeTransfer);
  const [recipientPhone, setRecipientPhone] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExecute = async () => {
    if (!ticket || !recipientPhone) return;
    setIsSubmitting(true);
    const success = await executeTransfer({
      ticketId: ticket.id,
      recipientPhone,
      confirmIrreversible: true,
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
      // 💡 Add this prop if your BottomSheet supports light mode
      // sheetClassName="bg-white text-gray-900"
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
      {/* Content wrapper – forces light theme even if BottomSheet is dark */}
      <div className="bg-white text-gray-900 rounded-t-3xl pt-2 pb-6 px-0">
        {!ticket ? (
          <p className="text-sm text-gray-400 text-center py-4">
            Select a ticket to transfer.
          </p>
        ) : (
          <div className="space-y-5">
            <RecipientVerifier
              onVerified={setRecipientPhone}
              onError={() => setIsConfirmed(false)}
            />

            {/* Ticket summary */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
              <span className="text-sm text-gray-500 font-mono">Transferring:</span>
              <span className="font-bold text-gray-900 font-mono">
                Ticket #{ticket.id.slice(0, 6)}
              </span>
            </div>

            <TransferDisclaimer />

            {/* Confirmation checkbox – brand green */}
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-colors">
                <svg
                  className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-xs text-gray-600">
                I understand this action is irreversible and accept full responsibility.
              </span>
            </label>
          </div>
        )}
      </div>
    </BottomSheet>
  );
});

TransferModal.displayName = 'TransferModal';