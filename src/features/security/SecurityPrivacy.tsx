import { memo, useState } from 'react';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { InputField } from '@/components/common/InputField';
import { useAuthStore } from '@/store';
 
type SecurityItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode; // changed from string
  enabled: boolean;
  actionable?: boolean;
};

export const SecurityPrivacy = memo(() => {
  const { user } = useAuthStore();
  const [items, setItems] = useState<SecurityItem[]>([
    {
      id: 'session',
      title: 'Active Sessions',
      description: 'Manage devices logged into your account',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      enabled: true,
      actionable: true,
    },
    {
      id: 'data',
      title: 'Data Privacy',
      description: 'Control how your data is used and shared',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      enabled: true,
      actionable: true,
    },
  ]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
        <h1 className="text-2xl font-black font-mono uppercase tracking-wider text-gray-900">
          Security & Privacy
        </h1>
      </div>

      {/* Account Info Card */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border border-brand-primary/30 flex items-center justify-center">
            {/* User icon replacing 👤 */}
            <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900">{user?.accountName || 'Chukwudi O.'}</p>
            <p className="text-xs text-gray-500 font-mono">{user?.phone || '+234******755'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <p className="text-base font-bold text-brand-primary">Verified</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mt-0.5">
              KYC Status
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <p className="text-base font-bold text-brand-primary">Active</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mt-0.5">
              Account
            </p>
          </div>
        </div>
      </div>

      {/* Security Toggles */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => toggleItem(item.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
                {item.actionable && (
                  <button className="text-[10px] font-medium text-brand-primary mt-2 uppercase tracking-wider hover:underline">
                    Configure →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Change Password */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5">
        <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider font-mono mb-4">
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
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border-2 border-dashed border-red-200 bg-red-50/30 p-5">
        <h3 className="font-bold text-sm text-red-600 uppercase tracking-wider font-mono mb-2">
          Danger Zone
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <PrimaryButton
          fullWidth
          variant="ghost"
          className="!text-red-600 !border-red-200 hover:!bg-red-50"
        >
          Delete Account
        </PrimaryButton>
      </div>
    </div>
  );
});

SecurityPrivacy.displayName = 'SecurityPrivacy';
export default SecurityPrivacy;