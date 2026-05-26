import { memo } from 'react';
import { cn } from '@/utils/cn';

export type ProcessingToastProps = {
  isVisible: boolean;
  onClose: () => void;
};

/**
 * Administrative informational processing toast overlay
 */
export const ProcessingToast = memo(({ isVisible, onClose }: ProcessingToastProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] max-w-[480px] mx-auto">
      <div className={cn(
        "glass-panel p-3 flex items-center gap-3 border-l-4 border-brand-accent",
        "bg-amber-900/80 backdrop-blur-md animate-slide-up"
      )}>
        <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-100">Withdrawal Processing</p>
          <p className="text-xs text-amber-200/80">Your request is being routed to the banking network.</p>
        </div>
        <button onClick={onClose} className="p-1 text-white/50 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
});

ProcessingToast.displayName = 'ProcessingToast';