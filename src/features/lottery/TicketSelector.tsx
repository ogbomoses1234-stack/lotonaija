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
  const ticketStore = useTicketStore();
  const { balance } = useWalletStore();
  
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // ✅ DEBUG: Log props on mount
  useEffect(() => {
    console.log('🎫 TicketSelector mounted with tier:', tier);
  }, [tier]);

  const totalSlots = tier.id === 'tier-1' ? 20 : tier.id === 'tier-2' ? 15 : 10;
  const availableSlots = Array.from({ length: totalSlots }, (_, i) => i + 1);

  const handleSlotClick = (index: number) => {
    console.log('👆 Slot clicked:', index);
    setSelectedTicketIndex(index);
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
      
      // ✅ Sync store state before purchase
      ticketStore.actions.setTier(tier.id);
      useTicketStore.setState({ selectedNumbers: ticketNumbers });
      
      const success = await ticketStore.actions.purchase();
      
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
    <div className="w-full pb-32 select-none relative min-h-[600px] bg-base-dark">
      {/* ✅ Simplified ambient orbs - ensure they don't block content */}
      <div className="fixed top-20 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-40 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-4 relative z-20">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2.5 px-3 py-2 -ml-3 rounded-xl hover:bg-white/5 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-wider text-white/70 uppercase font-mono">Back</span>
        </button>
        
        <div className="text-right">
          <p className="text-pink-400 text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-1">
            {tier.name}
          </p>
          <p className="text-white font-black text-2xl tracking-tight bg-clip-text bg-gradient-to-r from-white to-white/60">
            {formatNGN(tier.price)}
          </p>
        </div>
      </div>

      {/* HUD Panel */}
      <div className="relative z-20 px-4 mb-8">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
            </span>
            <div>
              <p className="text-white font-bold text-sm">Select Ticket Slot</p>
              <p className="text-white/40 text-[11px] font-mono">TAP TO SECURE ENTRY</p>
            </div>
          </div>
          <div className="text-right bg-white/5 px-3 py-1.5 rounded-lg">
            <p className="text-white font-black font-mono text-lg">{availableSlots.length}</p>
            <p className="text-white/40 text-[9px] font-bold uppercase">Remaining</p>
          </div>
        </div>
      </div>

      {/* ✅ Success Feedback Banner */}
      {purchaseSuccess && (
        <div className="fixed top-20 left-0 right-0 max-w-md mx-auto z-50 px-4 animate-slide-up">
          <div className="glass-panel bg-brand-success/20 border-brand-success/40 border rounded-2xl p-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-brand-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="text-white font-bold text-sm">Ticket Purchased!</p>
              <p className="text-white/70 text-xs">Check My Tickets to view</p>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Ticket Grid - Simplified for visibility */}
      <div className="grid grid-cols-2 gap-4 gap-y-5 px-4 relative z-20">
        {availableSlots.map((slotIndex) => {
          const isSelected = selectedTicketIndex === slotIndex;
          const ticketNumber = `TKT-${String(slotIndex).padStart(5, '0')}`;
          
          return (
            <div 
              key={slotIndex}
              className={cn(
                "relative transition-all duration-300",
                isSelected ? "scale-[1.03] ring-2 ring-pink-500/50" : "hover:scale-[1.02]",
                "bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border border-white/10 rounded-xl p-4"
              )}
            >
              {/* ✅ Removed complex CSS masking for now - use simple border instead */}
              <button
                onClick={() => handleSlotClick(slotIndex)}
                disabled={isPurchasing}
                className="w-full text-left"
              >
                {/* Top Banner */}
                <div className="border-b border-dashed border-white/10 pb-3 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-widest text-white/30 uppercase font-mono">VIP PASS</span>
                    <div className={cn("w-1.5 h-1.5 rounded-full", isSelected ? "bg-pink-400 animate-pulse" : "bg-white/10")} />
                  </div>
                  <p className={cn("text-xs font-mono font-black tracking-widest mt-1", isSelected ? "text-pink-300" : "text-white/80")}>
                    #{ticketNumber.replace('TKT-', '')}
                  </p>
                </div>

                {/* Body */}
                <div className="py-4 text-center">
                  <span className="text-[8px] font-bold text-white/30 tracking-[0.2em] uppercase font-mono mb-2 block">POTENTIAL</span>
                  <div className={cn("text-xl font-black tracking-tighter", isSelected ? "text-pink-400" : "text-white/90")}>
                    {formatNGN(tier.price)}
                  </div>
                  <div className="mt-2 inline-flex items-center justify-center px-2 py-0.5 rounded bg-black/40 border border-white/5">
                    <p className="text-[8px] font-bold text-white/50 font-mono uppercase">Pool: {tier.pool.toLocaleString()}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-dashed border-white/10">
                  <p className={cn("text-[9px] text-center font-black font-mono tracking-[0.2em] uppercase", isSelected ? "text-pink-400" : "text-white/20")}>
                    {isSelected ? 'SELECTED ★' : 'TAP TO SELECT'}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* ✅ Fallback if grid is empty */}
      {availableSlots.length === 0 && (
        <div className="text-center py-12 text-white/50">
          <p>No tickets available for this tier</p>
        </div>
      )}

      {/* Purchase Drawer */}
      {selectedTicketIndex !== null && !purchaseSuccess && (
        <div className="fixed bottom-10 left-0 right-0 max-w-md mx-auto z-50 px-4">
          <div className="rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-white/50 font-mono uppercase">Ready</p>
                <p className="text-white font-black text-xl font-mono">
                  TKT-{String(selectedTicketIndex).padStart(5, '0')}
                </p>
              </div>
              
              <button
                onClick={handlePurchase}
                disabled={isPurchasing || balance < tier.price}
                className={cn(
                  "relative overflow-hidden bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-3.5 px-6 rounded-xl transition-all active:scale-95",
                  (isPurchasing || balance < tier.price) && "opacity-50 cursor-not-allowed"
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
            <p className="text-xs text-red-400 text-center mt-2">Insufficient balance</p>
          )}
        </div>
      )}

      {/* Post-Purchase: View Tickets Button */}
      {purchaseSuccess && (
        <div className="fixed bottom-10 left-0 right-0 max-w-md mx-auto z-50 px-4">
          <button
            onClick={onBack}
            className="w-full glass-panel bg-brand-success/20 border-brand-success/40 border rounded-2xl py-4 flex items-center justify-center gap-2 text-white font-bold"
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