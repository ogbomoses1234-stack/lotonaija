import { memo, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { cn } from '@/utils/cn';
import { HapticTrigger } from '@/components/ui/HapticTrigger';
import { Loader } from '@/components/common/Loader';

export type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
};

type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  badge?: number;
};

export const SideMenu = memo(({ isOpen, onClose, walletBalance }: SideMenuProps) => {
  const navigate = useNavigate();

  // ✅ Access store slices directly – no nested `actions`
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const skipRedirect = useRef(false); // Prevent auto‑redirect during our manual logout

  // Redirect if already logged out (but not during our own logout flow)
  useEffect(() => {
    if (!isAuthenticated && !skipRedirect.current) {
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    // 1. Confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to log out? You will be returned to the onboarding screen.'
    );
    if (!confirmed) return;

    // 2. Block automatic redirect, show loader
    skipRedirect.current = true;
    setIsLoggingOut(true);

    try {
      // 3. Clear persisted store (optional) – logout already resets state
      useAuthStore.persist?.clearStorage?.();
      // 4. Execute the store logout
      await logout(); // ✅ Top-level function
      // 5. Keep the loader visible for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // 6. Navigate to onboarding
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      // On error, allow automatic redirect again and hide loader
      skipRedirect.current = false;
      setIsLoggingOut(false);
    }
  };

  const menuItems: MenuItem[] = [
    { icon: '🔔', label: 'Notifications', route: '/notifications', badge: 3 },
    { icon: '📊', label: 'Results & Stats', route: '/stats' },
    { icon: '👥', label: 'Referral Program', route: '/referrals' },
    { icon: '🛡️', label: 'Security & Privacy', route: '/security' },
    { icon: '⚙', label: 'App Settings', route: '/settings' },
  ];

  const handleMenuItemClick = (route?: string) => {
    if (route) {
      navigate(route);
      onClose();
    }
  };

  return (
    <>
      {/* Full‑screen logout loader overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Loader size="lg" variant="spinner" />
            <p className="text-lg font-bold text-gray-900">Logging out...</p>
            <p className="text-sm text-gray-500">
              You'll be redirected shortly.
            </p>
          </div>
        </div>
      )}

      {/* Flat High-Contrast Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99]"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Side Menu Panel – light theme */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[100] overflow-y-auto flex flex-col',
          'bg-white border-r border-gray-200 shadow-xl',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header Block */}
        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-mono tracking-tight">
                LOTTO<span className="text-brand-primary">NAIJA</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mt-0.5">
                v2.1.0 • NLRC Licensed
              </p>
            </div>
            <HapticTrigger
              as="button"
              onTrigger={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </HapticTrigger>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <HapticTrigger
              key={item.label}
              as="button"
              onTrigger={() => handleMenuItemClick(item.route)}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-150 text-left group hover:bg-gray-50"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1 text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                {item.label}
              </span>
              {item.badge && (
                <span className="bg-brand-primary text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </HapticTrigger>
          ))}
        </nav>

        {/* Wallet Area */}
        <div className="p-4 mt-auto">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Wallet Balance</p>
                <p className="text-lg font-bold text-gray-900 font-mono">
                  ₦{walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate('/wallet');
              }}
              className="text-[11px] text-brand-primary font-bold uppercase tracking-wider hover:underline transition-colors"
            >
              View →
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4 pt-0">
          <HapticTrigger
            as="button"
            onTrigger={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-all duration-150 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </HapticTrigger>
        </div>
      </div>
    </>
  );
});

SideMenu.displayName = 'SideMenu';
export default SideMenu;