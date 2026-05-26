import { memo } from 'react';

export const TermsPage = memo(() => (
  <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 select-none">
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
      <h1 className="text-2xl font-black text-gray-900 mb-2 font-mono uppercase tracking-wider">
        Terms & Conditions
      </h1>
      <p className="text-sm text-gray-500 mb-6">Last updated: May 2026</p>
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>
          By accessing or using LottoNaija, you agree to be bound by these terms.
          Please read them carefully.
        </p>
        <h3 className="text-gray-900 font-bold mt-4">1. Eligibility</h3>
        <p>
          You must be at least 18 years old and a resident of Nigeria to participate.
        </p>
        <h3 className="text-gray-900 font-bold mt-4">2. Ticket Purchases</h3>
        <p>
          All purchases are final. Tickets are non-refundable once the draw closes.
        </p>
        <h3 className="text-gray-900 font-bold mt-4">3. Prize Distribution</h3>
        <p>
          Winnings are credited to your wallet within 24 hours of official draw results.
        </p>
      </div>
    </div>
  </div>
));

export default TermsPage;