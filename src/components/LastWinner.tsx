import { memo } from 'react';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';

type LastWinnerData = {
  position: string;
  winners: string;
  prize: number;
  icon: string;
};

export const LastWinner = memo(() => {
  const winners: LastWinnerData[] = [
    { position: '1st', winners: 'Idolorware E. (234******553)', prize: 50000000, icon: '👑' },
    { position: '2nd', winners: '2 Winners', prize: 2000000, icon: '🥈' },
    { position: '3rd', winners: '25 Winners', prize: 150000, icon: '🥉' },
    { position: '4th', winners: '75 Winners', prize: 25000, icon: '🏆' },
    { position: '5th', winners: '2,000 Winners', prize: 1000, icon: '🎁' },
    { position: '6th', winners: '10,000 Winners', prize: 100, icon: '🎫' },
  ];

  return (
    <div className="glass-card relative zigzag-bottom overflow-hidden p-6 lg:p-8 flex flex-col gap-6 w-full">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
            <p className="text-white/40 text-[10px] font-black font-mono uppercase tracking-widest">
              Results Placard
            </p>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
            Last Draw Winners
          </h3>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 backdrop-blur-sm self-start sm:self-auto">
          <p className="text-xs font-mono font-bold text-amber-400/80 uppercase tracking-wider">
            King Monthly • 25/04/2026
          </p>
        </div>
      </div>

      {/* Winners Breakdown */}
      <div className="relative z-10 space-y-3">
        {winners.map((winner, index) => {
          const isGrand = index === 0;
          const isSilver = index === 1;
          const isBronze = index === 2;

          return (
            <div 
              key={index}
              className={cn(
                "group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl transition-all duration-300 border overflow-hidden",
                isGrand ? "bg-gradient-to-r from-amber-500/15 to-amber-900/10 border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.15)] scale-[1.02] mb-5" : 
                isSilver ? "bg-slate-300/5 border-slate-400/20" :
                isBronze ? "bg-amber-700/5 border-amber-800/20" :
                "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
              )}
            >
              {/* Grand Prize Edge Highlight */}
              {isGrand && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-300 via-amber-500 to-amber-700 rounded-l-2xl" />}

              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex items-center justify-center shrink-0 shadow-inner rounded-full",
                  isGrand ? "w-14 h-14 bg-gradient-to-br from-yellow-300 via-amber-500 to-amber-700 text-3xl" : 
                  isSilver ? "w-11 h-11 bg-gradient-to-br from-slate-200 to-slate-400 text-xl" :
                  isBronze ? "w-11 h-11 bg-gradient-to-br from-amber-600 to-amber-800 text-xl" :
                  "w-10 h-10 bg-[#060412] border border-white/10 text-white/40 text-lg"
                )}>
                  <span className={cn(isGrand && "drop-shadow-md", "group-hover:scale-110 transition-transform duration-300")}>
                    {winner.icon}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <p className={cn(
                    "font-bold tracking-wide", 
                    isGrand ? "text-amber-400 text-base sm:text-lg drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" : "text-white/90 text-sm"
                  )}>
                    {winner.winners}
                  </p>
                  <p className={cn(
                    "text-[11px] font-mono tracking-widest uppercase",
                    isGrand ? "text-amber-500/80" : "text-white/40"
                  )}>
                    {winner.position} Position
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className={cn(
                  "font-black tracking-tight",
                  isGrand ? "text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-amber-600 font-sans" : 
                  "text-base font-mono text-white/90"
                )}>
                  {formatNGN(winner.prize)}
                </p>
                {isGrand && (
                  <p className="text-amber-500/80 text-[10px] font-black uppercase tracking-widest mt-1">
                    Grand Prize
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Neon Countdown Footer */}
      <div className="relative z-10 mt-2 rounded-2xl bg-black/40 backdrop-blur-md border border-purple-500/30 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)]">
        {/* Subtle animated gradient sweep in the background of the countdown */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
        
        <div className="relative p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </span>
            <p className="text-white/80 text-sm font-bold tracking-wide">
              Prepare for the Next Draw
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">T-Minus</span>
            <span className="countdown-timer font-mono text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-wider">
              03:23:44
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

LastWinner.displayName = 'LastWinner';