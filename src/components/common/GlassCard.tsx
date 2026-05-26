import { memo, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type GlassCardProps = {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: 'none' | 'light' | 'medium' | 'heavy';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'md' | 'lg' | 'xl' | 'card';
  interactive?: boolean;
  onClick?: () => void;
  role?: string;
  'aria-label'?: string;
};

/**
 * Clean, light‑theme card – replaces the dark glassmorphism look.
 * White background, subtle border, optional shadow, and rounded corners.
 */
export const GlassCard = memo(
  ({
    children,
    className,
    border = 'medium',
    shadow = 'md',
    rounded = 'card',
    interactive = false,
    onClick,
    role,
    'aria-label': ariaLabel,
  }: GlassCardProps) => {
    const borderClasses = {
      none: '',
      light: 'border border-gray-100',
      medium: 'border border-gray-200',
      heavy: 'border-2 border-gray-300',
    }[border];

    const shadowClasses = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-sm', // subtle enough for white cards
      lg: 'shadow-md',
    }[shadow];

    const roundedClasses = {
      md: 'rounded-xl',
      lg: 'rounded-2xl',
      xl: 'rounded-3xl',
      card: 'rounded-3xl', // default card corner
    }[rounded];

    const baseClasses = cn(
      'bg-white',
      borderClasses,
      shadowClasses,
      roundedClasses,
      'transition-all duration-200',
    );

    const interactiveClasses = interactive
      ? 'cursor-pointer hover:border-brand-primary hover:shadow-md active:scale-[0.98]'
      : '';

    const combinedClasses = cn(baseClasses, interactiveClasses, className);

    const Element = onClick || interactive ? 'button' : 'div';

    return (
      <Element
        className={combinedClasses}
        onClick={onClick}
        role={role}
        aria-label={ariaLabel}
        type={Element === 'button' ? 'button' : undefined}
      >
        {children}
      </Element>
    );
  },
);

GlassCard.displayName = 'GlassCard';
export default GlassCard;