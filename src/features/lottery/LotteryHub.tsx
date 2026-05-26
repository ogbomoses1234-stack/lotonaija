import { memo, useState, useCallback } from 'react';
import { LiveTicker } from '@/layout/LiveTicker';
import { PromotionalBanner } from '@/components/PromotionalBanner';
import { JackpotCard } from '@/components/JackpotCard';
import { HowItWorks } from '@/components/HowItWorks';
import { JackpotWinners } from '@/components/JackpotWinners';
import { LastWinner } from '@/components/LastWinner';
import { TicketSelector } from './TicketSelector'; // ✅ Already imported
import { TierSelector } from './TierSelector';
 
import type { Tier } from '@/types/lottery.types';
import { LOTTERY_TIERS } from '@/config/lottery.config';

export const LotteryHub = memo(() => {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [showTickets, setShowTickets] = useState(false);

  const handleTierSelect = useCallback((tier: Tier) => {
    setSelectedTier(tier);
    setShowTickets(true);
  }, []);

  const handleBackToTiers = useCallback(() => {
    setShowTickets(false);
    setSelectedTier(null);
  }, []);

  // ✅ REMOVE: handleTicketPurchase is no longer needed
  // TicketSelector now handles purchase via store directly

  return (
    <div className="safe-area pb-24 space-y-6 px-0 select-none text-white">
      <LiveTicker />

      {!showTickets ? (
        <>
          <PromotionalBanner />

          {/* Core Navigation Grid */}
          <div className="space-y-4 px-4">
            <h2 className="text-left text-white text-base font-black uppercase tracking-wider font-mono">
              ★ Pick Your Play
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'My Tickets', icon: '🎫', to: '/tickets' },
                { label: 'Winners', icon: '🏆', to: '/tickets' },
                { label: 'Results', icon: '📊', to: '/tickets' }
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => window.location.href = item.to} // ✅ Simple nav for demo
                  className="glass-panel p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all shadow-md group"
                >
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <span className="font-bold text-xs tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick-Select Horizontal Card Carousel */}
          <div className="space-y-2">
            <h3 className="px-4 font-black text-base uppercase tracking-wider font-mono">
              ⚡ Quick Select Tier
            </h3>
            <TierSelector onTierSelect={handleTierSelect} />
          </div>

          {/* Detailed Vertical Jackpot Pools */}
          <div className="space-y-4">
            <h3 className="px-4 font-black text-base uppercase tracking-wider font-mono">
              🔥 Live Draw Pools
            </h3>
            <div className="space-y-3.5">
              {LOTTERY_TIERS.map((tier) => ( 
                <div key={tier.id}>
                  <JackpotCard
                    tier={tier}
                    isSelected={selectedTier?.id === tier.id}
                    onClick={() => handleTierSelect(tier)}
                    currentTickets={tier.baseTicketsSold}
                    totalTickets={1000}
                  />
                </div>
              ))} 
            </div>
          </div>

          {/* Information Divisions */}
          <div className="space-y-6">
            <HowItWorks />
            <JackpotWinners />
            <LastWinner />
          </div>
        </>
      ) : (
        // ✅ FIX: Render TicketSelector with required props
        <div className="w-full animate-fade-in">
          {selectedTier && (
            <TicketSelector
              tier={selectedTier}
              onBack={handleBackToTiers}
            />
          )}
        </div>
      )}
    </div>
  );
});

LotteryHub.displayName = 'LotteryHub';
export default LotteryHub;