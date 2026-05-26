import { useState, useEffect, useCallback } from 'react';

/**
 * Tracks online/offline state with connection quality metrics
 * Binds to window network events for real-time offline banner sync
 */
export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<'slow-2g' | '2g' | '3g' | '4g' | 'wifi' | 'unknown'>('unknown');

  const updateConnection = useCallback(() => {
    setIsOnline(navigator.onLine);
    const conn = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
    setConnectionType(conn?.effectiveType || (navigator.onLine ? 'wifi' : 'unknown'));
  }, []);

  useEffect(() => {
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    updateConnection();
    return () => {
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
    };
  }, [updateConnection]);

  return { isOnline, connectionType };
};