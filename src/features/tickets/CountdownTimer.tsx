import { memo } from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/utils/cn';

export type CountdownTimerProps = {
  drawTimestamp: number;
  className?: string;
  compact?: boolean;
};

/**
 * Interactive structural live countdown component ticking down to automated draw
 */
export const CountdownTimer = memo(({ drawTimestamp, className, compact = false }: CountdownTimerProps) => {
  const { timeLeft, isComplete } = useCountdown(drawTimestamp);

  return (
    <div className={cn("flex items-center gap-1 font-mono font-bold", className, 
      isComplete ? "text-brand-accent animate-pulse" : "text-white/90"
    )}>
      {!compact && <span className="text-[10px] uppercase tracking-wider text-white/60 mr-1">Draws in:</span>}
      <span className={compact ? "text-sm" : "text-lg"}>{timeLeft}</span>
      {isComplete && <span className="text-[10px] ml-1">LIVE</span>}
    </div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';