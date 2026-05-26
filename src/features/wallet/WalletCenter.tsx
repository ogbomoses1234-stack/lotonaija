import { memo, useEffect } from 'react';
import { useWalletStore } from '@/store'; 
import { BalancePanel } from './BalancePanel';
import { QuickFundGrid } from './QuickFundGrid';
import { WithdrawalPortal } from './WithdrawalPortal';
import { HistoryStatementGrid } from './HistoryStatementGrid';

export const WalletCenter = memo(() => {
  const { actions } = useWalletStore();

  // Fetch balance on mount
  useEffect(() => {
    actions.fetchBalance();
    actions.syncTransactions();
  }, [actions]);

  return (
    // ✅ FIX: Reduced pt-20 → pt-16 (64px) to account for fixed header
    <div className="safe-area pt-16 pb-24 px-4 select-none text-white">
      {/* Ambient page background glows - repositioned to not overlap header */}
      <div className="fixed top-24 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="fixed bottom-48 left-0 w-56 h-56 bg-pink-600/10 rounded-full blur-[70px] pointer-events-none z-0" />

      {/* Balance Panel - moved up with tighter spacing */}
      <div className="relative z-10">
        <BalancePanel />
      </div>
      
      {/* Quick Actions Grid */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-2 px-1">
          <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <h2 className="text-[11px] font-black text-white/40 uppercase tracking-widest font-mono">
            Quick Access
          </h2>
        </div>
        <QuickFundGrid />
      </div>
      
      {/* Main Action Area */}
   <div className="space-y-3 relative z-10">
  {/* ✅ Header matches TierSelector pattern: px-4 + font-mono uppercase */}
  <h3 className="px-4 font-black text-base uppercase tracking-wider font-mono text-white/80">
    Manage Funds
  </h3>
  
  {/* ✅ WithdrawalPortal with -mx-4 px-4 for full-bleed alignment */}
  <div className="-mx-4 px-4">
    <WithdrawalPortal />
  </div>
</div>
      
      {/* History */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-2 px-1">
          <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <h2 className="text-[11px] font-black text-white/40 uppercase tracking-widest font-mono">
            Recent Transactions
          </h2>
        </div>
        <HistoryStatementGrid />
      </div>
    </div>
  );
});

WalletCenter.displayName = 'WalletCenter';
export default WalletCenter;