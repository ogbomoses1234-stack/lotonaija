import { memo, useState } from 'react';
import { useWalletStore } from '@/store';
import { InputField } from '@/components/common/InputField';
import { BankSelect } from '@/features/auth/BankSelect';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { ProcessingToast } from './ProcessingToast';
import { cn } from '@/utils/cn';

export const WithdrawalPortal = memo(() => {
  // ✅ Direct selectors – no more `actions`
  const withdraw = useWalletStore((s) => s.withdraw);
  const isProcessing = useWalletStore((s) => s.isProcessing);

  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [nuban, setNuban] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    const success = await withdraw(bankCode, nuban, parseFloat(amount) || 0);
    setTimeout(() => setShowToast(false), 3000);
    if (success) {
      setAmount('');
      setNuban('');
    }
  };

  const canSubmit =
    amount && parseFloat(amount) > 0 && bankCode && nuban.length === 10 && !isProcessing;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm p-6 space-y-6">
      {/* Decorative top line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-8 h-[3px] bg-brand-primary rounded-full" />
          <p className="text-gray-400 text-[10px] font-black font-mono uppercase tracking-widest">
            Withdraw Funds
          </p>
        </div>
        <h3 className="text-xl font-black tracking-tight text-gray-900">
          Transfer to Bank
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Instant processing to verified accounts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <InputField
            label="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg text-gray-900"
            placeholder="0.00"
            prefix={
              <span className="text-brand-primary font-bold text-lg">₦</span>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <BankSelect value={bankCode} onChange={setBankCode} />
          <InputField
            label="Account Number"
            value={nuban}
            onChange={(e) => setNuban(e.target.value)}
            placeholder="0000000000"
            inputMode="numeric"
            maxLength={10}
          />
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-3">
          <svg
            className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-gray-600">
            Withdrawals are processed within{' '}
            <span className="font-bold text-gray-900">24-48 hours</span>.
            Minimum withdrawal: ₦1,000
          </p>
        </div>

        <PrimaryButton
          type="submit"
          fullWidth
          disabled={!canSubmit}
          className={cn(
            'transition-all duration-200',
            !canSubmit && '!bg-gray-200 !text-gray-400 cursor-not-allowed'
          )}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            'Withdraw Funds'
          )}
        </PrimaryButton>
      </form>

      {/* Processing Toast – already light‑themed */}
      <ProcessingToast isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
});

WithdrawalPortal.displayName = 'WithdrawalPortal';