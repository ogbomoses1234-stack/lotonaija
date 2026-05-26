import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { cn } from '@/utils/cn';
import { HapticTrigger } from '@/components/ui/HapticTrigger';

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
  const { actions, isAuthenticated } = useAuthStore();
  useState(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
    }
  });

  const handleLogout = () => {
    // 1. Clear all persisted auth data
    useAuthStore.persist.clearStorage();
    
    // 2. Execute store logout (removes token, resets state)
    actions.logout();
    
    // 3. Close menu
    onClose();
    
    // 4. Navigate to auth page, replacing history to prevent back-button loops
    navigate('/auth', { replace: true });
  };
  const menuItems: MenuItem[] = [
    { icon: '🔔', label: 'Notifications', route: '/notifications', badge: 3 },
    { icon: '📊', label: 'Results & Stats', route: '/stats' },
    { icon: '👥', label: 'Referral Program', route: '/referrals' },
    { icon: '🛡️', label: 'Security & Privacy', route: '/security' },
    { icon: '⚙️', label: 'App Settings', route: '/settings' },
  ];

  const handleMenuItemClick = (route?: string) => {
    if (navigator.vibrate) navigator.vibrate(10);
    if (route) {
      navigate(route);
      onClose();
    }
  };

 
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99]"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}
      
      {/* Side Menu */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[100] overflow-y-auto",
        "glass-panel border-r border-white/20",
        "transform transition-transform duration-300 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none" />
        
        {/* Header */}
        <div className="relative z-10 p-6 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white font-mono tracking-tight">
                LOTTO<span className="text-brand-primary">NAIJA</span>
              </h1>
              <p className="text-[10px] text-white/50 font-mono uppercase tracking-wider mt-0.5">
                v2.1.0 • NLRC Licensed
              </p>
            </div>
            <HapticTrigger
              as="button"
              onTrigger={onClose}
              className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </HapticTrigger>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="relative z-10 p-4 space-y-1">
          {menuItems.map((item) => (
            <HapticTrigger
              key={item.label}
              as="button"
              onTrigger={() => handleMenuItemClick(item.route)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-150",
                "hover:bg-white/5 active:bg-white/10 text-left group"
              )}
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-150">{item.icon}</span>
              <span className="flex-1 text-white/90 font-medium group-hover:text-white transition-colors">{item.label}</span>
              {item.badge && (
                <span className="bg-brand-accent text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
              )}
              <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </HapticTrigger>
          ))}
        </nav>

        {/* Wallet Balance */}
        <div className="relative z-10 p-4 mt-auto">
          <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono">Wallet Balance</p>
                <p className="text-lg font-bold text-white font-mono">
                  ₦{walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 0 })}
                </p>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  navigate('/wallet');
                }}
                className="text-[10px] text-brand-primary font-medium uppercase tracking-wider hover:text-brand-accent transition-colors"
              >
                View →
              </button>
            </div>
          </div>
        </div>

        {/* ✅ LOGOUT BUTTON */}
        <div className="p-4 pt-2">
          <HapticTrigger
            as="button"
            onTrigger={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all duration-150 font-semibold"
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