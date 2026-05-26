import { memo, type ReactNode, useCallback } from 'react';
import { cn } from '@/utils/cn';

export type HapticTriggerProps = {
  children: ReactNode;
  onTrigger?: () => void;
  pattern?: number | number[];
  disabled?: boolean;
  className?: string;
  as?: 'button' | 'div' | 'span';
};

/**
 * Wrapper component that triggers haptic feedback on interaction
 * Falls back gracefully on unsupported devices
 */
export const HapticTrigger = memo(({
  children,
  onTrigger,
  pattern = 15, // Default: light tap
  disabled = false,
  className,
  as = 'button'
}: HapticTriggerProps) => {
  const triggerHaptic = useCallback(() => {
    // Vibration API with fallback
    if (navigator.vibrate && !disabled) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Silently fail on unsupported contexts
      }
    }
    onTrigger?.();
  }, [onTrigger, pattern, disabled]);
  
  const commonProps = {
    className: cn('cursor-pointer', className),
    onClick: triggerHaptic,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerHaptic();
      }
    },
    role: as === 'button' ? 'button' : undefined,
    tabIndex: as === 'button' ? 0 : undefined,
    'aria-disabled': disabled || undefined
  };
  
  const Element = as;
  
  return (
    <Element {...commonProps}>
      {children}
    </Element>
  );
});

HapticTrigger.displayName = 'HapticTrigger';

export default HapticTrigger;