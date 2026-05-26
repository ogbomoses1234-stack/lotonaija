import { memo, type SelectHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { NIGERIAN_BANKS } from '@/utils/constants';

export type BankSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange'
> & {
  value: string;
  onChange: (code: string) => void;
  error?: string;
};

/**
 * Dropdown selector mapped to Nigerian bank constants – light theme.
 */
export const BankSelect = memo(
  ({ value, onChange, error, className, ...props }: BankSelectProps) => {
    return (
      <div className={cn('relative', className)}>
        <label className="block text-[13px] font-bold text-gray-700 mb-2 tracking-wide">
          Select Bank
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full bg-white border rounded-2xl px-4 py-3 min-h-[48px]',
            'text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary',
            'appearance-none cursor-pointer transition-all duration-200',
            error
              ? 'border-red-300 focus:ring-red-500/20'
              : 'border-gray-200 hover:border-gray-300',
          )}
          aria-invalid={!!error}
          {...props}
        >
          <option value="" disabled className="text-gray-400">
            Choose your bank
          </option>
          {NIGERIAN_BANKS.map((bank) => (
            <option
              key={bank.code}
              value={bank.code}
              className="text-gray-900"
            >
              {bank.name}
            </option>
          ))}
        </select>
        {/* Custom arrow */}
        <div className="pointer-events-none absolute right-4 top-[2.6rem] text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>
    );
  },
);

BankSelect.displayName = 'BankSelect';