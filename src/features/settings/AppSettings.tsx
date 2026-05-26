
import { memo, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { GlassCard } from '@/components/common/GlassCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';

type SettingSection = {
  title: string;
  items: Array<{
    id: string;
    label: string;
    type: 'toggle' | 'select' | 'info';
    value?: string | boolean;
    options?: string[];
    description?: string;
  }>;
};
export const AppSettings = memo(() => {
  const navigate = useNavigate();
  const { actions, isAuthenticated } = useAuthStore();
 
 
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    useAuthStore.persist.clearStorage();
    actions.logout();
    navigate('/auth', { replace: true });
  };

  const [settings, setSettings] = useState({
    notifications: true,
    haptics: true,
    darkMode: true,
    language: 'English',
    currency: 'NGN',
    dataSaver: false
  });

  const sections: SettingSection[] = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          label: 'Push Notifications',
          type: 'toggle',
          value: settings.notifications,
          description: 'Receive alerts for wins, draws, and promos'
        },
        {
          id: 'haptics',
          label: 'Haptic Feedback',
          type: 'toggle',
          value: settings.haptics,
          description: 'Vibrate on button taps and wins'
        },
        {
          id: 'darkMode',
          label: 'Dark Mode',
          type: 'toggle',
          value: settings.darkMode,
          description: 'Always use dark theme'
        }
      ]
    },
    {
      title: 'Regional',
      items: [
        {
          id: 'language',
          label: 'Language',
          type: 'select',
          value: settings.language,
          options: ['English', 'Yoruba', 'Igbo', 'Hausa']
        },
        {
          id: 'currency',
          label: 'Currency',
          type: 'select',
          value: settings.currency,
          options: ['NGN']
        }
      ]
    },
    {
      title: 'Data',
      items: [
        {
          id: 'dataSaver',
          label: 'Data Saver Mode',
          type: 'toggle',
          value: settings.dataSaver,
          description: 'Reduce data usage by limiting animations'
        }
      ]
    }
  ];
 
  const toggleSetting = (id: string) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  const updateSelect = (id: string, value: string) => {
    setSettings(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="safe-area pt-20 pb-24 px-4 space-y-4 select-none text-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
        <h1 className="text-xl font-black text-white font-mono uppercase tracking-wider">
          App Settings
        </h1>
      </div>

      {/* Settings Sections */}
      {sections.map((section) => (
        <GlassCard key={section.title} className="p-4 zigzag-bottom">
          <h3 className="font-bold text-white font-mono uppercase tracking-wider text-sm mb-4">
            {section.title}
          </h3>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-white text-sm">{item.label}</p>
                  {item.description && (
                    <p className="text-xs text-white/60 mt-1">{item.description}</p>
                  )}
                </div>
                
                {item.type === 'toggle' && (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.value as boolean}
                      onChange={() => toggleSetting(item.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                )}
                
                {item.type === 'select' && (
                  <select
                    value={item.value as string}
                    onChange={(e) => updateSelect(item.id, e.target.value)}
                    className="bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  >
                    {item.options?.map((opt) => (
                      <option key={opt} value={opt} className="bg-base-dark">
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      ))}

      {/* App Info */}
      <GlassCard className="p-4 zigzag-bottom text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-accent/30 flex items-center justify-center mx-auto mb-4 border border-white/20">
          <span className="text-2xl">🎰</span>
        </div>
        <h3 className="font-bold text-white">LottoNaija</h3>
        <p className="text-xs text-white/60 font-mono mt-1">Version 2.1.0</p>
        <p className="text-[10px] text-white/40 mt-2">
          © 2024 LottoNaija • NLRC Licensed • Play Responsibly
        </p>
      </GlassCard>

      {/* Actions */}
    <div className="space-y-3">
        <PrimaryButton fullWidth variant="ghost">
          Clear Cache
        </PrimaryButton>
        {/* ✅ WIRED UP LOGOUT BUTTON */}
        <PrimaryButton 
          fullWidth 
          variant="ghost" 
          className="text-red-400 border-red-500/30 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          Log Out
        </PrimaryButton>
      </div>
    </div>
  );
});

AppSettings.displayName = 'AppSettings';
export default AppSettings;