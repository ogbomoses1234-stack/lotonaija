import { memo, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { GlassCard } from '@/components/common/GlassCard';
import { formatNGN } from '@/utils/formatters';
import { arcadeApi } from '@/api/arcade.api';
import type { AffiliateMetric } from '@/types/arcade.types';
import { PrimaryButton } from '@/components/common/PrimaryButton';

/**
 * High-impact statistical text element parsing global commission metrics
 * Triggers payout allocations directly back into user wallet stores
 */
export const AffiliateScoreboard = memo(() => {
  const [metrics, setMetrics] = useState<AffiliateMetric | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await arcadeApi.getReferralStats();
        setMetrics(data);
      } catch (err) {
        console.error('Failed to fetch affiliate metrics:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const handleClaim = async () => {
    if (!metrics?.pendingPayout || isClaiming) return;
    
    setIsClaiming(true);
    try {
      const { data } = await arcadeApi.claimCommission();
      if (data.success) {
        setMetrics(prev => prev ? { 
          ...prev, 
          pendingPayout: 0,
          totalCommission: prev.totalCommission + data.claimedAmount
        } : null);
      }
    } catch (err) {
      console.error('Failed to claim commission:', err);
    } finally {
      setIsClaiming(false);
    }
  };

  if (isLoading) {
    return (
      <GlassCard className="p-4 my-4 zigzag-bottom relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-600/5 blur-[60px] pointer-events-none" />
        <div className="animate-pulse space-y-4 relative z-10">
          <div className="h-4 bg-white/10 rounded w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </GlassCard>
    );
  }

  if (!metrics) {
    return (
      <GlassCard className="p-4 my-4 text-center text-white/50 zigzag-bottom">
        <p className="text-sm">Unable to load affiliate stats.</p>
      </GlassCard>
    );
  }

  const canClaim = metrics.pendingPayout > 0 && !isClaiming;

  return (
    <GlassCard className="p-4 my-4 space-y-4 zigzag-bottom relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <h3 className="font-semibold text-white">Affiliate Dashboard</h3>
        </div>
        {canClaim && (
          <span className="chip chip-warning text-[10px] px-2 py-0.5">Pending Payout</span>
        )}
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        <div className="glass-panel p-3 rounded-xl text-center bg-white/[0.02] border border-white/10">
          <p className="text-2xl font-bold text-white">{metrics.clicks}</p>
          <p className="text-[10px] text-white/60 font-mono uppercase tracking-wider">Link Clicks</p>
        </div>
        <div className="glass-panel p-3 rounded-xl text-center bg-white/[0.02] border border-white/10">
          <p className="text-2xl font-bold text-brand-success">{metrics.signups}</p>
          <p className="text-[10px] text-white/60 font-mono uppercase tracking-wider">New Users</p>
        </div>
        <div className="glass-panel p-3 rounded-xl text-center bg-white/[0.02] border border-white/10">
          <p className="text-2xl font-bold text-brand-accent">
            {formatNGN(metrics.totalCommission, { showDecimals: false })}
          </p>
          <p className="text-[10px] text-white/60 font-mono uppercase tracking-wider">Total Earned</p>
        </div>
        <div className="glass-panel p-3 rounded-xl text-center bg-white/[0.02] border border-white/10">
          <p className={cn(
            "text-2xl font-bold",
            metrics.pendingPayout > 0 ? "text-brand-transfer" : "text-white/40"
          )}>
            {formatNGN(metrics.pendingPayout, { showDecimals: false })}
          </p>
          <p className="text-[10px] text-white/60 font-mono uppercase tracking-wider">Pending</p>
        </div>
      </div>

      {/* Conversion rate */}
      <div className="glass-panel p-3 rounded-xl flex items-center justify-between bg-white/[0.02] border border-white/10 relative z-10">
        <span className="text-sm text-white/80 font-mono uppercase tracking-wider text-[10px]">Conversion Rate</span>
        <span className="text-lg font-bold text-brand-primary font-mono">
          {(metrics.conversionRate * 100).toFixed(1)}%
        </span>
      </div>

      {/* Claim button */}
      {canClaim ? (
        <PrimaryButton 
          variant="success" 
          fullWidth 
          loading={isClaiming}
          onClick={handleClaim}
          className="relative z-10"
        >
          Claim {formatNGN(metrics.pendingPayout, { showDecimals: false })}
        </PrimaryButton>
      ) : (
        <PrimaryButton variant="ghost" fullWidth disabled className="relative z-10">
          {metrics.pendingPayout === 0 
            ? 'No pending payouts' 
            : 'Payouts processed weekly'}
        </PrimaryButton>
      )}

      {/* Referral code preview */}
      <div className="text-center pt-2 border-t border-white/10 relative z-10">
        <p className="text-[10px] text-white/50 font-mono uppercase tracking-wider">
          Your code: <span className="font-mono text-white font-bold">{metrics.referralCode}</span>
        </p>
      </div>
    </GlassCard>
  );
});

AffiliateScoreboard.displayName = 'AffiliateScoreboard';