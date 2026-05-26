import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { PhoneInput } from './PhoneInput';
import { BankSelect } from './BankSelect';
import { NubanVerification } from './NubanVerification';
import { ComplianceCheckbox } from './ComplianceCheckbox';
import { Loader } from '@/components/common/Loader';

type Step = 'phone' | 'bank' | 'nuban' | 'compliance';
const STEPS: Step[] = ['phone', 'bank', 'nuban', 'compliance'];

export const OnboardingForm = memo(() => {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register); // ✅ Direct store function
  const [step, setStep] = useState<Step>('phone');

  const [form, setForm] = useState({
    phone: '',
    bankCode: '',
    nuban: '',
    agreedTerms: false,
    accountName: '',
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const canProceed = {
    phone: form.phone.length === 10,
    bank: form.bankCode.length > 0,
    nuban: form.nuban.length === 10 && form.accountName.length > 0,
    compliance: form.agreedTerms,
  };

  const handleSubmit = async () => {
    try {
      setIsLoggingIn(true); // Show loader
      await register({
        phone: `+234${form.phone}`,
        bankCode: form.bankCode,
        nuban: form.nuban,
        agreeTerms: true,
      });
      // Keep loader for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Registration failed:', err);
      setIsLoggingIn(false); // Hide loader on error
    }
  };

  const currentStepIndex = STEPS.indexOf(step);
  const progressPercentage = ((currentStepIndex + 1) / STEPS.length) * 100;

  const renderStep = () => {
    switch (step) {
      case 'phone':
        return (
          <PhoneInput
            value={form.phone}
            onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
            autoFocus
          />
        );
      case 'bank':
        return (
          <BankSelect
            value={form.bankCode}
            onChange={(v) => setForm((f) => ({ ...f, bankCode: v }))}
          />
        );
      case 'nuban':
        return (
          <NubanVerification
            value={form.nuban}
            onChange={(v) => setForm((f) => ({ ...f, nuban: v }))}
            onVerified={(name) => setForm((f) => ({ ...f, accountName: name }))}
          />
        );
      case 'compliance':
        return (
          <ComplianceCheckbox
            checked={form.agreedTerms}
            onCheckedChange={(v) => setForm((f) => ({ ...f, agreedTerms: v }))}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-base-body">
      {isLoggingIn ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Loader size="lg" variant="spinner" />
            <p className="text-lg font-bold text-gray-900">Setting up your account</p>
            <p className="text-sm text-gray-500">You'll be redirected shortly...</p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm rounded-3xl">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
              </span>
              <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em]">
                Step {currentStepIndex + 1} of {STEPS.length}
              </p>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              Create Account
            </h1>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-brand-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Dynamic Form */}
          <div className="min-h-[160px] flex flex-col justify-center">
            {renderStep()}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {step !== 'phone' && (
              <button
                className="flex-shrink-0 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 font-bold transition-all active:scale-95"
                onClick={() => setStep(STEPS[currentStepIndex - 1])}
              >
                Back
              </button>
            )}

            <div className="flex-1">
              <PrimaryButton
                size="md"
                fullWidth
                disabled={!canProceed[step]}
                onClick={() =>
                  step === 'compliance'
                    ? handleSubmit()
                    : setStep(STEPS[currentStepIndex + 1])
                }
              >
                {step === 'compliance' ? 'Complete Setup' : 'Continue'}
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

OnboardingForm.displayName = 'OnboardingForm';