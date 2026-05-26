import { memo, useState } from 'react';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';
import { HapticTrigger } from '@/components/ui/HapticTrigger';
import { WALLET_CONFIG } from '@/utils/constants';
import { PaymentGatewayMock } from './PaymentGatewayMock';

export const QuickFundGrid = memo(() => {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);

  return (
    <>
      {/* ✅ FIX: Removed px-1 — parent now handles horizontal padding via -mx-4 px-4 */}
      <div className="grid grid-cols-3 gap-2 my-2">
        {WALLET_CONFIG.quickFundAmounts.map((amount) => {
          const isSelected = selectedAmount === amount;
          return (
            <HapticTrigger
              key={amount}
              as="button"
              onTrigger={() => {
                setSelectedAmount(amount);
                setIsGatewayOpen(true);
              }}
              className={cn(
                "relative flex flex-col justify-between overflow-hidden rounded-xl pt-3 pb-2.5 w-full text-left border border-white/10 transition-all duration-300",
                "bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] hover:bg-white/5",
                isSelected && "ring-1 ring-pink-500/40 scale-[1.01] bg-gradient-to-b from-[#25103a] via-[#150724] to-[#0a0216]"
              )}
            >
              {/* Sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.05] pointer-events-none" />
              
              {/* Top indicator */}
              <div className="px-2.5 border-b border-dashed border-white/10 pb-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black tracking-widest text-white/30 uppercase font-mono">
                    FUND
                  </span>
                  <div className={cn(
                    "w-1 h-1 rounded-full transition-all duration-300",
                    isSelected ? "bg-pink-400 animate-pulse" : "bg-white/10"
                  )} />
                </div>
              </div>

              {/* Amount display */}
              <div className="py-2 text-center">
                <p className={cn(
                  "text-lg font-black tracking-tighter",
                  isSelected ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white" : "text-white/90"
                )}>
                  {formatNGN(amount, { showSymbol: false })}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-1.5 border-t border-dashed border-white/10">
                <p className={cn(
                  "text-[8px] text-center font-black font-mono tracking-[0.2em] uppercase",
                  isSelected ? "text-pink-400" : "text-white/20"
                )}>
                  {isSelected ? '★' : 'TAP'}
                </p>
              </div>
            </HapticTrigger>
          );
        })}
      </div>

      <PaymentGatewayMock
        isOpen={isGatewayOpen}
        onClose={() => setIsGatewayOpen(false)}
        amount={selectedAmount}
      />
    </>
  );
});

QuickFundGrid.displayName = 'QuickFundGrid';