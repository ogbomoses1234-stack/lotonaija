import { memo } from 'react';
import { useTicketStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatNGN, formatPoolSize } from '@/utils/formatters';
import { HapticTrigger } from '@/components/ui/HapticTrigger';
import { LOTTERY_TIERS, StandardTier } from '@/config/lottery.config';

export type TierSelectorProps = {
  onTierSelect?: (tier: StandardTier) => void;
};

export const TierSelector = memo(({ onTierSelect }: TierSelectorProps) => {
  const activeTier = useTicketStore((s) => s.activeTier);
  const setTier = useTicketStore((s) => s.setTier);

  const handleTierClick = (tier: StandardTier) => {
    setTier(tier.id);
    onTierSelect?.(tier);
  };
 

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-4 px-4 scrollbar-hide snap-x">
      {LOTTERY_TIERS.map((tier) => {
        const isActive = activeTier?.id === tier.id;
        return (
          <div
            key={tier.id}
            className="flex-shrink-0 snap-center   ticket-perforation relative"
          >
            <HapticTrigger
              as="button"
              onTrigger={() => handleTierClick(tier)}
              className={cn(
                "w-[152px] h-[224px] flex flex-col justify-betweenpx-4  text-left transition-all duration-300 relative border bg-gradient-to-b backdrop-blur-md",
                tier.bgClass,
                isActive 
                  ? cn("ring-2 scale-[1.03] z-10 shadow-xl border-t-white/20", tier.ringClass, tier.glowClass)
                  : "border-white/5 opacity-80 hover:opacity-100 hover:border-white/10"
              )}
            >
              {/* Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.05]   pointer-events-none" />

              {/* Card Header */}
              <div className="w-full px-4 pt-4 pb-2 flex justify-between items-start z-10">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-black tracking-wide text-white uppercase font-sans">
                    {tier.name}
                  </span>
                  <p className="text-[8px] text-white/40 font-bold tracking-wider font-mono uppercase">
                    {tier.subName}
                  </p>
                </div>
                
                <div className="h-4 flex items-center">
                  <span className={cn(
                    "w-2 h-2 rounded-full shadow-sm transition-all duration-300",
                    isActive ? "bg-current animate-pulse" : "bg-white/10",
                    isActive && tier.accentTextClass
                  )} />
                </div>
              </div>

              {/* Main Ticket Middle Pricing Panel */}
              <div className="px-4 flex-1 flex flex-col justify-center items-start w-full z-10">
                <div className={cn("text-[8px] font-black tracking-widest uppercase font-mono px-1.5 py-0.5 rounded border mb-1.5", tier.tagBgClass)}>
                  ENTRY FEE
                </div>
                <p className="text-2xl font-black text-white tracking-tight leading-none font-sans">
                  {formatNGN(tier.price)}
                </p>
              </div>

              {/* Divider Boundary */}
              <div className="w-full border-t border-dashed border-white/10 relative my-0" />

              {/* Card Footer */}
              <div className="w-full px-4 pb-4 pt-3 mt-auto z-10 bg-black/20 rounded-b-2xl">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] font-bold text-white/40 tracking-wider font-mono">
                    ESTIMATED POOL
                  </span>
                  <p className={cn("text-sm font-black font-mono tracking-tight leading-none", tier.accentTextClass)}>
                    {formatPoolSize(tier.pool)}
                  </p>
                </div>
                
                {/* Micro Barcode Component */}
                <div className="flex gap-[1.5px] h-3 w-full mt-3 opacity-20 overflow-hidden">
                  {[1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2].map((weight, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white h-full flex-grow" 
                      style={{ maxWidth: `${weight}px` }} 
                    />
                  ))}
                </div>
              </div>
            </HapticTrigger>
          </div>
        );
      })}
    </div>
  );
});

TierSelector.displayName = 'TierSelector';