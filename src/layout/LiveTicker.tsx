import { useEffect, useState } from 'react';
import { MarqueeTicker } from '@/components/ui/MarqueeTicker';
import { formatNGN } from '@/utils/formatters';

/**
 * Live activity marquee below header
 * Simulates real-time draw updates and jackpot alerts
 */
export const LiveTicker = () => {
  const [items, setItems] = useState<Array<{ id: string; content: React.ReactNode; priority: 'high' | 'normal' | 'low' }>>([]);

  useEffect(() => {
    // In production, replace with WebSocket/API polling
    const mockUpdates = [
      { id: '1', content: <span>🎉 <strong>{formatNGN(450000)}</strong> won in Lagos</span>, priority: 'high' },
      { id: '2', content: <span>🔥 Jackpot Pool: <strong>{formatNGN(50000000)}</strong></span>, priority: 'high' },
      { id: '3', content: <span>🎫 12,840 tickets sold for 8PM Draw</span>, priority: 'normal' },
      { id: '4', content: <span>⚡ Instant payouts under 24h guaranteed</span>, priority: 'low' },
    ] as const; // <-- The fix! Tells TypeScript these strings are strict literals, not generic strings.
    
    setItems(mockUpdates as any);
  }, []);

  return (
    <div className="fixed bottom-[85px] left-0 right-0 z-40 max-w-[480px] mx-auto">
      <MarqueeTicker 
        items={items} 
        speed="normal" 
        pauseOnHover 
        className="glass-panel rounded-[20px] py-1.5 border-t-0 border-x-0 border-white/5 bg-black/20"
      />
    </div>
  );
};