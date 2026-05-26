import { useCallback } from 'react';

type HapticPattern = number | number[];

/**
 * Cross-device haptic feedback hook
 * Falls back silently on iOS/unsupported browsers. Uses navigator.vibrate API.
 */
export const useHaptic = () => {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const trigger = useCallback((pattern: HapticPattern = 15) => {
    if (!isSupported) return;
    try {
      navigator.vibrate(pattern);
    } catch {
      // Silently fail in restricted contexts (iframes, secure origins)
    }
  }, [isSupported]);

  return { trigger, isSupported };
};