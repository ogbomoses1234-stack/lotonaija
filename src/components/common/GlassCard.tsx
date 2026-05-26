import { memo, type ReactNode } from 'react';
import { cn, glassClasses } from '@/utils/cn';

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
 * Reusable glassmorphism card component
 * Enforces design system: bg-white/10 backdrop-blur-md border-white/20 rounded-[30px]
 */
export const GlassCard = memo(({
  children,
  className,
  blur = 'md',
  border = 'medium',
  shadow = 'md',
  rounded = 'card',
  interactive = false,
  onClick,
  role,
  'aria-label': ariaLabel
}: GlassCardProps) => {
  const baseClasses = glassClasses({ blur, border, shadow, rounded });
  
  const interactiveClasses = interactive
    ? 'cursor-pointer transition-all duration-150 active:scale-[0.98] hover:border-brand-primary/40'
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
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;