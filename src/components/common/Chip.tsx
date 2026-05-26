import { memo, type ReactNode } from 'react';
import { cn, chipClasses } from '@/utils/cn';

export type ChipProps = {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'transfer' | 'jackpot' | 'neutral';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  'aria-label'?: string;
};

/**
 * Status indicator chip with brand color variants
 * Variants: success (emerald), warning (amber), transfer (purple), jackpot (pulsing amber), neutral (gray)
 */
export const Chip = memo(({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  onClick,
  removable,
  onRemove,
  className,
  'aria-label': ariaLabel
}: ChipProps) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs'
  };
  
  const baseClasses = cn(
    'inline-flex items-center gap-1 rounded-full font-medium',
    'border transition-all duration-150',
    chipClasses[variant],
    sizeClasses[size],
    onClick ? 'cursor-pointer hover:opacity-90 active:scale-95' : '',
    removable ? 'pr-1' : '',
    className
  );
  
  const Element = onClick ? 'button' : 'span';
  
  return (
    <Element
      className={baseClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      type={Element === 'button' ? 'button' : undefined}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-black/20 transition-colors"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </Element>
  );
});

Chip.displayName = 'Chip';

export default Chip;