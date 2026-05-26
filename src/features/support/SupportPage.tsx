import { memo } from 'react';
import { formatPhoneInternational } from '@/utils/formatters';

export const SupportPage = memo(() => (
  <div className="safe-area pt-20 pb-24 px-4 select-none text-white">
    <div className="glass-card p-6 zigzag-bottom relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="relative z-10">
        <h1 className="text-2xl font-black text-white mb-2 font-mono uppercase tracking-wider">FAQ & Support</h1>
        <p className="text-sm text-white/60 mb-6">We're here to help 24/7.</p>
        <div className="space-y-4 text-white/80 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h3 className="text-white font-bold mb-1">📧 Email Support</h3>
            <p>support@lottong.ng</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h3 className="text-white font-bold mb-1">📞 Live Chat / Phone</h3>
            <p>{formatPhoneInternational('2348012345678')}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h3 className="text-white font-bold mb-1">⏰ Operating Hours</h3>
            <p>Monday - Sunday: 8:00 AM - 10:00 PM WAT</p>
          </div>
        </div>
      </div>
    </div>
  </div>
));
export default SupportPage;