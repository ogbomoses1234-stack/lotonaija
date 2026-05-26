import { memo, useState } from 'react'; 
import { GlassCard } from '@/components/common/GlassCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { QuickCopyButton } from '@/features/arcade/QuickCopyButton';
import { SocialShareIcon } from '@/features/arcade/SocialShareIcon';
import { formatNGN } from '@/utils/formatters';
import { AFFILIATE_CONFIG } from '@/utils/constants';

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
    pendingPayout: 2500
  });

  const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;
  const shareMessage = `Join LottoNaija with my code ${referralCode} and get ${AFFILIATE_CONFIG.bonusForFirstDeposit} NGN bonus! Earn ${AFFILIATE_CONFIG.commissionRate * 100}% commission on every play. #LottoNaija`;

  const socialPlatforms = [
    { 
      id: 'whatsapp', 
      name: 'WhatsApp', 
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + referralLink)}`
    },
    { 
      id: 'twitter', 
      name: 'Twitter', 
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(referralLink)}`
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
    }
  ];

  return (
    <div className="safe-area pt-20 pb-24 px-4 space-y-4 select-none text-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
        <h1 className="text-xl font-black text-white font-mono uppercase tracking-wider">
          Referral Program
        </h1>
      </div>

      {/* Hero Card */}
      <GlassCard className="p-6 zigzag-bottom relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-accent/30 flex items-center justify-center mx-auto mb-4 border border-white/20">
            <span className="text-3xl">👥</span>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">Invite Friends, Earn Cash</h2>
          <p className="text-sm text-white/60">
            Get <span className="text-brand-accent font-bold">{AFFILIATE_CONFIG.commissionRate * 100}%</span> commission on every play
          </p>
        </div>

        {/* Referral Code */}
        <div className="glass-panel p-4 rounded-2xl mb-4">
          <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono mb-2">Your Code</p>
          <div className="flex items-center justify-between">
            <p className="font-mono font-bold text-white text-xl">{referralCode}</p>
            <QuickCopyButton text={referralCode} label="Code" />
          </div>
        </div>

        {/* Referral Link */}
        <div className="glass-panel p-4 rounded-2xl mb-6">
          <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono mb-2">Referral Link</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs text-white/80 bg-white/5 px-3 py-2 rounded-lg truncate font-mono">
              {referralLink}
            </code>
            <QuickCopyButton text={referralLink} label="Link" className="px-3 py-1.5 text-xs" />
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
            />
          ))}
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4 text-center zigzag-bottom">
          <p className="text-2xl font-bold text-brand-primary">{stats.totalClicks}</p>
          <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono">Link Clicks</p>
        </GlassCard>
        <GlassCard className="p-4 text-center zigzag-bottom">
          <p className="text-2xl font-bold text-brand-success">{stats.signups}</p>
          <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono">New Users</p>
        </GlassCard>
        <GlassCard className="p-4 text-center zigzag-bottom">
          <p className="text-2xl font-bold text-brand-accent">{formatNGN(stats.totalEarned, { showDecimals: false })}</p>
          <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono">Total Earned</p>
        </GlassCard>
        <GlassCard className="p-4 text-center zigzag-bottom">
          <p className="text-2xl font-bold text-brand-transfer">{formatNGN(stats.pendingPayout, { showDecimals: false })}</p>
          <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono">Pending</p>
        </GlassCard>
      </div>

      {/* How It Works */}
      <GlassCard className="p-4 zigzag-bottom">
        <h3 className="font-bold text-white font-mono uppercase tracking-wider text-sm mb-4">
          How It Works
        </h3>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Share Your Link', desc: 'Send your referral code to friends via WhatsApp, Twitter, or copy link' },
            { step: 2, title: 'They Sign Up', desc: 'Your friend registers and verifies their account' },
            { step: 3, title: 'You Earn', desc: `Get ${AFFILIATE_CONFIG.commissionRate * 100}% commission on every ticket they buy` }
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-brand-primary">{item.step}</span>
              </div>
              <div>
                <p className="font-bold text-white text-sm">{item.title}</p>
                <p className="text-xs text-white/60 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Claim Button */}
      {stats.pendingPayout > 0 && (
        <PrimaryButton variant="success" fullWidth>
          Claim {formatNGN(stats.pendingPayout, { showDecimals: false })}
        </PrimaryButton>
      )}

      {/* Terms */}
      <p className="text-[10px] text-white/40 text-center font-mono uppercase tracking-wider">
        Commission paid weekly. Bonus credited on first deposit.
      </p>
    </div>
  );
});

ReferralProgram.displayName = 'ReferralProgram';
export default ReferralProgram;