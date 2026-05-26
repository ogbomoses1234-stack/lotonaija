import { memo, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

// 1. Updated the type definition to use 'onCheckedChange'
export type ComplianceCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void; 
};

export const ComplianceCheckbox = memo(({
  checked,
  onCheckedChange,
  className,
  ...props
}: ComplianceCheckboxProps) => {
  return (
    <label className={cn("flex items-start gap-4 cursor-pointer group animate-in fade-in slide-in-from-bottom-2 duration-300", className)}>
      <input
        type="checkbox"
        checked={checked}
        // 2. Map native onChange to the new prop
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
        {...props}
      />
      
      <div className={cn(
        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 mt-0.5 shrink-0 relative overflow-hidden",
        checked 
          ? "bg-gradient-to-br from-pink-500 to-purple-600 border-transparent shadow-[0_0_12px_rgba(236,72,153,0.5)]" 
          : "bg-black/40 border-white/20 group-hover:border-white/40 group-hover:bg-white/5 shadow-inner"
      )}>
        {checked && (
          <svg className="w-4 h-4 text-white drop-shadow-md animate-in zoom-in-50 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <span className="text-sm text-white/60 leading-relaxed font-medium">
        I confirm I am 18+ and agree to the{' '}
        <span className="text-pink-400 hover:text-pink-300 transition-colors font-bold tracking-wide drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">Terms of Service</span>,{' '}
        <span className="text-pink-400 hover:text-pink-300 transition-colors font-bold tracking-wide drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">Responsible Gaming Policy</span>, and data processing guidelines.
      </span>
    </label>
  );
});

ComplianceCheckbox.displayName = 'ComplianceCheckbox';