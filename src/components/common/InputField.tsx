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

export const InputField = memo(
  forwardRef<HTMLInputElement, InputFieldProps>(
    (
      {
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
      },
      ref,
    ) => {
      const inputId =
        id || `input-${Math.random().toString(36).slice(2, 9)}`;
      const errorId = `${inputId}-error`;
      const helperId = `${inputId}-helper`;

      const hasError = !!error;
      const hasSuccess = !!success;

      const inputClasses = cn(
        'w-full bg-white border rounded-2xl px-4 py-3.5 min-h-[48px]',
        'text-gray-900 placeholder-gray-400 font-medium tracking-wide',
        'focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary',
        'transition-all duration-200',
        disabled
          ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-gray-200 hover:border-gray-300',
        hasError
          ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
          : '',
        hasSuccess
          ? 'border-brand-primary focus:ring-brand-primary/20'
          : '',
        prefix ? 'pl-12' : '',
        suffix ? 'pr-12' : '',
        inputClassName,
      );

      return (
        <div className={cn('w-full relative', className)}>
          {label && (
            <label
              htmlFor={inputId}
              className="block text-[13px] font-bold text-gray-700 mb-2 tracking-wide"
            >
              {label}
              {required && (
                <span className="text-red-500 ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}

          <div className="relative group">
            {prefix && (
              <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center pl-4 pr-3 border-r border-gray-200 bg-gray-50 rounded-l-2xl group-focus-within:border-brand-primary/30 group-focus-within:bg-brand-primary/5 transition-colors duration-200">
                <span className="text-gray-600 text-sm font-bold z-10">
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
              aria-describedby={
                hasError ? errorId : helperText ? helperId : undefined
              }
              {...props}
            />

            {suffix && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10 flex items-center">
                {suffix}
              </div>
            )}
          </div>

          {helperText && !hasError && !hasSuccess && (
            <p
              id={helperId}
              className="text-[11px] font-mono tracking-wide text-gray-400 mt-2 uppercase"
            >
              {helperText}
            </p>
          )}

          {hasError && (
            <p
              id={errorId}
              className="text-xs text-red-600 mt-2 flex items-center gap-1.5 font-medium animate-in fade-in slide-in-from-top-1"
              role="alert"
            >
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          )}

          {hasSuccess && (
            <p className="text-xs text-brand-primary mt-2 flex items-center gap-1.5 font-medium animate-in fade-in slide-in-from-top-1">
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {success}
            </p>
          )}
        </div>
      );
    },
  ),
);

InputField.displayName = 'InputField';
export default InputField;