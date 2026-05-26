import { memo } from 'react';
import { useWalletStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatNGN, formatDateNG, formatTransactionType, formatTransactionAmount } from '@/utils/formatters';
import { GlassCard } from '@/components/common/GlassCard';

/**
 * Transaction history with premium card styling matching Play page
 */
export const HistoryStatementGrid = memo(() => {
  const { transactions } = useWalletStore();

  if (transactions.length === 0) {
    return (
      <GlassCard className="p-6 text-center text-white/40 zigzag-bottom relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-600/5 blur-[60px] pointer-events-none" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
            <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-sm font-medium">No transactions yet</p>
          <p className="text-xs text-white/40 mt-1">Fund your wallet to get started</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx, index) => {
        const { text, className: amountClass } = formatTransactionAmount(tx.amount, 
          tx.type.includes('win') || tx.type.includes('received') || tx.type.includes('affiliate') ? 'credit' :
          tx.type.includes('purchase') || tx.type.includes('withdrawal') || tx.type.includes('sent') ? 'debit' : 'neutral'
        );
        
        const isLatest = index === 0;
        
        return (
          <GlassCard 
            key={tx.id} 
            className={cn(
              "p-4 flex items-center justify-between hover:bg-white/5 transition-all duration-300 cursor-default relative overflow-hidden zigzag-bottom",
              isLatest && "ring-1 ring-pink-500/30 bg-gradient-to-r from-purple-500/5 to-transparent"
            )}
          >
            {/* Latest item accent line */}
            {isLatest && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 to-purple-500 rounded-l-xl" />}
            
            <div className={cn("flex-1 min-w-0 pr-3", isLatest && "pl-2")}>
              <p className={cn("text-sm font-medium truncate", isLatest ? "text-white" : "text-white/90")}>
                {formatTransactionType(tx.type)}
              </p>
              <p className="text-xs text-white/40 font-mono">
                {formatDateNG(tx.date, { relative: true })}
              </p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <p className={cn("font-bold font-mono text-sm", amountClass)}>
                {text}
              </p>
              <span className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border mt-1",
                tx.status === 'completed' ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                tx.status === 'pending' ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                "bg-red-500/20 text-red-400 border-red-500/30"
              )}>
                {tx.status === 'completed' ? '✓' : tx.status === 'pending' ? '⏳' : '✕'} {tx.status}
              </span>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
});

HistoryStatementGrid.displayName = 'HistoryStatementGrid';