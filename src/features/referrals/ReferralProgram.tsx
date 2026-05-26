import { memo, useState } from 'react';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { QuickCopyButton } from '@/features/arcade/QuickCopyButton';
import { SocialShareIcon } from '@/features/arcade/SocialShareIcon';
import { formatNGN } from '@/utils/formatters';
import { AFFILIATE_CONFIG } from '@/utils/constants';
import { cn } from '@/utils/cn';

type ReferralStats = {
  totalClicks: number;
  signups: number;
  activeReferrals: number;
  totalEarned: number;
  pendingPayout: number;
};

export const ReferralProgram = memo(() => {
  const [referralCode] = useState('LOTTO2024');
  const [stats] = useState<ReferralStats>({
    totalClicks: 247,
    signups: 18,
    activeReferrals: 12,
    totalEarned: 8500,
    pendingPayout: 2500,
  });

  const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;
  const shareMessage = `Join LottoNaija with my code ${referralCode} and get ${AFFILIATE_CONFIG.bonusForFirstDeposit} NGN bonus! Earn ${AFFILIATE_CONFIG.commissionRate * 100}% commission on every play. #LottoNaija`;

  const socialPlatforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + referralLink)}`,
    },
    {
      id: 'twitter',
      name: 'Twitter',
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(referralLink)}`,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
    },
  ];

  return (
    <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
        <h1 className="text-2xl font-black font-mono uppercase tracking-wider text-gray-900">
          Referral Program
        </h1>
      </div>

      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
        {/* Decorative line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border border-brand-primary/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👥</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Invite Friends, Earn Cash</h2>
          <p className="text-sm text-gray-500">
            Get <span className="text-brand-primary font-bold">{AFFILIATE_CONFIG.commissionRate * 100}%</span> commission on every play
          </p>
        </div>

        {/* Referral Code */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 mb-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-2">Your Code</p>
          <div className="flex items-center justify-between">
            <p className="font-mono font-bold text-gray-900 text-xl">{referralCode}</p>
            <QuickCopyButton text={referralCode} label="Code" className="!bg-white !text-gray-700 !border-gray-300" />
          </div>
        </div>

        {/* Referral Link */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 mb-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-2">Referral Link</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs text-gray-700 bg-white border border-gray-200 px-3 py-2 rounded-lg truncate font-mono">
              {referralLink}
            </code>
            <QuickCopyButton text={referralLink} label="Link" className="!bg-white !text-gray-700 !border-gray-300 px-3 py-1.5 text-xs" />
          </div>
        </div>

        {/* Social Share */}
        <div className="flex gap-2">
          {socialPlatforms.map((platform) => (
            <SocialShareIcon
              key={platform.id}
              platform={platform.id as 'whatsapp' | 'twitter' | 'facebook'}
              url={platform.url}
              color={platform.color}
              label={`Share on ${platform.name}`}
              className="!text-white !bg-current" // will be overridden by inline color; adjust if needed
            />
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Link Clicks', value: stats.totalClicks, color: 'text-brand-primary' },
          { label: 'New Users', value: stats.signups, color: 'text-brand-success' },
          { label: 'Total Earned', value: formatNGN(stats.totalEarned, { showDecimals: false }), color: 'text-brand-primary' },
          { label: 'Pending', value: formatNGN(stats.pendingPayout, { showDecimals: false }), color: 'text-amber-600' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-4 text-center"
          >
            <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5">
        <h3 className="font-black text-sm text-gray-900 uppercase tracking-wider font-mono mb-4">
          How It Works
        </h3>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Share Your Link', desc: 'Send your referral code to friends via WhatsApp, Twitter, or copy link' },
            { step: 2, title: 'They Sign Up', desc: 'Your friend registers and verifies their account' },
            { step: 3, title: 'You Earn', desc: `Get ${AFFILIATE_CONFIG.commissionRate * 100}% commission on every ticket they buy` },
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-brand-primary">{item.step}</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claim Button */}
      {stats.pendingPayout > 0 && (
        <PrimaryButton variant="success" fullWidth className="!bg-brand-primary !text-black font-bold">
          Claim {formatNGN(stats.pendingPayout, { showDecimals: false })}
        </PrimaryButton>
      )}

      {/* Terms */}
      <p className="text-[10px] text-gray-400 text-center font-mono uppercase tracking-wider">
        Commission paid weekly. Bonus credited on first deposit.
      </p>
    </div>
  );
});

ReferralProgram.displayName = 'ReferralProgram';
export default ReferralProgram;