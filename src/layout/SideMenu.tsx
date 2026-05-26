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
  label: string;
  route?: string;
  badge?: number;
  icon: React.ReactNode;
};

export const SideMenu = memo(({ isOpen, onClose, walletBalance }: SideMenuProps) => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const skipRedirect = useRef(false);

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
      useAuthStore.persist?.clearStorage?.();
      await logout();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      skipRedirect.current = false;
      setIsLoggingOut(false);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Notifications',
      route: '/notifications',
      badge: 3,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      label: 'Results & Stats',
      route: '/stats',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: 'Referral Program',
      route: '/referrals',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Security & Privacy',
      route: '/security',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: 'App Settings',
      route: '/settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const handleMenuItemClick = (route?: string) => {
    if (route) {
      navigate(route);
      onClose();
    }
  };

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Loader size="lg" variant="spinner" />
            <p className="text-lg font-bold text-gray-900">Logging out...</p>
            <p className="text-sm text-gray-500">You'll be redirected shortly.</p>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99]"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          'fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[100] overflow-y-auto flex flex-col',
          'bg-white border-r border-gray-200 shadow-xl',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
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

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <HapticTrigger
              key={item.label}
              as="button"
              onTrigger={() => handleMenuItemClick(item.route)}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-150 text-left group hover:bg-gray-50"
            >
              <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
                {item.icon}
              </span>
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