import { memo } from 'react';

export const HowItWorks = memo(() => {
  const steps = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      title: 'Choose Your Tier',
      description: 'Select from Royal Daily, Duke Hourly, or King Monthly jackpot tiers.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Place Your Bet',
      description: 'Every ₦100 bet earns you a King Monthly Jackpot ticket automatically.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Win Big',
      description: 'Players with the most tickets have the highest chances of winning.',
    },
  ];

  return (
    <div className="relative overflow-hidden  border border-gray-200 bg-white shadow-sm p-6 flex flex-col gap-8 w-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
          <p className="text-gray-400 text-[10px] font-black font-mono uppercase tracking-widest">
            Game Rules
          </p>
        </div>
        <h3 className="text-3xl font-black tracking-tight text-gray-900">
          How It Works
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          Our rebranded Virtual Jackpots provide you with an exciting opportunity to win fantastic prizes anytime when you play our Virtual Football games! It works on a{' '}
          <span className="text-gray-900 font-bold">raffle-based draw concept</span>, where players with the most tickets have the highest chances of securing the pot.
        </p>
      </div>

      {/* Special Rule Callout: King Monthly */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-amber-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-gray-900 font-bold text-sm tracking-wide">The King Monthly Draw</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              This specific Jackpot draws every hour of the day. Whatever pot value the Jackpot has reached during that hour, the{' '}
              <span className="text-amber-600 font-semibold">full amount is awarded to 1 lucky winner</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Timeline Steps */}
      <div className="mt-2">
        <div className="space-y-6 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-6 bottom-6 w-[1px] bg-gradient-to-b from-gray-300 via-gray-200 to-transparent -translate-x-1/2" />

          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-5 group">
              <div className="relative w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 z-10 group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-colors duration-300">
                <span className="text-gray-500 group-hover:text-brand-primary transition-colors duration-300">
                  {step.icon}
                </span>
              </div>

              <div className="pt-1.5 pb-2">
                <p className="text-gray-900 font-bold text-sm mb-1 group-hover:text-brand-primary transition-colors duration-300">
                  {step.title}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[260px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-2 p-4 rounded-xl bg-brand-primary/5 border-l-4 border-brand-primary">
        <p className="text-gray-700 text-xs leading-relaxed">
          <span className="text-gray-900 font-bold">BetKing self-funds</span> a percentage of the stake of all player bets to the prize pool, provided entirely at{' '}
          <span className="text-gray-900 font-bold">no extra cost</span> to you.
        </p>
      </div>
    </div>
  );
});

HowItWorks.displayName = 'HowItWorks';