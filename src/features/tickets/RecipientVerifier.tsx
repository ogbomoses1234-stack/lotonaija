import { memo, useState, useEffect, useCallback } from 'react';
import { InputField } from '@/components/common/InputField';
import { validatePhone } from '@/utils/validations';

export type RecipientVerifierProps = {
  onVerified: (phone: string) => void;
  onError: () => void;
};

/**
 * Input block mapping to phone prefixes. Returns confirmed string state on validation.
 */
export const RecipientVerifier = memo(({ onVerified, onError }: RecipientVerifierProps) => {
  const [phone, setPhone] = useState('');
  const [verifiedName, setVerifiedName] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(raw);
    setVerifiedName(null);
    setIsValid(false);
  }, []);

  useEffect(() => {
    if (phone.length !== 10) {
      onError();
      return;
    }

    const validation = validatePhone(phone);
    setIsValid(validation.isValid);
    
    if (validation.isValid) {
      const timer = setTimeout(() => {
        // Mock async resolution matching business spec
        setVerifiedName('Chukwudi O.');
        onVerified(`+234${phone}`);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      onError();
    }
  }, [phone, onVerified, onError]);

  return (
    <div className="space-y-2">
      <InputField
        label="Recipient Phone"
        value={phone}
        onChange={handleChange}
        prefix={<span className="text-white/80 font-medium select-none">+234</span>}
        placeholder="801 234 5678"
        inputMode="numeric"
        success={verifiedName ? `Verified: ${verifiedName}` : undefined}
        error={!isValid && phone.length > 0 ? "Invalid format" : undefined}
      />
    </div>
  );
});

RecipientVerifier.displayName = 'RecipientVerifier';