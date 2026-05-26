import { useEffect } from 'react';
import { OfflineBanner } from './layout/OfflineBanner';
import { useWalletStore } from './store/wallet.store';
import { useAuthStore } from './store/auth.store';
import { useNetwork } from './hooks/useNetwork';

/**
 * Root application provider & state initializer
 * Handles hydration, network listeners, and global UI overlays
 */
export const App = () => {
  const { isOnline } = useNetwork();

  // ✅ Access store functions directly (no nested `actions` object)
  const fetchProfile = useAuthStore((s) => s.fetchProfile);
  const fetchBalance = useWalletStore((s) => s.fetchBalance);

  useEffect(() => {
    // Initialize stores on first mount
    const init = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetchProfile();
        await fetchBalance();
      }
    };
    init();
  }, [fetchProfile, fetchBalance]);

  return (
    <div className={`relative ${!isOnline ? 'offline' : ''}`}>
      <OfflineBanner />
      {/* Routes render here via GlobalShell -> Outlet */}
    </div>
  );
};