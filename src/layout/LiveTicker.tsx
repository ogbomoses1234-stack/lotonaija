import { useEffect, useState } from 'react';
import { MarqueeTicker } from '@/components/ui/MarqueeTicker';
import { formatNGN } from '@/utils/formatters';

// 1. Explicitly declare the literal types to ensure perfect strictness
type TickerPriority = 'high' | 'normal' | 'low';

export type TickerItem = {
  id: string;
  content: React.ReactNode;
  priority: TickerPriority;
};

/**
 * Live activity marquee 
 * Simulates real-time draw updates and jackpot alerts
 */
export const LiveTicker = () => {
  // 2. Strongly type the state hook
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    // In production, replace with WebSocket/API polling
    const mockUpdates: TickerItem[] = [
      { 
        id: '1', 
        content: <span className="text-[#A0A5B1]">🎉 <strong className="text-white font-mono">{formatNGN(450000)}</strong> won in Lagos</span>, 
        priority: 'high' 
      },
      { 
        id: '2', 
        content: <span className="text-[#A0A5B1]">🔥 Jackpot Pool: <strong className="text-brand-primary font-mono">{formatNGN(50000000)}</strong></span>, 
        priority: 'high' 
      },
      { 
        id: '3', 
        content: <span className="text-[#A0A5B1]">🎫 <strong className="text-white">12,840</strong> tickets sold for 8PM Draw</span>, 
        priority: 'normal' 
      },
      { 
        id: '4', 
        content: <span className="text-[#A0A5B1]">⚡ Instant payouts under 24h guaranteed</span>, 
        priority: 'low' 
      },
    ];
    
    // 3. No more `as any` bypass needed!
    setItems(mockUpdates);
  }, []);

  return (
    <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40">
      {/* Flat High-Contrast Bar (Removed glass-panel, bg-black/20, and border-white/5) */}
      <MarqueeTicker 
        items={items} 
        speed="normal" 
        pauseOnHover 
        className="bg-[#1B1C1E] border-y border-[#2E3033] py-2 text-xs"
      />
    </div>
  );
};