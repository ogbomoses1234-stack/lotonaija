import { memo, forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { InputField } from '@/components/common/InputField';

export type PhoneInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'maxLength'> & {
  value: string;
  onChange: (phone: string) => void;
  error?: string;
};

export const PhoneInput = memo(forwardRef<HTMLInputElement, PhoneInputProps>(({
  value,
  onChange,
  error,
  className,
  ...props
}, ref) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(raw);
  };

  return (
    <div className={cn('relative animate-in fade-in slide-in-from-bottom-2 duration-300', className)}>
  <InputField
  ref={ref}
  label="Phone Number"
  value={value}
  onChange={handleInput}
  prefix={
    <div className="flex items-center gap-1.5 select-none">
      <span className="text-[10px] leading-none">🇳🇬</span>
      <span className="font-mono text-sm tracking-widest">+234</span>
    </div>
  }
        placeholder="801 234 5678"
        error={error}
        maxLength={10}
        inputMode="numeric"
        autoComplete="tel-national"
        inputClassName="font-mono text-lg tracking-widest pl-[88px]" // Increased padding to clear the larger premium prefix
        {...props}
      />
    </div>
  );
}));

PhoneInput.displayName = 'PhoneInput';