import { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { LiveTicker } from '@/layout/LiveTicker';
import { PromotionalBanner } from '@/components/PromotionalBanner';
import { JackpotCard } from '@/components/JackpotCard';
import { HowItWorks } from '@/components/HowItWorks';
import { JackpotWinners } from '@/components/JackpotWinners';
import { LastWinner } from '@/components/LastWinner';
import { TicketSelector } from './TicketSelector';
import { TierSelector } from './TierSelector';

import type { Tier } from '@/types/lottery.types';
import { LOTTERY_TIERS } from '@/config/lottery.config';

const NAV_ITEMS = [
  {
    label: 'My Tickets',
    icon: '🎫',
    to: '/tickets',
  },
  {
    label: 'Winners',
    icon: '🏆',
    to: '/winners',
  },
  {
    label: 'Results',
    icon: '📊',
    to: '/results',
  },
];

const SectionHeader = ({ title }: { title: string }) => (
  <div className="px-4">
    <h3 className="font-black text-[11px] uppercase tracking-[0.18em] text-gray-400">
      {title}
    </h3>
  </div>
);

const NavigationCard = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      border-border-light
      bg-base-container
      p-4
      active:scale-[0.97]
      transition-all
      duration-200
      hover:border-brand-primary
      hover:shadow-md
    "
  >
    <div
      className="
        mx-auto
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        border
        border-border-light
        bg-gray-50
        transition-transform
        duration-200
        group-hover:scale-105
      "
    >
      <span className="text-2xl">{icon}</span>
    </div>

    <p
      className="
        mt-3
        text-center
        text-[11px]
        font-extrabold
        uppercase
        tracking-wide
        text-gray-500
        transition-colors
        group-hover:text-black
      "
    >
      {label}
    </p>
  </button>
);

export const LotteryHub = memo(() => {
  const navigate = useNavigate();

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

  return (
    <main
      className="
        safe-area
        bg-base-body
        pb-24
        text-black
      "
    >
      <LiveTicker />

      {!showTickets ? (
        <div className="space-y-7 pb-10 animate-fade-in">
          {/* Hero Banner */}
          <PromotionalBanner />

          {/* Navigation */}
          <section className="space-y-4">
            <SectionHeader title="Quick Access" />

            <div className="grid grid-cols-3 gap-3 px-4">
              {NAV_ITEMS.map((item) => (
                <NavigationCard
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  onClick={() => navigate(item.to)}
                />
              ))}
            </div>
          </section>

          {/* Tier Selector */}
          <section className="space-y-3">
            <SectionHeader title="Quick Pick Tiers" />

            <TierSelector onTierSelect={handleTierSelect} />
          </section>

          {/* Jackpot Pools */}
          <section className="space-y-4">
            <SectionHeader title="Live Jackpot Pools" />

            <div className="space-y-4">
              {LOTTERY_TIERS.map((tier) => (
                <div key={tier.id} className="px-4">
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
          </section>

          {/* Social Proof / Info */}
          <section className="space-y-6">
            <HowItWorks />

            <JackpotWinners />

            <LastWinner />
          </section>
        </div>
      ) : (
        <section className="animate-slide-up px-4 py-4">
          {selectedTier && (
            <TicketSelector
              tier={selectedTier}
              onBack={handleBackToTiers}
            />
          )}
        </section>
      )}
    </main>
  );
});

LotteryHub.displayName = 'LotteryHub';

export default LotteryHub;