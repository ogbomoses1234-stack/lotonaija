import { memo } from 'react';

export const ResponsibleGamingPage = memo(() => (
  <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 select-none">
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
      <h1 className="text-2xl font-black text-gray-900 mb-2 font-mono uppercase tracking-wider">
        Responsible Play
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Gaming should be fun. Play within your limits.
      </p>
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>
          LottoNaija is committed to promoting safe and responsible gaming practices.
        </p>
        <h3 className="text-gray-900 font-bold mt-4">1. Self-Exclusion</h3>
        <p>
          Set daily deposit limits or temporarily pause your account in App Settings.
        </p>
        <h3 className="text-gray-900 font-bold mt-4">2. Support Resources</h3>
        <p>
          If you feel gaming is affecting your wellbeing, contact the National
          Gambling Helpline at{' '}
          <span className="text-brand-primary font-bold">0800-GAMBLE</span>.
        </p>
      </div>
    </div>
  </div>
));

export default ResponsibleGamingPage;