import { memo } from 'react';
import { cn } from '@/utils/cn';

export type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
  label?: string;
  'aria-label'?: string;
};

/**
 * Loading indicator – light theme.
 * Uses dark colours for visibility on white backgrounds.
 */
export const Loader = memo(
  ({
    size = 'md',
    variant = 'spinner',
    className,
    label,
    'aria-label': ariaLabel = 'Loading',
  }: LoaderProps) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    };

    if (variant === 'dots') {
      return (
        <div
          className={cn('flex items-center gap-1', className)}
          role="status"
          aria-label={ariaLabel}
          aria-live="polite"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'w-2 h-2 bg-gray-400 rounded-full animate-bounce',
                size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : '',
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
          {label && <span className="text-sm text-gray-700">{label}</span>}
        </div>
      );
    }

    if (variant === 'pulse') {
      return (
        <div
          className={cn('flex items-center gap-2', className)}
          role="status"
          aria-label={ariaLabel}
          aria-live="polite"
        >
          <div
            className={cn(
              'w-3 h-3 bg-brand-primary rounded-full animate-pulse',
              size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : '',
            )}
          />
          {label && <span className="text-sm text-gray-700">{label}</span>}
        </div>
      );
    }

    // Default spinner variant
    return (
      <div
        className={cn('flex items-center gap-2', className)}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
      >
        <svg
          className={cn('animate-spin text-gray-900', sizeClasses[size])}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </div>
    );
  },
);

Loader.displayName = 'Loader';
export default Loader;