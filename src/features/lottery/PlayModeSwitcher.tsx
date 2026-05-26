import { memo } from 'react';
import { useTicketStore } from '@/store';
import { cn } from '@/utils/cn';
import type { PlayMode } from '@/types/lottery.types';

const MODES: { id: PlayMode; label: string; icon: React.ReactNode }[] = [
  { id: 'PICK_NUMBERS', label: 'Pick Numbers', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg> },
  { id: 'SCRATCH_CARD', label: 'Scratch Card', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> }
];

/**
 * Active layout state tracking enum switcher
 */
export const PlayModeSwitcher = memo(() => {
  const { playMode, actions } = useTicketStore();

  return (
    <div className="glass-panel p-1 flex gap-1 rounded-[28px]">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => actions.setPlayMode(mode.id)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[24px] text-sm font-medium transition-all duration-200",
            playMode === mode.id ? "bg-brand-primary text-white shadow-md shadow-blue-900/30" : "text-white/60 hover:text-white hover:bg-white/5"
          )}
        >
          {mode.icon}
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  );
});

PlayModeSwitcher.displayName = 'PlayModeSwitcher';