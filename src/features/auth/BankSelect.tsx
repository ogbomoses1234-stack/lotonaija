import { memo, type SelectHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { NIGERIAN_BANKS } from '@/utils/constants';
import { InputField } from '@/components/common/InputField';

export type BankSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> & {
  value: string;
  onChange: (code: string) => void;
  error?: string;
};

/**
 * Dropdown selector mapped to Nigerian bank constants
 */
export const BankSelect = memo(({
  value,
  onChange,
  error,
  className,
  ...props
}: BankSelectProps) => {
  return (
    <div className={cn('relative', className)}>
      <label className="input-label">Select Bank</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 min-h-[44px]",
          "text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
          "appearance-none cursor-pointer",
          error ? "border-red-500/50" : "hover:border-white/30"
        )}
        aria-invalid={!!error}
        {...props}
      >
        <option value="" disabled className="bg-base-dark text-white/70">Choose your bank</option>
        {NIGERIAN_BANKS.map((bank) => (
          <option key={bank.code} value={bank.code} className="bg-base-dark text-white">
            {bank.name}
          </option>
        ))}
      </select>
      {/* Custom arrow */}
      <div className="pointer-events-none absolute right-4 top-[2.6rem] text-white/60">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
});

BankSelect.displayName = 'BankSelect';