import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { GlassCard } from '@/components/common/GlassCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { PhoneInput } from './PhoneInput';
import { BankSelect } from './BankSelect';
import { NubanVerification } from './NubanVerification';
import { ComplianceCheckbox } from './ComplianceCheckbox';

type Step = 'phone' | 'bank' | 'nuban' | 'compliance';
const STEPS: Step[] = ['phone', 'bank', 'nuban', 'compliance'];

export const OnboardingForm = memo(() => {
  const navigate = useNavigate();
  const { actions } = useAuthStore();
  const [step, setStep] = useState<Step>('phone');
  
  const [form, setForm] = useState({
    phone: '',
    bankCode: '',
    nuban: '',
    agreedTerms: false,
    accountName: ''
  });

  const canProceed = {
    phone: form.phone.length === 10,
    bank: form.bankCode.length > 0,
    nuban: form.nuban.length === 10 && form.accountName.length > 0,
    compliance: form.agreedTerms
  };

  const handleSubmit = async () => {
    try {
      await actions.register({
        phone: `+234${form.phone}`,
        bankCode: form.bankCode,
        nuban: form.nuban,
        agreeTerms: true
      });
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Registration failed:', err);
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
            onChange={(v) => setForm(f => ({ ...f, phone: v }))}
            autoFocus
          />
        );
      case 'bank':
        return (
          <BankSelect
            value={form.bankCode}
            onChange={(v) => setForm(f => ({ ...f, bankCode: v }))}
          />
        );
      case 'nuban':
        return (
          <NubanVerification
            value={form.nuban}
            onChange={(v) => setForm(f => ({ ...f, nuban: v }))}
            onVerified={(name) => setForm(f => ({ ...f, accountName: name }))}
          />
        );
      case 'compliance':
        return (
      <ComplianceCheckbox
  checked={form.agreedTerms}
  onCheckedChange={(v) => setForm(f => ({ ...f, agreedTerms: v }))}
/>
        );
    }
  };

 
 return (
  <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-hidden bg-[#0A0A0A]">
    {/* Refined Glowing Orbs */}
    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[128px] pointer-events-none" />

    <GlassCard className="w-full max-w-md p-6 sm:p-8 space-y-8 relative z-10 border border-white/10 bg-black/40 shadow-2xl"> <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
            </span>
            <p className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-[0.2em]">
              Step {currentStepIndex + 1} of {STEPS.length}
            </p>
          </div>
          
          <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            Create Account
          </h1>

          {/* Premium Glowing Progress Bar */}
          <div className="w-full h-1.5 bg-black/40 rounded-full mt-4 overflow-hidden border border-white/5 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Dynamic Form Content Wrapper */}
        <div className="min-h-[160px] flex flex-col justify-center relative">
          {renderStep()}
        </div>

        {/* Actions Footer */}
        <div className="flex gap-3 pt-4 border-t border-white/5">
          {step !== 'phone' && (
            <button 
              className="flex-shrink-0 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-bold transition-all duration-300 active:scale-95"
              onClick={() => setStep(STEPS[currentStepIndex - 1])}
            >
              Back
            </button>
          )}
          
          {/* Main Action Button - Using your PrimaryButton structure but ensuring it spans */}
          <div className="flex-1">
            <PrimaryButton
              size="md"
              fullWidth
              disabled={!canProceed[step]}
              onClick={() => step === 'compliance' ? handleSubmit() : setStep(STEPS[currentStepIndex + 1])}
            >
              {step === 'compliance' ? 'Complete Setup' : 'Continue to Next Step'}
            </PrimaryButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
});

OnboardingForm.displayName = 'OnboardingForm';