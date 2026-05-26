import { memo, useState } from 'react';
import { useTicketStore, useWalletStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';
import { useWalletGuard } from '@/hooks/useWalletGuard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { DeficitModal } from './DeficitModal';

export const CheckoutBar = memo(() => {
  const selectedNumbers = useTicketStore((s) => s.selectedNumbers);
  const activeTier = useTicketStore((s) => s.activeTier);
  const purchase = useTicketStore((s) => s.purchase);
  const isPurchasing = useTicketStore((s) => s.isPurchasing);
  const balance = useWalletStore((s) => s.balance);
  const { checkBalance } = useWalletGuard();
  const [showDeficit, setShowDeficit] = useState(false);

  const total = selectedNumbers.length * activeTier.price;
  const { hasSufficientFunds } = checkBalance(total);

  const handleCheckout = () => {
    if (!hasSufficientFunds) {
      setShowDeficit(true);
    } else {
      purchase();
    }
  };

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
        isOpen={showDeficit}
        onClose={() => setShowDeficit(false)}
        totalCost={total}
        walletBalance={balance}
      />
    </>
  );
});

CheckoutBar.displayName = 'CheckoutBar';