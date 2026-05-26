import { memo, useState } from 'react';
import { cn } from '@/utils/cn';
import { LaserSweepOverlay } from './LaserSweepOverlay';
import { PrimaryButton } from '@/components/common/PrimaryButton';

/**
 * Virtual card layout hiding randomized values with activation state
 */
export const ScratchCard = memo(() => {
  const [isScratched, setIsScratched] = useState(false);
  const [result, setResult] = useState<'win' | 'loss' | null>(null);

  const handleReveal = () => {
    // Simulate randomized values
    setResult(Math.random() > 0.6 ? 'win' : 'loss');
    setIsScratched(true);
  };

  return (
    <div className="relative w-full aspect-[4/3] max-w-sm mx-auto my-6 rounded-[30px] overflow-hidden border border-white/20">
      {/* Base hidden layer */}
      <div className={cn(
        "absolute inset-0 glass-panel flex flex-col items-center justify-center p-6 transition-opacity duration-500",
        isScratched ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <span className="text-4xl mb-2">{result === 'win' ? '🎉' : '🔒'}</span>
        <h3 className="text-xl font-bold text-white">{result === 'win' ? '₦5,000' : 'Try Again'}</h3>
        <p className="text-xs text-white/60 mt-2">{result === 'win' ? 'Added to wallet instantly' : 'Better luck next time'}</p>
      </div>

      {/* Scratch overlay layer */}
      {!isScratched && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-white/40 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
            <PrimaryButton onClick={handleReveal}>Tap to Scratch</PrimaryButton>
          </div>
        </div>
      )}

      {isScratched && <LaserSweepOverlay />}
    </div>
  );
});

ScratchCard.displayName = 'ScratchCard';