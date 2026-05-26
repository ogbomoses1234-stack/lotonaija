import { memo } from 'react';

export const TermsPage = memo(() => (
  <div className="safe-area pt-20 pb-24 px-4 select-none text-white">
    <div className="glass-card p-6 zigzag-bottom relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="relative z-10">
        <h1 className="text-2xl font-black text-white mb-2 font-mono uppercase tracking-wider">Terms & Conditions</h1>
        <p className="text-sm text-white/60 mb-6">Last updated: May 2026</p>
        <div className="space-y-4 text-white/80 text-sm leading-relaxed">
          <p>By accessing or using LottoNaija, you agree to be bound by these terms. Please read them carefully.</p>
          <h3 className="text-white font-bold mt-4">1. Eligibility</h3>
          <p>You must be at least 18 years old and a resident of Nigeria to participate.</p>
          <h3 className="text-white font-bold mt-4">2. Ticket Purchases</h3>
          <p>All purchases are final. Tickets are non-refundable once the draw closes.</p>
          <h3 className="text-white font-bold mt-4">3. Prize Distribution</h3>
          <p>Winnings are credited to your wallet within 24 hours of official draw results.</p>
        </div>
      </div>
    </div>
  </div>
));
export default TermsPage;