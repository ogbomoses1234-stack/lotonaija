import { memo, useState } from 'react';
import { cn } from '@/utils/cn';
import { GlassCard } from '@/components/common/GlassCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { InputField } from '@/components/common/InputField';
import { useAuthStore } from '@/store';

type SecurityItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
  actionable?: boolean;
};

export const SecurityPrivacy = memo(() => {
  const { user } = useAuthStore();
  const [items, setItems] = useState<SecurityItem[]>([
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: '🔐',
      enabled: false,
      actionable: true
    },
    {
      id: 'biometric',
      title: 'Biometric Login',
      description: 'Use fingerprint or face ID for quick access',
      icon: '👆',
      enabled: true,
      actionable: true
    },
    {
      id: 'session',
      title: 'Active Sessions',
      description: 'Manage devices logged into your account',
      icon: '📱',
      enabled: true,
      actionable: true
    },
    {
      id: 'data',
      title: 'Data Privacy',
      description: 'Control how your data is used and shared',
      icon: '🛡️',
      enabled: true,
      actionable: true
    }
  ]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  return (
    <div className="safe-area pt-20 pb-24 px-4 space-y-4 select-none text-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
        <h1 className="text-xl font-black text-white font-mono uppercase tracking-wider">
          Security & Privacy
        </h1>
      </div>

      {/* Account Info */}
      <GlassCard className="p-4 zigzag-bottom">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-accent/30 flex items-center justify-center border border-white/20">
            <span className="text-xl">👤</span>
          </div>
          <div>
            <p className="font-bold text-white">{user?.accountName || 'Chukwudi O.'}</p>
            <p className="text-xs text-white/60 font-mono">{user?.phone || '+234******755'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
            <p className="text-lg font-bold text-brand-success">Verified</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">KYC Status</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
            <p className="text-lg font-bold text-brand-primary">Active</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Account</p>
          </div>
        </div>
      </GlassCard>

      {/* Security Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <GlassCard key={item.id} className="p-4 zigzag-bottom">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-lg">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    <p className="text-xs text-white/60 mt-1">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => toggleItem(item.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
                {item.actionable && (
                  <button className="text-[10px] text-brand-primary font-medium mt-2 uppercase tracking-wider">
                    Configure →
                  </button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Change Password */}
      <GlassCard className="p-4 zigzag-bottom">
        <h3 className="font-bold text-white font-mono uppercase tracking-wider text-sm mb-4">
          Change Password
        </h3>
        <div className="space-y-3">
          <InputField
            label="Current Password"
            type="password"
            placeholder="••••••••"
          />
          <InputField
            label="New Password"
            type="password"
            placeholder="••••••••"
          />
          <InputField
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
          />
          <PrimaryButton fullWidth variant="transfer">
            Update Password
          </PrimaryButton>
        </div>
      </GlassCard>

      {/* Danger Zone */}
      <GlassCard className="p-4 zigzag-bottom border-red-500/30 bg-red-500/5">
        <h3 className="font-bold text-red-400 font-mono uppercase tracking-wider text-sm mb-2">
          Danger Zone
        </h3>
        <p className="text-xs text-white/60 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <PrimaryButton fullWidth variant="ghost" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
          Delete Account
        </PrimaryButton>
      </GlassCard>
    </div>
  );
});

SecurityPrivacy.displayName = 'SecurityPrivacy';
export default SecurityPrivacy;