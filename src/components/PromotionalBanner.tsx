import { memo } from 'react';

export const PromotionalBanner = memo(() => {
  const prizeBreakdown = [
    { tier: 'King Monthly', amount: '₦50,000,000', winners: 1, color: 'text-yellow-300' },
    { tier: 'Duke Hourly', amount: '₦5,000,000', winners: 3, color: 'text-purple-300' },
    { tier: 'Royal Daily', amount: '₦500,000', winners: 10, color: 'text-green-300' },
  ];

  const recentWins = [
    { name: 'Chukwudi O.', prize: '₦5,000,000', time: '2h ago' },
    { name: 'Fatima A.', prize: '₦500,000', time: '45m ago' },
    { name: 'Emeka P.', prize: '₦1,200,000', time: '1h ago' },
  ];

  return (
    <div className="relative overflow-visible mt-2 mb-6">
      {/* Outmost wrapper – no solid border, uses fading gradient bars */}
      <div className="relative overflow-hidden shadow-[0_10px_40px_rgba(147,51,234,0.4)] zigzag-bottom bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900">
        
        {/* ----- Fading top border (yellow → transparent) ----- */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white-400 to-transparent z-30 pointer-events-none" />
        
        {/* ----- Fading bottom border (yellow → transparent) ----- */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white-400 to-transparent z-30 pointer-events-none" />

        <div className="p-6 pt-8 pb-12 relative overflow-hidden">
          {/* Spotlights & Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-yellow-400/20 rounded-full blur-[60px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/30 rounded-full blur-[50px] pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-[40px] pointer-events-none animate-bounce" />

          {/* Floating SVG Assets */}
          <svg className="absolute top-4 right-6 w-10 h-10 opacity-20 animate-[spin_6s_linear_infinite] select-none text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c-1.5 0-3 1-3 3 0 .6.2 1.1.5 1.5C8.5 6.2 7.5 6 6.5 6 4 6 2 8 2 10.5S4 15 6.5 15c.5 0 1-.1 1.5-.3.2.8.5 1.5 1 2H9c-1.5 0-3 1-3 3s1.5 3 3 3 3-1 3-3c0-.6-.2-1.1-.5-1.5.5.2 1 .3 1.5.3 1.5 0 3-1 3-3s-1.5-3-3-3c-.5 0-1 .1-1.5.3-.2-.8-.5-1.5-1-2H15c1.5 0 3-1 3-3s-1.5-3-3-3c-.5 0-1 .1-1.5.3C13.2 3.1 12.6 2 12 2z"/>
          </svg>

          <svg className="absolute bottom-10 left-4 w-12 h-12 opacity-10 -rotate-12 select-none text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>

          <svg className="absolute top-1/3 left-10 w-8 h-8 opacity-15 animate-pulse select-none text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>

          <svg className="absolute bottom-1/4 right-10 w-6 h-6 opacity-15 animate-[bounce_3s_infinite] select-none text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5L17.5 12 12 17.5 6.5 12 12 5.5z"/>
          </svg>

          <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* LEFT: Main Copy & CTA */}
            <div className="flex-1 pr-2 relative w-full">
              {/* Live Draw Status Badge */}
              <div className="inline-flex items-center gap-2 bg-black/60 border border-yellow-400/40 rounded-full px-3 py-1.5 mb-4 shadow-[0_0_15px_rgba(255,215,0,0.2)] backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black font-mono tracking-widest text-yellow-300 uppercase">
                  Draw Closing Soon — Play Now
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2 uppercase tracking-tighter font-mono drop-shadow-xl">
                Win the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 block text-5xl md:text-6xl animate-pulse mt-1 filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                 LOTTO
                </span>
                <span className="text-brand">NAIJA</span>
              </h1>

              <p className="text-purple-100 text-xs font-bold leading-relaxed max-w-[280px] mt-3 mb-2 bg-black/20 p-2 rounded-lg border border-white/10">
                Every ₦100 bet earns you automatic entry. More tickets = higher win chances!
              </p>

              {/* Prize Pool Breakdown */}
              <div className="grid grid-cols-3 gap-2 mb-4 max-w-[320px]">
                {prizeBreakdown.map((tier) => (
                  <div
                    key={tier.tier}
                    className="bg-white/5 border border-white/10 rounded-lg p-2 text-center backdrop-blur-sm"
                  >
                    <p className={`text-[9px] font-black uppercase tracking-wider ${tier.color} mb-1`}>
                      {tier.tier}
                    </p>
                    <p className="text-white font-black text-xs">{tier.amount}</p>
                    <p className="text-white/40 text-[8px] font-mono mt-0.5">
                      {tier.winners} winner{tier.winners > 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total Prize Pool Banner */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-400/30 rounded-full px-4 py-1.5 mb-4">
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] font-black font-mono tracking-widest text-yellow-300 uppercase">
                  Total Prize Pool: Over ₦100M Monthly
                </span>
              </div>

              <button className="bg-gradient-to-b from-yellow-300 to-yellow-600 text-black font-black text-xs md:text-sm tracking-widest uppercase py-3.5 px-6 rounded-xl border-b-4 border-yellow-800 shadow-[0_0_20px_rgba(255,215,0,0.4)] transform active:scale-95 hover:scale-105 transition-all duration-200 flex items-center gap-2 w-full md:w-auto justify-center group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Get Your Tickets Now
              </button>
            </div>

            {/* MIDDLE: Recent Winners Feed */}
            <div className="w-full lg:w-48 flex-shrink-0">
              <div className="bg-black/30 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="text-[10px] font-black font-mono tracking-widest text-yellow-300 uppercase">
                    Recent Wins
                  </span>
                </div>
                <div className="space-y-2">
                  {recentWins.map((win, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-white/80 font-medium truncate mr-2">{win.name}</span>
                      <span className="text-green-400 font-bold">{win.prize}</span>
                      <span className="text-white/30 text-[8px] ml-1">{win.time}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[8px] text-white/30 mt-2 text-center font-mono uppercase tracking-wider">
                  New winners every hour
                </p>
              </div>
            </div>

            {/* RIGHT: Lotto Balls Graphic */}
            <div className="relative flex-shrink-0 w-full lg:w-auto h-32 lg:h-full mt-6 lg:mt-0 select-none pointer-events-none">
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 border border-white/20 rounded-full shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-[2px] items-center justify-center z-0 hidden lg:flex" />

              <div className="relative z-10 flex lg:block justify-center items-center h-full w-full gap-2 lg:gap-0">
                {[
                  { num: 7, color: 'from-red-500 to-red-800', pos: 'lg:absolute lg:-top-2 lg:-left-6', anim: 'animate-[bounce_2s_infinite]' },
                  { num: 21, color: 'from-blue-400 to-blue-700', pos: 'lg:absolute lg:top-12 lg:left-14', anim: 'animate-[bounce_2.5s_infinite_0.5s]' },
                  { num: 77, color: 'from-green-400 to-green-700', pos: 'lg:absolute lg:-bottom-2 lg:-left-0', anim: 'animate-[bounce_3s_infinite_1s]' },
                  { num: 99, color: 'from-purple-400 to-purple-800', pos: 'lg:absolute lg:bottom-8 lg:right-4', anim: 'animate-[bounce_2.2s_infinite_0.2s]' },
                  { num: '₦', color: 'from-yellow-300 to-orange-500', pos: 'lg:absolute lg:top-2 lg:-right-4 scale-110 z-20', anim: 'animate-[bounce_1.8s_infinite]' },
                ].map((ball, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br ${ball.color} shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.6),0_10px_15px_rgba(0,0,0,0.4)] border-2 border-white/20 flex items-center justify-center ${ball.pos} ${ball.anim}`}
                  >
                    <div className="w-7 h-7 lg:w-8 lg:h-8 bg-white rounded-full flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                      <span className={`font-black text-sm lg:text-base font-mono ${ball.num === '₦' ? 'text-orange-600' : 'text-gray-900'}`}>
                        {ball.num}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Stats Strip */}
          <div className="relative z-10 mt-6 grid grid-cols-3 gap-2">
            {[
              { label: 'Players Online', value: '12,847', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )},
              { label: 'Tickets Sold Today', value: '45,921', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              )},
              { label: 'Won This Month', value: '₦28.5M', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )},
            ].map((stat) => (
              <div key={stat.label} className="bg-black/20 border border-white/5 rounded-lg p-2 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-white/40 mb-1">
                  {stat.icon}
                  <span className="text-[8px] font-mono uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-white font-black text-xs">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

PromotionalBanner.displayName = 'PromotionalBanner';