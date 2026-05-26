import { memo, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type MarqueeTickerProps = {
  items: Array<{
    id: string;
    content: ReactNode;
    priority?: 'high' | 'normal' | 'low';
  }>;
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
};

/**
 * Infinite horizontal marquee – light theme.
 * White background, subtle border, dark text.
 */
export const MarqueeTicker = memo(
  ({
    items,
    speed = 'normal',
    pauseOnHover = true,
    className,
    itemClassName,
  }: MarqueeTickerProps) => {
    const speedClasses = {
      slow: 'animate-[marquee_30s_linear_infinite]',
      normal: 'animate-[marquee_20s_linear_infinite]',
      fast: 'animate-[marquee_12s_linear_infinite]',
    };

    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items];

    const priorityColors = {
      high: 'text-brand-primary font-semibold',
      normal: 'text-gray-700',
      low: 'text-gray-500',
    };

    return (
      <div
        className={cn(
          'overflow-hidden whitespace-nowrap',
          'border-y border-gray-200 bg-white',
          'py-2',
          className,
        )}
      >
        <div
          className={cn(
            'inline-block',
            speedClasses[speed],
            pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
            'will-change-transform',
          )}
        >
          {duplicatedItems.map((item, index) => (
            <span
              key={`${item.id}-${index}`}
              className={cn(
                'inline-flex items-center gap-2 mx-4',
                'text-sm',
                priorityColors[item.priority || 'normal'],
                itemClassName,
              )}
            >
              {item.content}
            </span>
          ))}
        </div>
      </div>
    );
  },
);

MarqueeTicker.displayName = 'MarqueeTicker';
export default MarqueeTicker;