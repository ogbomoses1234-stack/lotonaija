 
import { cn } from '@/utils/cn';
import { forwardRef, InputHTMLAttributes, memo } from 'react';
 
 
export type InputFieldProps = {
  label?: string;
  error?: string;
  success?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  helperText?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'>;
export const InputField = memo(forwardRef<HTMLInputElement, InputFieldProps>(({
  label,
  error,
  success,
  prefix,
  suffix,
  helperText,
  required,
  className,
  inputClassName,
  id,
  disabled,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  
  const hasError = !!error;
  const hasSuccess = !!success;
  
  const inputClasses = cn(
    'w-full bg-black/40 backdrop-blur-md border rounded-2xl px-4 py-3.5 min-h-[48px] shadow-inner',
    'text-white placeholder-white/30 font-medium tracking-wide',
    'focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/50',
    'transition-all duration-300',
    disabled ? 'opacity-50 cursor-not-allowed bg-black/20 border-white/5' : 'border-white/10 hover:border-white/20 hover:bg-black/60',
    hasError ? 'border-red-500/50 focus:ring-red-500/30 shadow-[inset_0_0_15px_rgba(239,68,68,0.1)]' : '',
    hasSuccess ? 'border-emerald-500/50 focus:ring-emerald-500/30 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)]' : '',
    prefix ? 'pl-14' : '',
    suffix ? 'pr-12' : '',
    inputClassName
  );
  
  return (
    <div className={cn('w-full relative', className)}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-[13px] font-bold text-white/80 mb-2 tracking-wide"
        >
          {label}
          {required && <span className="text-pink-500 ml-1 drop-shadow-md" aria-hidden="true">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {prefix && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center pl-4 pr-3 border-r border-white/10 bg-white/5 rounded-l-2xl group-focus-within:border-pink-500/30 group-focus-within:bg-pink-500/10 transition-colors duration-300">
            <span className="text-white/80 text-sm font-bold z-10">
              {prefix}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          {...props}
        />
        
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-sm z-10 flex items-center">
            {suffix}
          </div>
        )}
      </div>
      
      {helperText && !hasError && !hasSuccess && (
        <p id={helperId} className="text-[11px] font-mono tracking-wide text-white/40 mt-2 uppercase">{helperText}</p>
      )}
      
      {hasError && (
        <p id={errorId} className="text-xs text-red-400 mt-2 flex items-center gap-1.5 font-medium animate-in fade-in slide-in-from-top-1" role="alert">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {hasSuccess && (
        <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5 font-medium animate-in fade-in slide-in-from-top-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </p>
      )}
    </div>
  );
}));

InputField.displayName = 'InputField';

export default InputField;