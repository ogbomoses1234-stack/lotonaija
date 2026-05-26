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
      <div className="grid grid-cols-3 gap-3">
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
                'group relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-white p-4 text-left transition-all duration-300',
                'hover:border-brand-primary hover:shadow-md',
                isSelected && 'border-brand-primary ring-2 ring-brand-primary/30 scale-[1.02] bg-brand-primary/[0.02]',
              )}
            >
              {/* Perforation effect */}
              <div className="absolute inset-0 border-2 border-dotted border-gray-100 rounded-2xl pointer-events-none" />

              {/* Top label */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-[8px] font-black tracking-widest text-gray-400 uppercase font-mono">
                  FUND
                </span>
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all',
                    isSelected ? 'bg-brand-primary animate-pulse' : 'bg-gray-200',
                  )}
                />
              </div>

              {/* Amount */}
              <div className="py-2 text-center">
                <p
                  className={cn(
                    'text-xl font-black tracking-tighter transition-colors',
                    isSelected ? 'text-brand-primary' : 'text-gray-900',
                  )}
                >
                  {formatNGN(amount, { showSymbol: false })}
                </p>
              </div>

              {/* Scratch foil overlay (visual hint) */}
              <div className="mt-2 pt-2 border-t border-dashed border-gray-100">
                <p
                  className={cn(
                    'text-[9px] text-center font-black font-mono tracking-[0.2em] uppercase',
                    isSelected ? 'text-brand-primary' : 'text-gray-400',
                  )}
                >
                  {isSelected ? 'Selected' : 'TAP'}
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