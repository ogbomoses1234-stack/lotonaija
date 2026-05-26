import { memo, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type TooltipWarningProps = {
  children: ReactNode;
  message: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
  className?: string;
  icon?: ReactNode;
};

/**
 * Temporary tooltip warning that auto-dismisses
 * Used for validation feedback like "Maximum 6 numbers allowed"
 */
export const TooltipWarning = memo(({
  children,
  message,
  position = 'top',
  duration = 2000,
  className,
  icon
}: TooltipWarningProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const showTooltip = () => {
    setIsVisible(true);
    if (duration > 0) {
      setTimeout(() => setIsVisible(false), duration);
    }
  };
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };
  
  const arrowClasses = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-amber-500',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-amber-500',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-amber-500',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-amber-500'
  };
  
  return (
    <div className={cn('relative inline-block', className)}>
      <div
        onMouseEnter={showTooltip}
        onFocus={showTooltip}
        className="inline-block"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-3 py-2 rounded-lg',
            'bg-brand-accent text-slate-900 text-xs font-medium',
            'whitespace-nowrap shadow-lg shadow-amber-900/30',
            'animate-[slide-up_0.2s_ease-out]',
            positionClasses[position],
            'pointer-events-none'
          )}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-1.5">
            {icon || (
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{message}</span>
          </div>
          
          {/* Arrow */}
          <div 
            className={cn(
              'absolute w-2 h-2 bg-brand-accent rotate-45',
              arrowClasses[position]
            )}
          />
        </div>
      )}
    </div>
  );
});

TooltipWarning.displayName = 'TooltipWarning';

export default TooltipWarning;