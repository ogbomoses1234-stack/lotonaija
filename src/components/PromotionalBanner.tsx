import { memo } from 'react';

export const PromotionalBanner = memo(() => {
  return (
    <div className="relative overflow-hidden   shadow-xl zigzag-bottom">
      {/* Background configured with semantic design system fallbacks instead of arbitrary hex clusters */}
      <div className="bg-gradient-to-br from-brand-purple via-brand-secondary to-brand-accent p-6 pb-12">
        
        {/* Ambient Radial Lights */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-12 w-32 h-32 bg-black/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1 pr-2">
            <div className="inline-block bg-white/20 border border-white/30 rounded px-2 py-0.5 mb-2.5">
              <span className="text-[9px] font-black font-mono tracking-widest text-white uppercase">
                INSTANT DRAW
              </span>
            </div>
            
            <h1 className="text-2xl font-black text-white leading-tight mb-2 uppercase tracking-tight font-mono">
              Deposit and Play{' '}
              <span className="text-white drop-shadow-md block text-3xl font-black animate-pulse">NOW!</span>
            </h1>
            <p className="text-white/90 text-xs font-medium leading-relaxed max-w-[220px]">
              Secure instant verification credits for non-stop gaming action.
            </p>
            
            <button className="mt-5 btn-accent text-xs tracking-wider uppercase py-3 px-6 rounded-xl transition-all duration-200 transform active:scale-95">
              ⚡ DEPOSIT NOW
            </button>
          </div>
          
          {/* Coin Component Group */}
          <div className="relative flex-shrink-0 pt-4 select-none pointer-events-none">
            <div className="relative">
              <div className="space-y-0.5 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-4.5 bg-gradient-to-b from-amber-300 to-orange-500 rounded-sm shadow-md border-b border-orange-600/40"
                    style={{
                      transform: `translateY(${i * -1.5}px)`,
                      filter: `brightness(${1 - i * 0.06})`
                    }}
                  />
                ))}
              </div>
              
               <div 
                className="absolute -left-5 -bottom-1 w-14 h-14 bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 rounded-full shadow-lg border-2 border-amber-300 z-20 flex items-center justify-center"
                style={{ transform: 'rotate(-12deg)' }}
              >
                <div className="w-10 h-10 border border-dashed border-white/40 rounded-full flex items-center justify-center">
                  <span className="text-white/90 font-black text-sm font-mono">₦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PromotionalBanner.displayName = 'PromotionalBanner';