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
  const { actions: authActions } = useAuthStore();
  const { actions: walletActions } = useWalletStore();

  useEffect(() => {
    // Initialize stores on first mount
    const init = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await authActions.fetchProfile();
        await walletActions.fetchBalance();
      }
    };
    init();
  }, [authActions, walletActions]);

  return (
    <div className={`relative ${!isOnline ? 'offline' : ''}`}>
      <OfflineBanner />
    
      {/* Routes render here via GlobalShell -> Outlet */}
    </div>
  );
};