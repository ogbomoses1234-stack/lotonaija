import { memo } from 'react';
import { useWalletStore } from '@/store';
import { formatNGN } from '@/utils/formatters';

export const BalancePanel = memo(() => {
  const { balance } = useWalletStore();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white p-6 shadow-sm">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_30%_20%,#6AD09D,transparent_70%)]" />

      {/* Header */}
      <div className="relative flex items-center gap-2 mb-4">
        <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
        <p className="text-gray-400 text-[10px] font-black font-mono uppercase tracking-widest">
          Wallet Overview
        </p>
      </div>

      {/* Balance */}
      <div className="relative">
        <p className="text-xs text-gray-500 font-medium mb-1">
          Available Balance
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl text-brand-primary font-extrabold">₦</span>
          <span className="text-5xl font-black text-gray-900 tracking-tight tabular-nums">
            {formatNGN(balance, { showSymbol: false })}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 font-mono uppercase tracking-wider">
          Updated just now
        </p>
      </div>

      {/* Divider */}
      <div className="relative my-5 border-t border-dashed border-gray-200" />

      {/* Stats */}
      <div className="relative grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white border border-gray-100 p-3 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-1">
            Pending
          </p>
          <p className="text-base font-bold text-gray-900">₦0.00</p>
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 shadow-sm">
          <p className="text-[10px] text-amber-600 uppercase tracking-wider font-mono mb-1">
            Total Won
          </p>
          <p className="text-base font-bold text-amber-700">₦5,000</p>
        </div>
      </div>
    </div>
  );
});

BalancePanel.displayName = 'BalancePanel';