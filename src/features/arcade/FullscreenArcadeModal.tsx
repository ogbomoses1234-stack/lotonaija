import { memo, useEffect, useCallback, useState } from 'react';
import { cn } from '@/utils/cn';
import { useWalletStore } from '@/store';
import { formatNGN } from '@/utils/formatters';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Loader } from '@/components/common/Loader';
import type { ArcadeGame } from '@/types/arcade.types';

export type FullscreenArcadeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  game: ArcadeGame | null;
};

/**
 * Fullscreen container modal framework that locks scrolling
 * Maintains persistent visibility of wallet variables and escape button
 */
export const FullscreenArcadeModal = memo(({ isOpen, onClose, game }: FullscreenArcadeModalProps) => {
  const { balance } = useWalletStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<'win' | 'loss' | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = originalOverflow; };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handlePlay = useCallback(async () => {
    if (!game) return;
    setIsPlaying(true);
    
    await new Promise(res => setTimeout(res, 1500));
    
    const won = Math.random() > 0.7;
    setResult(won ? 'win' : 'loss');
    
    if (won) {
      useWalletStore.setState(state => ({ 
        balance: state.balance + game.maxWin * 0.1
      }));
    }
    
    setIsPlaying(false);
  }, [game]);

  const handleContinue = () => {
    setResult(null);
  };

  const handleExit = () => {
    setResult(null);
    onClose();
  };

  if (!isOpen || !game) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] bg-base-dark flex flex-col",
        "animate-[slide-up_0.3s_ease-out]"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="arcade-modal-title"
    >
      {/* Ambient modal glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-600/10 rounded-full blur-[60px] pointer-events-none" />
      
      {/* Header with escape button */}
      <header className="glass-panel rounded-b-[30px] border-b-0 px-4 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-4 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <h2 id="arcade-modal-title" className="font-semibold text-white font-mono uppercase tracking-wider text-sm">{game.name}</h2>
        </div>
        <button
          onClick={handleExit}
          className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
          aria-label="Exit game"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      {/* Game content area */}
      <main className="flex-1 overflow-auto px-4 py-6 flex flex-col items-center justify-center relative z-10">
        {result === null ? (
          // Pre-play state
          <div className="text-center max-w-sm w-full space-y-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-brand-primary/30 to-brand-accent/30 flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <span className="text-4xl">
                {game.type === 'instant' && '⚡'}
                {game.type === 'wheel' && '🎡'}
                {game.type === 'scratch' && '🎫'}
              </span>
            </div>
            
            <div>
              <p className="text-white/70 mb-1 font-mono uppercase tracking-wider text-[10px]">Cost to Play</p>
              <p className="text-3xl font-bold text-white font-mono">{formatNGN(game.price)}</p>
            </div>
            
            <div className="glass-panel p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-sm text-white/80 mb-2 font-mono uppercase tracking-wider text-[10px]">Potential Prize</p>
              <p className="text-2xl font-bold text-brand-accent font-mono">{formatNGN(game.maxWin)}</p>
            </div>
            
            <PrimaryButton 
              fullWidth 
              onClick={handlePlay}
              disabled={isPlaying || balance < game.price}
              className="relative overflow-hidden"
            >
              {isPlaying ? <Loader size="sm" /> : `Play for ${formatNGN(game.price)}`}
            </PrimaryButton>
            
            {balance < game.price && (
              <p className="text-xs text-red-400 font-mono">Insufficient balance. Visit Wallet to fund.</p>
            )}
          </div>
        ) : (
          // Post-play result state
          <div className="text-center max-w-sm w-full space-y-6 animate-[slide-up_0.3s_ease-out]">
            <div className={cn(
              "w-24 h-24 mx-auto rounded-full flex items-center justify-center border-4",
              result === 'win' 
                ? "bg-brand-success/20 border-brand-success text-brand-success shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                : "bg-white/10 border-white/20 text-white/60"
            )}>
              <span className="text-4xl">{result === 'win' ? '🎉' : '😔'}</span>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-1 font-mono">
                {result === 'win' ? 'You Won!' : 'Better Luck Next Time'}
              </h3>
              <p className="text-white/70 font-mono text-sm">
                {result === 'win' 
                  ? `+${formatNGN(game.maxWin * 0.1, { showDecimals: false })} added to wallet` 
                  : 'Try another game or come back later'}
              </p>
            </div>
            
            {result === 'win' && (
              <div className="glass-panel p-4 rounded-2xl bg-brand-success/10 border-brand-success/30">
                <p className="text-sm text-brand-success/90 font-medium font-mono uppercase tracking-wider text-[10px]">New Balance</p>
                <p className="text-2xl font-bold text-white font-mono">{formatNGN(balance + game.maxWin * 0.1)}</p>
              </div>
            )}
            
            <div className="flex gap-3">
              <PrimaryButton variant="ghost" fullWidth onClick={handleContinue}>
                Play Again
              </PrimaryButton>
              <PrimaryButton variant="success" fullWidth onClick={handleExit}>
                Done
              </PrimaryButton>
            </div>
          </div>
        )}
      </main>

      {/* Persistent wallet overlay at bottom */}
      <div className="glass-panel px-4 py-3 flex items-center justify-between border-t border-white/10 relative z-10">
        <div>
          <span className="text-[10px] text-white/60 block font-mono uppercase tracking-wider">Wallet</span>
          <span className="font-bold text-white font-mono">{formatNGN(balance)}</span>
        </div>
        <button 
          onClick={() => window.location.href = '/wallet'}
          className="text-xs text-brand-primary font-medium underline font-mono hover:text-brand-accent transition-colors"
        >
          Fund Wallet
        </button>
      </div>
    </div>
  );
});

FullscreenArcadeModal.displayName = 'FullscreenArcadeModal';