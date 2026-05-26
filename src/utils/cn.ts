/**
 * Class name composition utility
 * Combines clsx and tailwind-merge for conditional Tailwind classes
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Compose class names with Tailwind conflict resolution
 * @param inputs - ClassValue arguments (strings, objects, arrays)
 * @returns Merged class string with Tailwind class conflict resolution
 * 
 * @example
 * cn('btn', 'btn-primary', { 'btn-disabled': isLoading })
 * // => 'btn btn-primary btn-disabled'
 * 
 * cn('p-4', 'p-6') 
 * // => 'p-6' (tailwind-merge resolves padding conflict)
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Conditional class builder for component variants
 */
export const variantClasses = (
  base: string,
  variants: Record<string, string>,
  activeVariant?: string,
  additionalClasses?: ClassValue
): string => {
  return cn(
    base,
    activeVariant ? variants[activeVariant] : '',
    additionalClasses
  );
};

/**
 * State-based class composition for interactive elements
 */
export const stateClasses = (
  base: string,
  states: {
    hover?: string;
    active?: string;
    focus?: string;
    disabled?: string;
    selected?: string;
  },
  state: {
    isHovered?: boolean;
    isActive?: boolean;
    isFocused?: boolean;
    isDisabled?: boolean;
    isSelected?: boolean;
  },
  additionalClasses?: ClassValue
): string => {
  return cn(
    base,
    state.isHovered && states.hover,
    state.isActive && states.active,
    state.isFocused && states.focus,
    state.isDisabled && states.disabled,
    state.isSelected && states.selected,
    additionalClasses
  );
};

/**
 * Glassmorphism class preset generator
 */
export const glassClasses = (
  options: {
    blur?: 'sm' | 'md' | 'lg' | 'xl';
    border?: 'none' | 'light' | 'medium' | 'heavy';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    rounded?: 'md' | 'lg' | 'xl' | 'card';
  } = {}
): string => {
  const {
    blur = 'md',
    border = 'medium',
    shadow = 'md',
    rounded = 'card'
  } = options;
  
  return cn(
    'bg-white/10 backdrop-blur-' + blur,
    border === 'none' ? '' : `border border-white/${border === 'light' ? '10' : border === 'medium' ? '20' : '30'}`,
    shadow === 'none' ? '' : `shadow-${shadow} shadow-black/30`,
    rounded === 'card' ? 'rounded-[30px]' : `rounded-${rounded}`
  );
};

/**
 * Brand color class presets
 */
export const brandClasses = {
  primary: 'bg-brand-primary hover:bg-blue-700 active:bg-blue-800',
  success: 'bg-brand-success hover:bg-emerald-600 active:bg-emerald-700',
  accent: 'bg-brand-accent hover:bg-amber-600 active:bg-amber-700 text-slate-900',
  transfer: 'bg-brand-transfer hover:bg-purple-600 active:bg-purple-700',
  ghost: 'bg-transparent border border-white/20 hover:bg-white/5 active:bg-white/10'
} as const;

/**
 * Chip status class presets
 */
export const chipClasses = {
  success: 'bg-brand-success/20 text-brand-success border border-brand-success/30',
  warning: 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30',
  transfer: 'bg-brand-transfer/20 text-brand-transfer border border-brand-transfer/30',
  jackpot: 'bg-brand-accent/30 text-brand-accent border border-brand-accent/50 animate-pulse',
  neutral: 'bg-white/10 text-white/80 border border-white/20'
} as const;

export default cn;