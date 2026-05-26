import { memo } from 'react';

export const ResponsibleGamingPage = memo(() => (
  <div className="safe-area pt-20 pb-24 px-4 select-none text-white">
    <div className="glass-card p-6 zigzag-bottom relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-600/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="relative z-10">
        <h1 className="text-2xl font-black text-white mb-2 font-mono uppercase tracking-wider">Responsible Play</h1>
        <p className="text-sm text-white/60 mb-6">Gaming should be fun. Play within your limits.</p>
        <div className="space-y-4 text-white/80 text-sm leading-relaxed">
          <p>LottoNaija is committed to promoting safe and responsible gaming practices.</p>
          <h3 className="text-white font-bold mt-4">1. Self-Exclusion</h3>
          <p>Set daily deposit limits or temporarily pause your account in App Settings.</p>
          <h3 className="text-white font-bold mt-4">2. Support Resources</h3>
          <p>If you feel gaming is affecting your wellbeing, contact the National Gambling Helpline at <span className="text-brand-primary font-bold">0800-GAMBLE</span>.</p>
        </div>
      </div>
    </div>
  </div>
));
export default ResponsibleGamingPage;