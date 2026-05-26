import { memo } from 'react';
import { AffiliateScoreboard } from './AffiliateScoreboard';
import { SharingDeck } from './SharingDeck';
import { InstantPlayGrid } from './InstantPlayGrid';

/**
 * Multi-panel section divided into marketing referral engines and instant play frames
 * Parent layout assembling arcade hub sections
 */
export const ArcadeLounge = memo(() => {
  const referralCode = 'LOTTO2024';
  const commissionRate = 0.10;

  return (
    <div className="safe-area pt-20 pb-24 px-4 space-y-6 select-none text-white">
      {/* Ambient page background glows */}
      <div className="fixed top-20 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-40 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Affiliate marketing section */}
      <section className="relative z-10 space-y-4">
        <div className="flex items-center gap-2 mb-1 px-2">
          <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <h2 className="text-[11px] font-black text-white/40 uppercase tracking-widest font-mono">
            Referral Program
          </h2>
        </div>
        <AffiliateScoreboard />
        <SharingDeck referralCode={referralCode} commissionRate={commissionRate} />
      </section>

      {/* Instant play games section */}
      <section className="relative z-10 space-y-4">
        <div className="flex items-center gap-2 mb-1 px-2">
          <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <h2 className="text-[11px] font-black text-white/40 uppercase tracking-widest font-mono">
            Instant Win Games
          </h2>
        </div>
        <InstantPlayGrid />
      </section>

      {/* Responsible gaming footer */}
      <div className="glass-panel p-4 rounded-2xl mt-6 text-center zigzag-bottom relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-500/5 blur-[40px] pointer-events-none" />
        <p className="text-[10px] text-white/40 leading-relaxed relative z-10">
          Play responsibly. Games are for entertainment only. 
          Must be 18+ to participate. 
          <br className="sm:hidden" />
          <a href="/terms" className="text-brand-primary underline hover:text-brand-accent transition-colors">Terms & Conditions</a>
        </p>
      </div>
    </div>
  );
});

ArcadeLounge.displayName = 'ArcadeLounge';
export default ArcadeLounge;