import { memo } from 'react';
import { cn } from '@/utils/cn';

export type LedgerTabsProps = {
  activeTab: 'active' | 'completed';
  onTabChange: (tab: 'active' | 'completed') => void;
};

/**
 * State-bound tab switcher with active indicator
 */
export const LedgerTabs = memo(({ activeTab, onTabChange }: LedgerTabsProps) => {
  return (
    <div className="glass-panel p-1 flex rounded-[28px]">
      {(['active', 'completed'] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "flex-1 py-2.5 rounded-[24px] text-sm font-semibold capitalize transition-all duration-200",
            activeTab === tab
              ? "bg-white/10 text-white shadow-inner"
              : "text-white/50 hover:text-white hover:bg-white/5"
          )}
        >
          {tab} {tab === 'active' ? 'Draws' : 'Results'}
        </button>
      ))}
    </div>
  );
});

LedgerTabs.displayName = 'LedgerTabs';