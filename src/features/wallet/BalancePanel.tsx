import { memo } from 'react';
import { useWalletStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';
import { GlassCard } from '@/components/common/GlassCard';

export const BalancePanel = memo(() => {
  const { balance } = useWalletStore();

  return (
    <GlassCard className="relative overflow-hidden py-6 zigzag-bottom flex flex-col gap-4 w-full">
      {/* Ambient background glows - smaller and repositioned */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-pink-600/10 rounded-full blur-[50px] pointer-events-none translate-y-1/3 -translate-x-1/4" />
      
      {/* Header Section - tighter spacing */}
      <div className="relative z-10 space-y-1.5 px-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <p className="text-white/40 text-[10px] font-black font-mono uppercase tracking-widest">
            WALLET OVERVIEW
          </p>
        </div>
        <h3 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
          Available Balance
        </h3>
      </div>

      {/* Balance Display - compact styling */}
      <div className="relative z-10 p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner">
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl text-brand-primary font-bold drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]">₦</span>
          <span className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
            {formatNGN(balance, { showSymbol: false })}
          </span>
        </div>
        <p className="text-center text-[10px] text-white/40 mt-2 font-mono uppercase tracking-wider">
          Updated just now
        </p>
      </div>

      {/* Quick Stats Row - tighter grid */}
      <div className="relative z-10 grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
          <p className="text-[9px] text-white/40 uppercase tracking-wider font-mono mb-0.5">Pending</p>
          <p className="text-base font-bold text-white">₦0.00</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
          <p className="text-[9px] text-white/40 uppercase tracking-wider font-mono mb-0.5">Total Won</p>
          <p className="text-base font-bold text-amber-400">₦5,000</p>
        </div>
      </div>
    </GlassCard>
  );
});

BalancePanel.displayName = 'BalancePanel';