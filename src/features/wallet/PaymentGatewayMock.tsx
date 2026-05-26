import { memo, useState, useEffect } from 'react';
import { Modal } from '@/components/common/Modal';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Loader } from '@/components/common/Loader';
import { useWalletStore } from '@/store';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';

export type PaymentGatewayMockProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
};

/**
 * Mock overlay emulating Paystack/Flutterwave checkout workflow
 */
export const PaymentGatewayMock = memo(({ isOpen, onClose, amount }: PaymentGatewayMockProps) => {
  const { actions } = useWalletStore();
  const [step, setStep] = useState<'initial' | 'processing' | 'success'>('initial');

  useEffect(() => {
    if (!isOpen) return;
    if (amount > 0) {
      setStep('initial');
    }
  }, [isOpen, amount]);

  const handleConfirm = async () => {
    setStep('processing');
    // Simulate gateway delay
    await new Promise(res => setTimeout(res, 2000));
    const success = await actions.fundWallet(amount);
    setStep(success ? 'success' : 'initial');
  };

  if (step === 'success') {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Payment Successful" size="sm">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-brand-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Funds Added</h3>
          <p className="text-brand-success text-2xl font-bold mb-4">{formatNGN(amount)}</p>
          <p className="text-xs text-white/60 mb-6">Balance updated instantly. Ready to play.</p>
          <PrimaryButton variant="success" fullWidth onClick={onClose}>Return to Wallet</PrimaryButton>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={step === 'processing' ? undefined : onClose} title="Secure Checkout" size="sm">
      <div className="space-y-4">
        {step === 'processing' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Loader size="lg" label="Processing Payment..." />
            <p className="text-xs text-white/50 mt-3">Connecting to secure gateway...</p>
          </div>
        ) : (
          <>
            <div className="glass-panel p-4 rounded-2xl bg-white/5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Amount</span>
                <span className="font-bold text-white">{formatNGN(amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Fee</span>
                <span className="text-brand-success">₦0.00</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/30">
              <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-brand-primary/90">Secured by 256-bit encryption. Mock gateway.</p>
            </div>

            <PrimaryButton fullWidth onClick={handleConfirm}>
              Pay {formatNGN(amount)}
            </PrimaryButton>
          </>
        )}
      </div>
    </Modal>
  );
});

PaymentGatewayMock.displayName = 'PaymentGatewayMock';