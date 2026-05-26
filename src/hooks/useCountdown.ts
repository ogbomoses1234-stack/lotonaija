import { useState, useEffect } from 'react';

/**
 * High-performance draw countdown timer
 * Uses `setInterval` optimized for UI thread, returns formatted HH:MM:SS
 */
export const useCountdown = (targetTimestamp: number | null) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!targetTimestamp) {
      setTimeLeft('00:00:00');
      setIsComplete(false);
      return;
    }

    const calculate = () => {
      const now = Date.now();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        setIsComplete(true);
        return;
      }

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
      setIsComplete(false);
    };

    calculate(); // Initial render
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return { timeLeft, isComplete };
};