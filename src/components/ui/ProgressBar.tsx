import { memo, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

export type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'primary' | 'success' | 'accent' | 'transfer';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
  'aria-label'?: string;
};

/**
 * Material 3-style progress bar with brand color variants
 * Supports animated transitions and accessible ARIA attributes
 */
export const ProgressBar = memo(({
  value,
  max = 100,
  label,
  showValue = true,
  variant = 'primary',
  size = 'md',
  animated = true,
  className,
  'aria-label': ariaLabel
}: ProgressBarProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  // Smooth animation for value changes
  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }
    
    const start = displayValue;
    const end = value;
    const duration = 300;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutQuad
      const eased = 1 - (1 - progress) * (1 - progress);
      const currentValue = start + (end - start) * eased;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, animated, displayValue]);
  
  const percentage = Math.min(100, Math.max(0, (displayValue / max) * 100));
  
  const variantClasses = {
    primary: 'bg-brand-primary',
    success: 'bg-brand-success',
    accent: 'bg-brand-accent',
    transfer: 'bg-brand-transfer'
  };
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-xs font-medium text-white/80">{label}</span>
          )}
          {showValue && (
            <span className="text-xs font-mono text-white/60">
              {Math.round(displayValue)}/{max}
            </span>
          )}
        </div>
      )}
      
      <div 
        className={cn(
          'w-full bg-white/10 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={Math.round(displayValue)}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel || label}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;