import {
  memo,
  useState,
  useEffect,
  useCallback,
  type InputHTMLAttributes,
} from 'react';
import { cn } from '@/utils/cn';
import { authApi } from '@/api/auth.api';
import { InputField } from '@/components/common/InputField';

export type NubanVerificationProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'maxLength'
> & {
  value: string;
  onChange: (nuban: string) => void;
  onVerified: (accountName: string) => void;
  error?: string;
};

/**
 * 10‑digit NUBAN input with async verification – light theme.
 */
export const NubanVerification = memo(
  ({
    value,
    onChange,
    onVerified,
    error,
    className,
  }: NubanVerificationProps) => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [verifiedName, setVerifiedName] = useState<string | null>(null);

    const handleInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
        onChange(raw);
        setVerifiedName(null); // Reset on change
      },
      [onChange],
    );

    useEffect(() => {
      if (value.length !== 10 || isVerifying) return;

      const timer = setTimeout(async () => {
        setIsVerifying(true);
        try {
          const { data } = await authApi.verifyNuban({
            bankCode: 'placeholder',
            nuban: value,
          });
          setVerifiedName(data.accountName);
          onVerified(data.accountName);
        } catch {
          // Silently fail – parent form validation handles error
        } finally {
          setIsVerifying(false);
        }
      }, 600);

      return () => clearTimeout(timer);
    }, [value, isVerifying, onVerified]);

    return (
      <div className={cn('space-y-2', className)}>
        <InputField
          label="NUBAN Account Number"
          value={value}
          onChange={handleInput}
          inputMode="numeric"
          maxLength={10}
          error={error}
          placeholder="0123456789"
          helperText={`${10 - value.length} digits remaining`}
        />

        {(verifiedName || isVerifying) && (
          <div
            className={cn(
              'flex items-center gap-2 p-3 rounded-2xl border',
              verifiedName
                ? 'bg-brand-primary/5 border-brand-primary/30'
                : 'bg-gray-50 border-gray-200',
            )}
          >
            {isVerifying ? (
              <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-4 h-4 text-brand-primary flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span
              className={cn(
                'text-sm',
                verifiedName ? 'text-brand-primary font-medium' : 'text-gray-500',
              )}
            >
              {verifiedName
                ? `Account Name: ${verifiedName}`
                : 'Verifying account...'}
            </span>
          </div>
        )}
      </div>
    );
  },
);

NubanVerification.displayName = 'NubanVerification';