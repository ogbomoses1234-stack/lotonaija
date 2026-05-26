import { memo, useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';

type Winner = {
  id: string;
  name: string;
  phone: string;
  prize: number;
  timestamp: string;
  tier: string;
};

type RecentPurchase = {
  id: string;
  userName: string;
  phone: string;
  amount: number;
  tier: string;
  timestamp: Date;
};

export const JackpotWinners = memo(() => {
  const [activeTab, setActiveTab] = useState<'recent' | 'winners'>('recent');
  const [showAll, setShowAll] = useState(false);

  // Mock recent purchases (real-time simulation)
  const [recentPurchases, setRecentPurchases] = useState<RecentPurchase[]>([
    { id: '1', userName: 'Chukwudi O.', phone: '234******755', amount: 500, tier: 'Tier 2', timestamp: new Date() },
    { id: '2', userName: 'George K.', phone: '234******337', amount: 200, tier: 'Tier 1', timestamp: new Date(Date.now() - 60000) },
    { id: '3', userName: 'Idolorware E.', phone: '234******553', amount: 1000, tier: 'Tier 3', timestamp: new Date(Date.now() - 120000) },
    { id: '4', userName: 'Adebayo M.', phone: '234******892', amount: 500, tier: 'Tier 2', timestamp: new Date(Date.now() - 180000) },
    { id: '5', userName: 'Fatima A.', phone: '234******441', amount: 200, tier: 'Tier 1', timestamp: new Date(Date.now() - 240000) },
    { id: '6', userName: 'Oluwaseun A.', phone: '234******123', amount: 1000, tier: 'Tier 3', timestamp: new Date(Date.now() - 300000) },
    { id: '7', userName: 'Chioma N.', phone: '234******678', amount: 500, tier: 'Tier 2', timestamp: new Date(Date.now() - 360000) },
    { id: '8', userName: 'Ibrahim S.', phone: '234******901', amount: 200, tier: 'Tier 1', timestamp: new Date(Date.now() - 420000) },
    { id: '9', userName: 'Blessing C.', phone: '234******234', amount: 1000, tier: 'Tier 3', timestamp: new Date(Date.now() - 480000) },
    { id: '10', userName: 'Emeka P.', phone: '234******567', amount: 500, tier: 'Tier 2', timestamp: new Date(Date.now() - 540000) },
  ]);

  // Mock jackpot winners
  const jackpotWinners: Winner[] = [
    { id: '1', name: 'Idolorware E.', phone: '234******553', prize: 50000000, timestamp: '25/04/2026', tier: 'King Monthly' },
    { id: '2', name: '2 Secondary Winners', phone: '', prize: 2000000, timestamp: '', tier: '' },
    { id: '3', name: '25 Tier-3 Winners', phone: '', prize: 150000, timestamp: '', tier: '' },
    { id: '4', name: '75 Tier-4 Winners', phone: '', prize: 25000, timestamp: '', tier: '' },
    { id: '5', name: '2,000 Consolation Winners', phone: '', prize: 1000, timestamp: '', tier: '' },
    { id: '6', name: '10,000 Entry Winners', phone: '', prize: 100, timestamp: '', tier: '' },
  ];

  // Simulate real-time purchases
  useEffect(() => {
    const interval = setInterval(() => {
      const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
      const amounts = [200, 500, 1000];
      const names = ['Chukwudi', 'George', 'Adebayo', 'Fatima', 'Oluwaseun', 'Chioma', 'Ngozi', 'Tunde', 'Aisha', 'Ibrahim'];
      
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTier = Math.floor(Math.random() * 3);
      const newPurchase: RecentPurchase = {
        id: Date.now().toString(),
        userName: `${randomName} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
        phone: `234******${Math.floor(100 + Math.random() * 900)}`,
        amount: amounts[randomTier],
        tier: tiers[randomTier],
        timestamp: new Date()
      }; 

      setRecentPurchases(prev => [newPurchase, ...prev].slice(0, 20));
    }, 4500); // Slightly faster to make the dashboard feel active

    return () => clearInterval(interval);
  }, []);

  const displayedPurchases = showAll ? recentPurchases : recentPurchases.slice(0, 10);

  return (
    <div className="glass-card relative overflow-hidden zigzag-bottom p-6 w-full flex flex-col gap-6">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Premium Segmented Control Tabs */}
      <div className="relative z-10 flex p-1.5 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl w-full">
        <button
          onClick={() => setActiveTab('recent')}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 relative overflow-hidden",
            activeTab === 'recent' 
              ? "text-white shadow-lg bg-gradient-to-r from-purple-600/80 to-pink-600/80 border border-white/10" 
              : "text-white/40 hover:text-white/80 hover:bg-white/5"
          )}
        >
          Recent Activity
        </button>
        <button
          onClick={() => setActiveTab('winners')}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 relative overflow-hidden",
            activeTab === 'winners' 
              ? "text-white shadow-lg bg-gradient-to-r from-amber-600/80 to-yellow-600/80 border border-white/10" 
              : "text-white/40 hover:text-white/80 hover:bg-white/5"
          )}
        >
          Leaderboard
        </button>
      </div>

      <div className="relative z-10">
        {activeTab === 'recent' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header with Live Pulse Indicator */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
                </span>
                <h4 className="text-white font-bold tracking-wide">Live Feed</h4>
              </div>
              <span className="text-[11px] font-mono font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                {recentPurchases.length} updates
              </span>
            </div>

            {/* List Container with Custom Scrollbar from globals.css */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 winners-scroll">
              {displayedPurchases.map((purchase, index) => (
                <div 
                  key={purchase.id}
                  className={cn(
                    "group relative flex items-center justify-between p-3.5 rounded-2xl transition-all duration-500 ease-out overflow-hidden border",
                    index === 0 
                      ? "bg-gradient-to-r from-purple-500/10 to-transparent border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                  )}
                >
                  {/* Left-side accent line for newest item */}
                  {index === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-500 rounded-l-2xl" />}
                  
                  <div className="flex items-center gap-3.5">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105",
                      index === 0 
                        ? "bg-[#060412] border-purple-500/50 text-purple-400" 
                        : "bg-[#060412] border-white/10 text-white/40"
                    )}>
                      <span className="text-sm font-black">
                        {index === 0 ? '⚡' : `#${index + 1}`}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <p className={cn("text-sm font-bold", index === 0 ? "text-white" : "text-white/80")}>
                        {purchase.userName}
                      </p>
                      <p className="text-white/40 text-[11px] font-mono tracking-wider">
                        {purchase.phone} • <span className={index === 0 ? "text-pink-400" : ""}>{purchase.tier}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className={cn("font-black font-mono text-sm tracking-tight", index === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400" : "text-white")}>
                      {formatNGN(purchase.amount)}
                    </p>
                    <p className="text-white/30 text-[10px] font-mono uppercase">
                      {purchase.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {recentPurchases.length > 10 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white/50 font-bold text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                {showAll ? 'Show Less Data' : 'Load Full History'}
              </button>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Winners Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <h4 className="text-white font-bold tracking-wide">Hall of Fame</h4>
              <span className="text-[11px] font-mono font-bold text-amber-500/80 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md">
                MAY 2026
              </span>
            </div>

            <div className="space-y-2.5">
              {jackpotWinners.map((winner, index) => {
                // Tier styling maps
                const isGrand = index === 0;
                const isSilver = index === 1;
                const isBronze = index === 2;

                return (
                  <div 
                    key={winner.id}
                    className={cn(
                      "group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border overflow-hidden",
                      isGrand ? "bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] scale-[1.02] my-3" : 
                      isSilver ? "bg-slate-300/5 border-slate-400/30" :
                      isBronze ? "bg-amber-700/5 border-amber-800/30" :
                      "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                    )}
                  >
                    {isGrand && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-300 to-amber-600 rounded-l-2xl" />}

                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner",
                        isGrand ? "bg-gradient-to-br from-yellow-300 to-amber-600 text-black text-lg" : 
                        isSilver ? "bg-gradient-to-br from-slate-200 to-slate-400 text-black text-base" :
                        isBronze ? "bg-gradient-to-br from-amber-600 to-amber-800 text-black text-base" :
                        "bg-[#060412] border border-white/10 text-white/40 text-sm"
                      )}>
                        <span className={cn(isGrand ? "animate-pulse" : "")}>
                          {isGrand ? '👑' : isSilver ? '🥈' : isBronze ? '🥉' : '🏆'}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <p className={cn("font-bold text-sm tracking-wide", isGrand ? "text-amber-400 text-glow" : "text-white/90")}>
                          {winner.name}
                        </p>
                        {winner.phone && (
                          <p className="text-white/40 text-[11px] font-mono tracking-wider">
                            {winner.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-black tracking-tight", 
                        isGrand ? "text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-600 text-glow font-sans" : 
                        "text-sm font-mono text-white/80"
                      )}>
                        {formatNGN(winner.prize)}
                      </p>
                      {isGrand && <p className="text-amber-500/60 text-[10px] font-bold uppercase tracking-widest mt-1">King Jackpot</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

JackpotWinners.displayName = 'JackpotWinners';