import { memo } from 'react';
import { useWalletStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatDateNG, formatTransactionType, formatTransactionAmount } from '@/utils/formatters';

export const HistoryStatementGrid = memo(() => {
  const { transactions } = useWalletStore();

  if (transactions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-sm">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-700">No transactions yet</p>
        <p className="text-xs text-gray-400 mt-1">Fund your wallet to get started</p>
      </div>
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
          <div 
            key={tx.id} 
            className={cn(
              "p-4 flex items-center justify-between rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 cursor-default relative overflow-hidden",
              isLatest && "ring-1 ring-brand-primary/20 bg-brand-primary/[0.02]"
            )}
          >
            {/* Latest item accent line */}
            {isLatest && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-l-xl" />}
            
            <div className={cn("flex-1 min-w-0 pr-3", isLatest && "pl-2")}>
              <p className={cn("text-sm font-bold truncate", isLatest ? "text-gray-900" : "text-gray-700")}>
                {formatTransactionType(tx.type)}
              </p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {formatDateNG(tx.date, { relative: true })}
              </p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <p className={cn("font-bold font-mono text-sm", amountClass)}>
                {text}
              </p>
              <span className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border mt-1",
                tx.status === 'completed' ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                tx.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-200" :
                "bg-red-50 text-red-600 border-red-200"
              )}>
                {tx.status === 'completed' ? '✓' : tx.status === 'pending' ? '⏳' : '✕'} {tx.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
});

HistoryStatementGrid.displayName = 'HistoryStatementGrid';