import { memo } from 'react';
import { formatPhoneInternational } from '@/utils/formatters';

export const SupportPage = memo(() => (
  <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 select-none">
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
      {/* Subtle decorative gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
          <h1 className="text-2xl font-black font-mono uppercase tracking-wider text-gray-900">
            FAQ & Support
          </h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">We're here to help 24/7.</p>
        
        <div className="space-y-3 text-sm leading-relaxed">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <h3 className="text-gray-900 font-bold mb-1">📧 Email Support</h3>
            <p className="text-gray-700">support@lottong.ng</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <h3 className="text-gray-900 font-bold mb-1">📞 Live Chat / Phone</h3>
            <p className="text-gray-700">{formatPhoneInternational('2348012345678')}</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <h3 className="text-gray-900 font-bold mb-1">⏰ Operating Hours</h3>
            <p className="text-gray-700">Monday - Sunday: 8:00 AM - 10:00 PM WAT</p>
          </div>
        </div>
      </div>
    </div>
  </div>
));

export default SupportPage;