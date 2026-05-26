import { memo, useState, useEffect } from 'react';
import { useTicketStore } from '@/store';
import { cn } from '@/utils/cn';
import { NUMBER_GRID } from '@/utils/constants';
import { HapticTrigger } from '@/components/ui/HapticTrigger';
import { TooltipWarning } from '@/components/ui/TooltipWarning';

export const NumberGrid = memo(() => {
  const selectedNumbers = useTicketStore((s) => s.selectedNumbers);
  const toggleNumber = useTicketStore((s) => s.toggleNumber);
  const clearNumbers = useTicketStore((s) => s.clearNumbers);
  const [showMaxWarning, setShowMaxWarning] = useState(false);

  const handleSelect = (num: number) => {
    const success = toggleNumber(num);
    if (!success) {
      if (navigator.vibrate) navigator.vibrate([30, 30, 30]);
      setShowMaxWarning(true);
    }
  };

  useEffect(() => {
    if (showMaxWarning) {
      const t = setTimeout(() => setShowMaxWarning(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showMaxWarning]);

  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-3 px-1">
        <h3 className="text-sm font-semibold text-white/80">Select up to {NUMBER_GRID.defaultMaxSelection} numbers</h3>
        {selectedNumbers.length > 0 && (
          <button onClick={clearNumbers} className="text-xs text-brand-accent underline">Clear All</button>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => {
          const isSelected = selectedNumbers.includes(num);
          const isDisabled = selectedNumbers.length >= NUMBER_GRID.defaultMaxSelection && !isSelected;

          return (
            <HapticTrigger
              key={num}
              as="button"
              disabled={isDisabled}
              onTrigger={() => handleSelect(num)}
              className={cn(
                "aspect-square glass-card flex items-center justify-center text-lg font-bold transition-all duration-100",
                isSelected ? "bg-brand-primary border-brand-primary/50 text-white scale-95 shadow-lg shadow-blue-900/40" : "active:scale-90 hover:border-white/30",
                isDisabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {num.toString().padStart(2, '0')}
            </HapticTrigger>
          );
        })}
      </div>

      {showMaxWarning && (
        <TooltipWarning message={`Maximum ${NUMBER_GRID.defaultMaxSelection} numbers allowed`} position="top" children={undefined} />
      )}
    </div>
  );
});

NumberGrid.displayName = 'NumberGrid';