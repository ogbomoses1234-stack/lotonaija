import { useNetwork } from '@/hooks/useNetwork';
import { cn } from '@/utils/cn';

/**
 * Absolute-positioned network warning banner
 * Binds to `useNetwork` hook and appears when connection drops
 */
export const OfflineBanner = () => {
  const { isOnline } = useNetwork();
  if (isOnline) return null;

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-[100] max-w-[480px] mx-auto",
      "bg-red-500/90 backdrop-blur-md text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide",
      "border-b border-red-400/40 animate-slide-down"
    )}>
      <div className="flex items-center justify-center gap-2">
        <svg className="w-3.5 h-3.5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>NO INTERNET CONNECTION</span>
      </div>
    </div>
  );
};