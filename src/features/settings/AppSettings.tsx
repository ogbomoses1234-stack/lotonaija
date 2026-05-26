import { memo, useEffect, useState, useRef } from 'react';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { Loader } from '@/components/common/Loader';

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

  // ✅ Access store slices directly – no nested `actions`
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const skipRedirect = useRef(false); // Prevent automatic redirect during our logout

  // Redirect if already logged out (but skip during manual logout)
  useEffect(() => {
    if (!isAuthenticated && !skipRedirect.current) {
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to log out? You will be returned to the onboarding screen.'
    );
    if (!confirmed) return;

    skipRedirect.current = true;
    setIsLoggingOut(true);

    try {
      // Clear persisted state if needed (optional, now that logout resets state)
      useAuthStore.persist?.clearStorage?.();
      await logout(); // ✅ Top-level function
      // Show loader for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      skipRedirect.current = false;
      setIsLoggingOut(false);
    }
  };

  // ----- Settings state and sections (unchanged) -----
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    language: 'English',
    currency: 'NGN',
    dataSaver: false,
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
          description: 'Receive alerts for wins, draws, and promos',
        },
      ],
    },
    {
      title: 'Regional',
      items: [
        {
          id: 'language',
          label: 'Language',
          type: 'select',
          value: settings.language,
          options: ['English', 'Yoruba', 'Igbo', 'Hausa'],
        },
        {
          id: 'currency',
          label: 'Currency',
          type: 'select',
          value: settings.currency,
          options: ['NGN'],
        },
      ],
    },
  ];

  const toggleSetting = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  const updateSelect = (id: string, value: string) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 space-y-6 select-none">
      {/* Full‑screen logout loader */}
      {isLoggingOut ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Loader size="lg" variant="spinner" />
            <p className="text-lg font-bold text-gray-900">Logging out...</p>
            <p className="text-sm text-gray-500">
              You'll be redirected shortly.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
            <h1 className="text-2xl font-black font-mono uppercase tracking-wider text-gray-900">
              App Settings
            </h1>
          </div>

          {/* Settings Sections */}
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5"
            >
              <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider font-mono mb-4">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-sm">
                        {item.label}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.type === 'toggle' && (
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={item.value as boolean}
                          onChange={() => toggleSetting(item.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                      </label>
                    )}

                    {item.type === 'select' && (
                      <select
                        value={item.value as string}
                        onChange={(e) => updateSelect(item.id, e.target.value)}
                        className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                      >
                        {item.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* App Info */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border border-brand-primary/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎰</span>
            </div>
            <h3 className="font-bold text-gray-900">LottoNaija</h3>
            <p className="text-xs text-gray-500 font-mono mt-1">Version 2.1.0</p>
            <p className="text-[10px] text-gray-400 mt-2">
              © 2024 LottoNaija • NLRC Licensed • Play Responsibly
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <PrimaryButton fullWidth variant="ghost">
              Clear Cache
            </PrimaryButton>
            <PrimaryButton
              fullWidth
              variant="ghost"
              className="!text-red-600 !border-red-200 hover:!bg-red-50"
              onClick={handleLogout}
            >
              Log Out
            </PrimaryButton>
          </div>
        </>
      )}
    </div>
  );
});

AppSettings.displayName = 'AppSettings';
export default AppSettings;