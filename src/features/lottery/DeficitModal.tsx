import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
 // ✅ FIX: Import from formatters.ts, NOT math.ts
import { formatNGN } from '@/utils/formatters';
import { calculateShortfall } from '@/utils/math';
import { BottomSheet } from '@/components/common/BottomSheet';
import { PrimaryButton } from '@/components/common/PrimaryButton';

export type DeficitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  totalCost: number;
  walletBalance: number;
};

/**
 * Bottom-sheet error modal calculating exact deficit & deposit CTA
 */
export const DeficitModal = memo(({ isOpen, onClose, totalCost, walletBalance }: DeficitModalProps) => {
  const navigate = useNavigate();
  const shortfall = calculateShortfall(totalCost, walletBalance);

  const handleDeposit = () => {
    onClose();
    navigate('/wallet', { state: { depositAmount: shortfall, exact: true } });
  };

  if (shortfall <= 0) return null;

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Insufficient Balance"
      footer={
        <PrimaryButton variant="success" fullWidth onClick={handleDeposit}>
          Deposit Exactly {formatNGN(shortfall)}
        </PrimaryButton>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-white/80">
          You need {formatNGN(totalCost)} to purchase this ticket. Your current balance is <strong>{formatNGN(walletBalance)}</strong>.
        </p>
        
        <div className="glass-panel p-4 rounded-2xl bg-red-500/10 border-red-500/30 flex items-center justify-between">
          <span className="text-sm text-red-200">Shortfall Amount</span>
          <span className="text-xl font-bold text-red-400">{formatNGN(shortfall)}</span>
        </div>
        
        <p className="text-xs text-white/50">Fund your wallet to unlock instant play and P2P ticket transfers.</p>
      </div>
    </BottomSheet>
  );
});

DeficitModal.displayName = 'DeficitModal';