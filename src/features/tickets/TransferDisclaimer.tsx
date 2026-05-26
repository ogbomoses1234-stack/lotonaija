import { memo } from 'react';
import { cn } from '@/utils/cn';

/**
 * Hard-coded layout disclaimer indicating irreversible reassignment
 */
export const TransferDisclaimer = memo(() => {
  return (
    <div className={cn(
      "bg-amber-900/30 border border-amber-500/40 rounded-[20px] p-4 mt-4",
      "flex gap-3 items-start"
    )}>
      <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
        ⚠️ <strong>IRREVERSIBLE ACTION:</strong> Physical ticket ownership will be permanently reassigned. Future winning payouts will route exclusively to the target balance ledger. This transaction cannot be undone or disputed.
      </p>
    </div>
  );
});

TransferDisclaimer.displayName = 'TransferDisclaimer';