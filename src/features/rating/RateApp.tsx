// Add to SideMenu.tsx click handler:
// { icon: '⭐', label: 'Rate the App', action: 'rate' }

// Then create this modal component:
import { memo, useState } from 'react'; // ✅ Add useState
import { Modal } from '@/components/common/Modal';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { cn } from '@/utils/cn';

export type RateAppModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RateAppModal = memo(({ isOpen, onClose }: RateAppModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // In production: send rating to analytics/backend
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setRating(0);
      setSubmitted(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Thank You!" size="sm">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-brand-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⭐</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Thanks for your feedback!</h3>
          <p className="text-sm text-white/70">
            Your rating helps us improve LottoNaija for everyone.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate LottoNaija" size="sm">
      <div className="space-y-4">
        <p className="text-sm text-white/80 text-center">
          How likely are you to recommend LottoNaija to a friend?
        </p>
        
        {/* Star Rating */}
        <div className="flex justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={cn(
                "text-3xl transition-transform duration-150",
                star <= rating ? "text-brand-accent scale-110" : "text-white/30 hover:text-white/50"
              )}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
        
        {/* Optional Feedback */}
        <textarea
          placeholder="Tell us what you love (optional)..."
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 resize-none"
          rows={3}
        />
        
        <PrimaryButton 
          fullWidth 
          variant="accent"
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Submit Rating
        </PrimaryButton>
      </div>
    </Modal>
  );
});

RateAppModal.displayName = 'RateAppModal';
export default RateAppModal;