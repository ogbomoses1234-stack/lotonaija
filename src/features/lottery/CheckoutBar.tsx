import { memo, useState } from 'react'; // ✅ FIX: Import useState
import { useTicketStore, useWalletStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';
import { useWalletGuard } from '@/hooks/useWalletGuard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { DeficitModal } from './DeficitModal';

/**
 * Stickily anchored container compiling total dynamic quantities
 */
export const CheckoutBar = memo(() => {
  const { selectedNumbers, activeTier, actions, isPurchasing } = useTicketStore();
  const { balance } = useWalletStore();
  const { checkBalance, handleInsufficientFunds } = useWalletGuard();
  
  // ✅ FIX: useState is now defined because we imported it above
  const [showDeficit, setShowDeficit] = useState(false);

  const total = selectedNumbers.length * activeTier.price;
  const { hasSufficientFunds, shortfall } = checkBalance(total);

  const handleCheckout = () => {
    if (!hasSufficientFunds) {
      setShowDeficit(true);
    } else {
      actions.purchase();
    }
  };

  // Don't render if no numbers selected
  if (selectedNumbers.length === 0) return null;

  return (
    <>
      <div className={cn(
        "fixed bottom-[80px] left-0 right-0 z-40 max-w-[480px] mx-auto px-4",
        "glass-panel p-3 flex items-center justify-between border-t border-white/20"
      )}>
        <div>
          <span className="text-xs text-white/60 block">Total ({selectedNumbers.length} picks)</span>
          <span className="text-xl font-bold text-white">{formatNGN(total)}</span>
        </div>
        <PrimaryButton 
          onClick={handleCheckout} 
          loading={isPurchasing}
          disabled={selectedNumbers.length === 0}
        >
          Play Now
        </PrimaryButton>
      </div>

      <DeficitModal 
        isOpen={showDeficit || !hasSufficientFunds}
        onClose={() => setShowDeficit(false)}
        totalCost={total}
        walletBalance={balance}
      />
    </>
  );
});

CheckoutBar.displayName = 'CheckoutBar';