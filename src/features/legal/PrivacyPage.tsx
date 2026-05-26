import { memo } from 'react';

export const PrivacyPage = memo(() => (
  <div className="safe-area pt-20 pb-24 px-4 select-none text-white">
    <div className="glass-card p-6 zigzag-bottom relative overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-pink-600/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="relative z-10">
        <h1 className="text-2xl font-black text-white mb-2 font-mono uppercase tracking-wider">Privacy Policy</h1>
        <p className="text-sm text-white/60 mb-6">Your data is encrypted and never shared with third parties.</p>
        <div className="space-y-4 text-white/80 text-sm leading-relaxed">
          <p>We collect minimal data required to verify your identity, process payments, and comply with NLRC regulations.</p>
          <h3 className="text-white font-bold mt-4">1. Data Collection</h3>
          <p>Phone number, bank details, and transaction history are stored securely using AES-256 encryption.</p>
          <h3 className="text-white font-bold mt-4">2. Your Rights</h3>
          <p>You may request data export or account deletion at any time via Settings.</p>
        </div>
      </div>
    </div>
  </div>
));
export default PrivacyPage;