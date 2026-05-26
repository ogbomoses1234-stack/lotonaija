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
 * Primary action button with brand colors and loading state
 * Variants: primary (blue), success (emerald), accent (amber), transfer (purple), ghost (outline)
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
    primary: 'bg-brand-primary hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg shadow-blue-900/30',
    success: 'bg-brand-success hover:bg-emerald-600 active:bg-emerald-700 text-white',
    accent: 'bg-brand-accent hover:bg-amber-600 active:bg-amber-700 text-slate-900 font-bold',
    transfer: 'bg-brand-transfer hover:bg-purple-600 active:bg-purple-700 text-white',
    ghost: 'bg-transparent border border-white/20 hover:bg-white/5 active:bg-white/10 text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-[24px]',
    md: 'px-6 py-3 text-base rounded-[30px]',
    lg: 'px-8 py-4 text-lg rounded-[30px]'
  };
  
  const baseClasses = cn(
    'font-semibold transition-all duration-150 flex items-center justify-center gap-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-base-dark',
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