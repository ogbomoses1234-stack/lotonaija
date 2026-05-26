import { memo } from 'react';
import { useAuthStore } from '@/store';
import { GlassCard } from '@/components/common/GlassCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { cn } from '@/utils/cn';

export const ProfileCenter = memo(() => {
  const { user, actions } = useAuthStore();

  return (
    <div className="safe-area pt-20 pb-24 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-white">My Account</h1>
      
      {user && (
        <GlassCard className="p-4 space-y-4">
          <div>
            <p className="text-xs text-white/50">Phone</p>
            <p className="text-white font-medium">{user.phone}</p>
          </div>
          <div>
            <p className="text-xs text-white/50">Account Name</p>
            <p className="text-white font-medium">{user.accountName}</p>
          </div>
          <div>
            <p className="text-xs text-white/50">Bank</p>
            <p className="text-white font-medium">{user.bankName} ({user.bankCode})</p>
          </div>
          <div>
            <p className="text-xs text-white/50">KYC Status</p>
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
              user.kycStatus === 'verified' ? "bg-emerald-500/20 text-emerald-400" :
              user.kycStatus === 'pending' ? "bg-amber-500/20 text-amber-400" :
              "bg-red-500/20 text-red-400"
            )}>
              {user.kycStatus.toUpperCase()}
            </span>
          </div>
        </GlassCard>
      )}

      <PrimaryButton variant="ghost" fullWidth onClick={actions.logout}>
        Log Out
      </PrimaryButton>
    </div>
  );
});

ProfileCenter.displayName = 'ProfileCenter';
export default ProfileCenter;