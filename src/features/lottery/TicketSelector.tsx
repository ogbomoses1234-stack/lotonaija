import { memo, useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';
import { useTicketStore, useWalletStore } from '@/store';
import type { Tier } from '@/types/lottery.types';

export type TicketSelectorProps = {
  tier: Tier;
  onBack: () => void;
};

const generateTicketNumbers = (): number[] => {
  const numbers = new Set<number>();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 50) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

export const TicketSelector = memo(({ tier, onBack }: TicketSelectorProps) => {
const setTier = useTicketStore((s) => s.setTier);
const purchase = useTicketStore((s) => s.purchase);
const balance = useWalletStore((s) => s.balance);
 
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    console.log('🎫 TicketSelector mounted with tier:', tier);
  }, [tier]);

  const totalSlots = tier.id === 'tier-1' ? 20 : tier.id === 'tier-2' ? 15 : 10;
  const availableSlots = Array.from({ length: totalSlots }, (_, i) => i + 1);

  const handleSlotClick = (index: number) => {
    setSelectedTicketIndex(prev => (prev === index ? null : index));
    setPurchaseSuccess(false);
  };

  const handlePurchase = async () => {
    if (selectedTicketIndex === null) return;
    if (balance < tier.price) {
      alert('Insufficient balance');
      return;
    }

    setIsPurchasing(true);
    try {
      const ticketNumbers = generateTicketNumbers();

      setTier(tier.id);
useTicketStore.setState({ selectedNumbers: ticketNumbers });
const success = await purchase();
      if (success) {
        setSelectedTicketIndex(null);
        setPurchaseSuccess(true);
        setTimeout(() => setPurchaseSuccess(false), 2000);
      }
    } catch (err) {
      console.error('Purchase failed:', err);
      alert('Purchase failed. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="w-full pb-32 select-none min-h-screen bg-base-body">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-8  ">
        <button
          onClick={onBack}
          className="group flex items-center gap-2.5 px-3 py-2 -ml-3 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:border-brand-primary transition-colors">
            <svg
              className="w-4 h-4 text-gray-600 group-hover:text-brand-primary transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-wider text-gray-600 uppercase font-mono group-hover:text-black transition-colors">
            Back
          </span>
        </button>

        <div className="text-right">
          <p className="text-gray-500 text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-1">
            {tier.name}
          </p>
          <p className="text-black font-black text-2xl tracking-tight">
            {formatNGN(tier.price)}
          </p>
        </div>
      </div>

      {/* ===== HUD Panel ===== */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary" />
            </span>
            <div>
              <p className="text-black font-bold text-sm">Select VIP Ticket</p>
              <p className="text-gray-400 text-[11px] font-mono">TAP TO SECURE ENTRY</p>
            </div>
          </div>
          <div className="text-right bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
            <p className="text-black font-black font-mono text-lg">{availableSlots.length}</p>
            <p className="text-gray-400 text-[9px] font-bold uppercase">Remaining</p>
          </div>
        </div>
      </div>

      {/* ===== Success Banner ===== */}
      {purchaseSuccess && (
        <div className="fixed top-20 left-0 right-0 max-w-md mx-auto z-50 px-4 animate-slide-up">
          <div className="bg-brand-success/10 border border-brand-success/30 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-sm">
            <svg className="w-6 h-6 text-brand-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="text-black font-bold text-sm">Ticket Purchased!</p>
              <p className="text-gray-600 text-xs">Check My Tickets to view</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== VIP PASS Ticket Grid ===== */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {availableSlots.map((slotIndex) => {
          const isSelected = selectedTicketIndex === slotIndex;
          const ticketNumber = String(slotIndex).padStart(5, '0');

          return (
            <button
              key={slotIndex}
              onClick={() => handleSlotClick(slotIndex)}
              disabled={isPurchasing}
              className={cn(
                'relative group overflow-hidden rounded-2xl transition-all duration-300',
                'hover:scale-[1.02] active:scale-[0.98]',
                isSelected 
                  ? 'shadow-2xl shadow-brand-primary/20 ring-2 ring-brand-primary/40' 
                  : 'shadow-lg'
              )}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, #6b21a8 0%, #4c1d95 50%, #2e1065 100%)'
                  : 'linear-gradient(135deg, #1e1b4b 0%, #0f0e17 50%, #020617 100%)',
              }}
            >
              {/* Perforation Notches - Left & Right */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-base-body rounded-r-full z-10" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-base-body rounded-l-full z-10" />

              {/* Card Content */}
              <div className="p-5 space-y-4">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 font-mono">
                      VIP PASS
                    </p>
                    <p className="text-xl font-black text-white mt-1 font-mono">
                      #{ticketNumber}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      isSelected ? 'bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]' : 'bg-white/20'
                    )} />
                    <p className="text-[9px] font-bold uppercase tracking-wider text-white/40 font-mono">
                      DIGITAL
                    </p>
                  </div>
                </div>

                {/* Dashed Separator */}
                <div className="border-t-2 border-dashed border-white/20" />

                {/* Potential Prize Section */}
                <div className="text-center py-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50 mb-2 font-mono">
                    POTENTIAL
                  </p>
                  <p className="text-4xl font-black text-white tracking-tight">
                    {formatNGN(tier.price)}
                  </p>
                  
                  {/* Pool Badge */}
                  <div className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-black/40 border border-white/10">
                    <p className="text-[9px] font-bold text-white/70 font-mono uppercase tracking-wider">
                      Pool: {tier.pool.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Dashed Separator */}
                <div className="border-t-2 border-dashed border-white/20" />

                {/* Barcode & Footer */}
                <div className="space-y-3">
                  {/* Barcode */}
                  <div className="flex items-center justify-center gap-[2px] h-8">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1].map((width, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'h-full rounded-sm',
                          isSelected ? 'bg-pink-400/60' : 'bg-white/30'
                        )}
                        style={{ width: `${width * 2}px` }}
                      />
                    ))}
                  </div>

                  {/* Selection Status */}
                  <p className={cn(
                    'text-[10px] font-black uppercase tracking-[0.2em] text-center font-mono transition-all duration-300',
                    isSelected ? 'text-pink-400' : 'text-white/30'
                  )}>
                    {isSelected ? 'SELECTED ★' : 'TAP TO SELECT'}
                  </p>
                </div>
              </div>

              {/* Glow Effect for Selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Fallback */}
      {availableSlots.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No tickets available for this tier</p>
        </div>
      )}

      {/* ===== Purchase Drawer ===== */}
      {selectedTicketIndex !== null && !purchaseSuccess && (
        <div className="fixed bottom-40 left-0 right-0 max-w-md mx-auto z-50 px-4">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden">
            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-gray-400 font-mono uppercase">Ready to buy</p>
                <p className="text-black font-black text-xl font-mono">
                  TKT-{String(selectedTicketIndex).padStart(5, '0')}
                </p>
              </div>

              <button
                onClick={handlePurchase}
                disabled={isPurchasing || balance < tier.price}
                className={cn(
                  'relative overflow-hidden bg-brand-primary text-black font-black py-3.5 px-6 rounded-xl transition-all active:scale-95',
                  (isPurchasing || balance < tier.price) && 'opacity-50 cursor-not-allowed',
                )}
              >
                {isPurchasing ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span>Buy {formatNGN(tier.price)}</span>
                )}
              </button>
            </div>
          </div>
          {balance < tier.price && (
            <p className="text-xs text-brand-danger text-center mt-2 font-bold">Insufficient balance</p>
          )}
        </div>
      )}

      {/* Post‑Purchase CTA */}
      {purchaseSuccess && (
        <div className="fixed bottom-10 left-0 right-0 max-w-md mx-auto z-50 px-4">
          <button
            onClick={onBack}
            className="w-full bg-brand-primary text-black rounded-2xl py-4 flex items-center justify-center gap-2 font-bold shadow-lg hover:bg-brand-primary/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            View My Tickets
          </button>
        </div>
      )}
    </div>
  );
});

TicketSelector.displayName = 'TicketSelector';