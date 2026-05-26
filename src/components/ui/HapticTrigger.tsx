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
 * Wrapper component that triggers haptic feedback on interaction.
 * Falls back gracefully on unsupported devices.
 * Includes a focus‑visible ring for keyboard accessibility (light‑theme friendly).
 */
export const HapticTrigger = memo(
  ({
    children,
    onTrigger,
    pattern = 15,
    disabled = false,
    className,
    as = 'button',
  }: HapticTriggerProps) => {
    const triggerHaptic = useCallback(() => {
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
      className: cn(
        'cursor-pointer',
        // Accessible focus ring (visible on both light/dark backgrounds)
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        className,
      ),
      onClick: triggerHaptic,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerHaptic();
        }
      },
      role: as === 'button' ? 'button' : undefined,
      tabIndex: as === 'button' ? 0 : undefined,
      'aria-disabled': disabled || undefined,
    };

    const Element = as;

    return <Element {...commonProps}>{children}</Element>;
  },
);

HapticTrigger.displayName = 'HapticTrigger';
export default HapticTrigger;