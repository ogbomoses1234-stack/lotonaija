import { memo, useState } from 'react';
import { useAuthStore, useWalletStore } from '@/store';
// ✅ REMOVED: import { cn } from '@/utils/cn'; // Unused
import { formatNGN } from '@/utils/formatters';
import { SideMenu } from './SideMenu';

export const GlassHeader = memo(() => {
  const { user } = useAuthStore(); // ✅ Kept for potential future use (e.g., show name)
  const { balance } = useWalletStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-panel px-4 py-3 flex items-center justify-between">
          {/* Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="text-center">
            <h1 className="text-xl font-bold text-white tracking-tight">
              LOTTO<span className="text-brand">NAIJA</span>
            </h1>
            <p className="text-[10px] text-white/60 uppercase tracking-wider">Licensed • Secure • Fair</p>
          </div>

          {/* Wallet Balance - Now Dynamic */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            {formatNGN(balance)}
          </div>
        </div>
      </header>

      {/* Side Menu */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        walletBalance={balance} // ✅ Pass dynamic balance
      />
    </>
  );
});

GlassHeader.displayName = 'GlassHeader';