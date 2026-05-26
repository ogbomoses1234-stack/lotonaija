import { memo } from 'react';
import { cn } from '@/utils/cn';
import { GlassCard } from '@/components/common/GlassCard';
import { QuickCopyButton } from './QuickCopyButton';
import { SocialShareIcon } from './SocialShareIcon';
import { AFFILIATE_CONFIG } from '@/utils/constants';

export type SharingDeckProps = {
  referralCode: string;
  commissionRate: number;
};

/**
 * Interactive component showing referral strings with social distribution URLs
 * Maps to web fallback distribution for WhatsApp, Twitter, Facebook
 */
export const SharingDeck = memo(({ referralCode, commissionRate }: SharingDeckProps) => {
  const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;
  const shareMessage = `Join LottoNG with my code ${referralCode} and get ${AFFILIATE_CONFIG.bonusForFirstDeposit} NGN bonus! Earn ${commissionRate * 100}% commission on every play. #LottoNG`;

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
    <GlassCard className="p-4 my-4 space-y-4 zigzag-bottom relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-pink-600/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <h3 className="font-semibold text-white font-mono uppercase tracking-wider text-sm">Share & Earn</h3>
        </div>
        <span className="text-xs text-brand-accent font-bold font-mono">
          {commissionRate * 100}% Commission
        </span>
      </div>
      
      {/* Referral code display */}
      <div className="glass-panel p-3 rounded-xl flex items-center justify-between bg-white/[0.02] border border-white/10 relative z-10">
        <div>
          <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono">Your Code</p>
          <p className="font-mono font-bold text-white text-lg">{referralCode}</p>
        </div>
        <QuickCopyButton text={referralCode} label="Code" />
      </div>
      
      {/* Referral link */}
      <div className="glass-panel p-3 rounded-xl bg-white/[0.02] border border-white/10 relative z-10">
        <p className="text-[10px] text-white/60 mb-2 font-mono uppercase tracking-wider">Referral Link</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs text-white/80 bg-white/5 px-3 py-2 rounded-lg truncate font-mono">
            {referralLink}
          </code>
          <QuickCopyButton text={referralLink} label="Link" className="px-3 py-1.5 text-xs" />
        </div>
      </div>
      
      {/* Social share buttons */}
      <div className="flex gap-2 relative z-10">
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
      
      {/* Terms footnote */}
      <p className="text-[10px] text-white/40 text-center font-mono uppercase tracking-wider relative z-10">
        Commission paid weekly. Bonus credited on first deposit.
      </p>
    </GlassCard>
  );
});

SharingDeck.displayName = 'SharingDeck';