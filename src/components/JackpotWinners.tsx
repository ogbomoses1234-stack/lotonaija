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

  const jackpotWinners: Winner[] = [
    { id: '1', name: 'Idolorware E.', phone: '234******553', prize: 50000000, timestamp: '25/04/2026', tier: 'King Monthly' },
    { id: '2', name: '2 Secondary Winners', phone: '', prize: 2000000, timestamp: '', tier: '' },
    { id: '3', name: '25 Tier-3 Winners', phone: '', prize: 150000, timestamp: '', tier: '' },
    { id: '4', name: '75 Tier-4 Winners', phone: '', prize: 25000, timestamp: '', tier: '' },
    { id: '5', name: '2,000 Consolation Winners', phone: '', prize: 1000, timestamp: '', tier: '' },
    { id: '6', name: '10,000 Entry Winners', phone: '', prize: 100, timestamp: '', tier: '' },
  ];

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
        timestamp: new Date(),
      };

      setRecentPurchases((prev) => [newPurchase, ...prev].slice(0, 20));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const displayedPurchases = showAll ? recentPurchases : recentPurchases.slice(0, 10);

  // ---- SVG rank icons (replacing emoji) ----
  const rankIcons = {
    crown: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    gold: (
      <svg className="w-5 h-5" fill="#F59E0B" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    silver: (
      <svg className="w-5 h-5" fill="#94A3B8" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    bronze: (
      <svg className="w-5 h-5" fill="#D97706" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    other: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    lightning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    ticket: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  };

  return (
    <div className="relative overflow-hidden   border border-gray-200 bg-white shadow-sm p-6 flex flex-col gap-6 w-full">
      {/* Segment Tabs */}
      <div className="flex p-1.5 bg-gray-100 rounded-2xl w-full">
        <button
          onClick={() => setActiveTab('recent')}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-200",
            activeTab === 'recent'
              ? "bg-white text-gray-900 shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Recent Activity
        </button>
        <button
          onClick={() => setActiveTab('winners')}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-200",
            activeTab === 'winners'
              ? "bg-white text-gray-900 shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Leaderboard
        </button>
      </div>

      <div>
        {activeTab === 'recent' ? (
          <div>
            {/* Live Pulse Indicator */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary" />
                </span>
                <h4 className="text-gray-900 font-bold tracking-wide">Live Feed</h4>
              </div>
              <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
                {recentPurchases.length} updates
              </span>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 winners-scroll">
              {displayedPurchases.map((purchase, index) => (
                <div
                  key={purchase.id}
                  className={cn(
                    "group relative flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 overflow-hidden border",
                    index === 0
                      ? "bg-brand-primary/5 border-brand-primary/30"
                      : "bg-gray-50 border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                      index === 0
                        ? "bg-white border-brand-primary/50 text-brand-primary"
                        : "bg-white border-gray-200 text-gray-400"
                    )}>
                      {index === 0 ? rankIcons.lightning : <span className="text-sm font-black">#{index + 1}</span>}
                    </div>
                    <div>
                      <p className={cn("text-sm font-bold", index === 0 ? "text-gray-900" : "text-gray-700")}>
                        {purchase.userName}
                      </p>
                      <p className="text-gray-400 text-[11px] font-mono tracking-wider">
                        {purchase.phone} • {purchase.tier}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-black font-mono text-sm", index === 0 ? "text-brand-primary" : "text-gray-900")}>
                      {formatNGN(purchase.amount)}
                    </p>
                    <p className="text-gray-400 text-[10px] font-mono uppercase">
                      {purchase.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {recentPurchases.length > 10 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-100 hover:text-gray-700 transition-all"
              >
                {showAll ? 'Show Less Data' : 'Load Full History'}
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h4 className="text-gray-900 font-bold tracking-wide">Hall of Fame</h4>
              <span className="text-[11px] font-mono font-bold text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
                MAY 2026
              </span>
            </div>

            <div className="space-y-2.5">
              {jackpotWinners.map((winner, index) => {
                const isGrand = index === 0;
                const isSilver = index === 1;
                const isBronze = index === 2;

                let Icon = rankIcons.other;
                if (isGrand) Icon = rankIcons.crown;
                else if (isSilver) Icon = rankIcons.silver;
                else if (isBronze) Icon = rankIcons.bronze;

                return (
                  <div
                    key={winner.id}
                    className={cn(
                      "group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-200 border",
                      isGrand ? "bg-amber-50 border-amber-300 scale-[1.02] my-3" :
                      isSilver ? "bg-gray-50 border-gray-200" :
                      isBronze ? "bg-orange-50 border-orange-200" :
                      "bg-gray-50 border-gray-100 hover:border-gray-200"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                        isGrand ? "bg-white border-amber-400 text-amber-500" :
                        isSilver ? "bg-white border-gray-300 text-gray-400" :
                        isBronze ? "bg-white border-orange-300 text-orange-500" :
                        "bg-white border-gray-200 text-gray-400"
                      )}>
                        {Icon}
                      </div>
                      <div>
                        <p className={cn("font-bold text-sm", isGrand ? "text-amber-600" : "text-gray-900")}>
                          {winner.name}
                        </p>
                        {winner.phone && (
                          <p className="text-gray-400 text-[11px] font-mono tracking-wider">
                            {winner.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-black",
                        isGrand ? "text-xl text-amber-600" : "text-sm text-gray-700"
                      )}>
                        {formatNGN(winner.prize)}
                      </p>
                      {isGrand && <p className="text-amber-500 text-[10px] font-bold uppercase mt-1">King Jackpot</p>}
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