import { memo, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type ComplianceCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export const ComplianceCheckbox = memo(
  ({ checked, onCheckedChange, className, ...props }: ComplianceCheckboxProps) => {
    return (
      <label
        className={cn(
          'flex items-start gap-4 cursor-pointer group animate-in fade-in slide-in-from-bottom-2 duration-300',
          className,
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="sr-only peer"
          {...props}
        />

        <div
          className={cn(
            'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 mt-0.5 shrink-0',
            checked
              ? 'bg-brand-primary border-brand-primary'
              : 'bg-white border-gray-300 group-hover:border-brand-primary',
          )}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white animate-in zoom-in-50 duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        <span className="text-sm text-gray-600 leading-relaxed font-medium">
          I confirm I am 18+ and agree to the{' '}
          <span className="text-brand-primary font-bold hover:underline transition-colors">
            Terms of Service
          </span>
          ,{' '}
          <span className="text-brand-primary font-bold hover:underline transition-colors">
            Responsible Gaming Policy
          </span>
          , and data processing guidelines.
        </span>
      </label>
    );
  },
);

ComplianceCheckbox.displayName = 'ComplianceCheckbox';