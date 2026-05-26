import { memo } from 'react';

export const PrivacyPage = memo(() => (
  <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 select-none">
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
      <h1 className="text-2xl font-black text-gray-900 mb-2 font-mono uppercase tracking-wider">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Your data is encrypted and never shared with third parties.
      </p>
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>
          We collect minimal data required to verify your identity, process payments,
          and comply with NLRC regulations.
        </p>
        <h3 className="text-gray-900 font-bold mt-4">1. Data Collection</h3>
        <p>
          Phone number, bank details, and transaction history are stored securely
          using AES-256 encryption.
        </p>
        <h3 className="text-gray-900 font-bold mt-4">2. Your Rights</h3>
        <p>
          You may request data export or account deletion at any time via Settings.
        </p>
      </div>
    </div>
  </div>
));

export default PrivacyPage;