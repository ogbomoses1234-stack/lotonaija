import { memo } from 'react';
import { cn } from '@/utils/cn';

export const HowItWorks = memo(() => {
  const steps = [
    {
      icon: '🎫',
      title: 'Choose Your Tier',
      description: 'Select from Royal Daily, Duke Hourly, or King Monthly jackpot tiers.'
    },
    {
      icon: '🎰',
      title: 'Place Your Bet',
      description: 'Every ₦100 bet earns you a King Monthly Jackpot ticket automatically.'
    },
    {
      icon: '🏆',
      title: 'Win Big',
      description: 'Players with the most tickets have the highest chances of winning.'
    }
  ];

  return (
    <div className="glass-card relative overflow-hidden py-6 zigzag-bottom  flex flex-col gap-8 w-full">
      {/* Background ambient glow specific to this card */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      {/* Header Section */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-8 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <p className="text-white/40 text-[10px] font-black font-mono uppercase tracking-widest">
            Game Rules
          </p>
        </div>
        <h3 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
          How It Works
        </h3>
        <p className="text-white/60 text-sm leading-relaxed font-medium">
          Our rebranded Virtual Jackpots provide you with an exciting opportunity to win fantastic prizes anytime when you play our Virtual Football games! It works on a <span className="text-white font-bold">raffle-based draw concept</span>, where players with the most tickets have the highest chances of securing the pot.
        </p>
      </div>

      {/* Special Rule Callout: King Monthly */}
      <div className="relative z-10 p-5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-amber-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-white font-bold text-sm tracking-wide">The King Monthly Draw</h4>
            <p className="text-white/50 text-xs leading-relaxed">
              This specific Jackpot draws every hour of the day. Whatever pot value the Jackpot has reached during that hour, the <span className="text-amber-400/90 font-semibold">full amount is awarded to 1 lucky winner</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Timeline Steps */}
      <div className="relative z-10 mt-2">
        <div className="space-y-6 relative">
          {/* Vertical connecting line for timeline */}
          <div className="absolute left-6 top-6 bottom-6 w-[1px] bg-gradient-to-b from-purple-500/50 via-pink-500/20 to-transparent -translate-x-1/2" />

          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-5 group">
              {/* Icon Container */}
              <div className="relative w-12 h-12 rounded-full bg-[#060412] border border-white/10 flex items-center justify-center flex-shrink-0 z-10 group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-colors duration-300 shadow-lg">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">{step.icon}</span>
              </div>
              
              {/* Content */}
              <div className="pt-1.5 pb-2">
                <p className="text-white font-bold text-sm mb-1 group-hover:text-pink-400 transition-colors duration-300">
                  {step.title}
                </p>
                <p className="text-white/50 text-xs leading-relaxed max-w-[260px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="relative z-10 mt-2 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-l-purple-500">
        <p className="text-white/70 text-xs leading-relaxed">
          <span className="text-white font-bold">BetKing self-funds</span> a percentage of the stake of all player bets to the prize pool, provided entirely at <span className="text-white font-bold">no extra cost</span> to you.
        </p>
      </div>
    </div>
  );
});

HowItWorks.displayName = 'HowItWorks';