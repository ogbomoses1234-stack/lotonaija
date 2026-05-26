import { memo } from 'react';
import { cn } from '@/utils/cn';

/**
 * CSS keyframe linear sweep animation mask mimicking laser scan
 */
export const LaserSweepOverlay = memo(() => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-10")}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1 animate-[laser-sweep_1.2s_ease-in-out_forwards]" />
    </div>
  );
});

LaserSweepOverlay.displayName = 'LaserSweepOverlay';