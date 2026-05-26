import { memo, useEffect } from 'react';
import { useWalletStore } from '@/store';
import { BalancePanel } from './BalancePanel';
import { QuickFundGrid } from './QuickFundGrid';
import { WithdrawalPortal } from './WithdrawalPortal';
import { HistoryStatementGrid } from './HistoryStatementGrid';

export const WalletCenter = memo(() => {
  const fetchBalance = useWalletStore((s) => s.fetchBalance);
  const syncTransactions = useWalletStore((s) => s.syncTransactions);

  useEffect(() => {
    fetchBalance();
    syncTransactions();
  }, [fetchBalance, syncTransactions]);

  return (
    <div className="bg-white min-h-screen pt-16 pb-24 px-4 select-none text-gray-900">
      {/* ===== Balance Panel ===== */}
      <BalancePanel />

      {/* ===== Quick Fund Grid ===== */}
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] font-mono">
            Quick Fund
          </h2>
        </div>
        <QuickFundGrid />
      </section>

      {/* ===== Withdrawal ===== */}
      <section className="mt-8">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] font-mono mb-3 px-1">
          Manage Funds
        </h3>
        <div className="-mx-4 px-4">
          <WithdrawalPortal />
        </div>
      </section>

      {/* ===== Transaction History ===== */}
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] font-mono">
            Recent Transactions
          </h2>
        </div>
        <HistoryStatementGrid />
      </section>
    </div>
  );
});

WalletCenter.displayName = 'WalletCenter';
export default WalletCenter;