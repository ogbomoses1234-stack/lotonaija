import { memo, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Loader } from './Loader';

export type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'success' | 'accent' | 'transfer' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
};

/**
 * Primary action button with green brand colors and loading state
 * Variants: primary (emerald), success (emerald-dark), accent (amber), transfer (violet), ghost (solid outline)
 */
export const PrimaryButton = memo(({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  className,
  'aria-label': ariaLabel
}: PrimaryButtonProps) => {
  const variantClasses = {
    // ✅ Green primary theme
    primary: 'bg-brand-primary hover:bg-brand-primary-dark active:bg-brand-primary/90 text-black font-bold shadow-solid-md',
    success: 'bg-brand-success hover:bg-emerald-700 active:bg-emerald-800 text-black font-bold',
    accent: 'bg-brand-accent hover:bg-amber-600 active:bg-amber-700 text-black font-bold',
    transfer: 'bg-brand-transfer hover:bg-violet-600 active:bg-violet-700 text-white',
    // ✅ Solid ghost variant (no glass)
    ghost: 'bg-transparent border-2 border-brand-primary/30 hover:bg-brand-primary/10 active:bg-brand-primary/20 text-brand-primary font-semibold'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };
  
  const baseClasses = cn(
    'font-semibold transition-all duration-150 flex items-center justify-center gap-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-base-dark',
    'active:scale-[0.98]', // ✅ Subtle press effect
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    loading ? 'pointer-events-none' : '',
    className
  );
  
  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={disabled || loading}
    >
      {loading && <Loader size={size === 'sm' ? 'sm' : 'md'} className="text-inherit" />}
      <span className={loading ? 'sr-only' : ''}>{children}</span>
      {loading && <span aria-hidden="true">{children}</span>}
    </button>
  );
});

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;