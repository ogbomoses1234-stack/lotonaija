import { memo, useState } from 'react';
import { cn } from '@/utils/cn';
import { HapticTrigger } from '@/components/ui/HapticTrigger';

export type QuickCopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

/**
 * Interactive component showing target strings with quick-action click-to-clipboard
 * Provides visual feedback on successful copy
 */
export const QuickCopyButton = memo(({ text, label = 'Copy', className }: QuickCopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      if (navigator.vibrate) navigator.vibrate(10);
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <HapticTrigger
      as="button"
      onTrigger={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full relative overflow-hidden",
        "bg-white/10 border border-white/20 hover:bg-white/15 active:bg-white/20",
        "text-white text-sm font-medium transition-all duration-150",
        copied && "bg-brand-success/20 border-brand-success/40 text-brand-success",
        className
      )}
      aria-label={copied ? 'Copied to clipboard' : `Copy ${label}`}
    >
      {/* Sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 pointer-events-none" />
      
      {copied ? (
        <>
          <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="relative z-10 font-mono text-xs uppercase tracking-wider">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="relative z-10 font-mono text-xs uppercase tracking-wider">{label}</span>
        </>
      )}
    </HapticTrigger>
  );
});

QuickCopyButton.displayName = 'QuickCopyButton';