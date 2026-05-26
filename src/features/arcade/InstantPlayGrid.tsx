import { memo, useState } from 'react';
import { cn } from '@/utils/cn';
import { ARCADE_GAMES } from '@/utils/constants';
import { formatNGN } from '@/utils/formatters';
import { HapticTrigger } from '@/components/ui/HapticTrigger';
import { FullscreenArcadeModal } from './FullscreenArcadeModal';
import type { ArcadeGame } from '@/types/arcade.types';

/**
 * Asset grid displaying placeholder image layers for instant-win formats
 * Launches fullscreen modal framework with scroll lock and wallet overlay
 */
export const InstantPlayGrid = memo(() => {
  const [selectedGame, setSelectedGame] = useState<ArcadeGame | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLaunch = (game: ArcadeGame) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 my-4">
        {ARCADE_GAMES.map((game) => (
          <HapticTrigger
            key={game.id}
            as="button"
            onTrigger={() => handleLaunch(game)}
            className={cn(
              "aspect-square glass-card flex flex-col items-center justify-center gap-3 relative overflow-hidden zigzag-bottom",
              "cursor-pointer transition-all duration-150 active:scale-95 hover:border-brand-primary/40",
              "group bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border border-white/10"
            )}
          >
            {/* Sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.05] pointer-events-none" />
            
            {/* Placeholder game asset */}
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center relative z-10",
              "bg-gradient-to-br from-brand-primary/20 to-brand-accent/20",
              "border border-white/20 group-hover:border-brand-primary/40 transition-colors",
              "shadow-[0_0_15px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]"
            )}>
         <span className="text-2xl">
  {game.type === 'instant' && '⚡'}
  {game.type === 'wheel' && '🎡'}
  {/* Add scratch check only if you add a scratch game to ARCADE_GAMES */}
</span>
            </div>
            
            <div className="text-center px-2 relative z-10">
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">{game.name}</h3>
              <p className="text-[10px] text-white/60 font-mono">
                Play: {formatNGN(game.price, { showDecimals: false })}
              </p>
              <p className="text-[10px] text-brand-accent font-medium font-mono">
                Win up to {formatNGN(game.maxWin, { showDecimals: false })}
              </p>
            </div>
          </HapticTrigger>
        ))}
      </div>

      <FullscreenArcadeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGame(null);
        }}
        game={selectedGame}
      />
    </>
  );
});

InstantPlayGrid.displayName = 'InstantPlayGrid';