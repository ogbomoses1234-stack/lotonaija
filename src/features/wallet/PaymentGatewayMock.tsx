import { memo, useState, useEffect } from 'react';
import { Modal } from '@/components/common/Modal';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Loader } from '@/components/common/Loader';
import { useWalletStore } from '@/store';
import { formatNGN } from '@/utils/formatters';

export type PaymentGatewayMockProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
};

export const PaymentGatewayMock = memo(
  ({ isOpen, onClose, amount }: PaymentGatewayMockProps) => {
    const fundWallet = useWalletStore((s) => s.fundWallet);
    const [step, setStep] = useState<'initial' | 'processing' | 'success'>('initial');

    useEffect(() => {
      if (!isOpen) return;
      if (amount > 0) {
        setStep('initial');
      }
    }, [isOpen, amount]);

    const handleConfirm = async () => {
      setStep('processing');
      await new Promise((res) => setTimeout(res, 2000));
      const success = await fundWallet(amount);
      setStep(success ? 'success' : 'initial');
    };


    if (step === 'success') {
      return (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title="Payment Successful"
          size="sm"
        >
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-brand-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Funds Added
            </h3>
            <p className="text-brand-primary text-2xl font-bold mb-4">
              {formatNGN(amount)}
            </p>
            <p className="text-xs text-gray-500 mb-6">
              Balance updated instantly. Ready to play.
            </p>
            <PrimaryButton
              variant="success"
              fullWidth
              onClick={onClose}
              className="!bg-brand-primary !text-black font-bold"
            >
              Return to Wallet
            </PrimaryButton>
          </div>
        </Modal>
      );
    }

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Secure Checkout"
        size="sm"
        closeOnOverlay={step !== 'processing'}
      >
        <div className="space-y-4 text-gray-900">
          {step === 'processing' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Loader size="lg" label="Processing Payment..." className="!text-gray-900" />
              <p className="text-xs text-gray-500 mt-3">
                Connecting to secure gateway...
              </p>
            </div>
          ) : (
            <>
              {/* Amount breakdown */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold text-gray-900">
                    {formatNGN(amount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fee</span>
                  <span className="text-brand-primary font-medium">₦0.00</span>
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-primary/5 border border-brand-primary/30">
                <svg
                  className="w-4 h-4 text-brand-primary flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs text-gray-700">
                  Secured by 256-bit encryption. Mock gateway.
                </p>
              </div>

              <PrimaryButton fullWidth onClick={handleConfirm}>
                Pay {formatNGN(amount)}
              </PrimaryButton>
            </>
          )}
        </div>
      </Modal>
    );
  }
);

PaymentGatewayMock.displayName = 'PaymentGatewayMock';