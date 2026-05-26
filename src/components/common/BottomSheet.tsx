import { memo, useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { createPortal } from 'react-dom';

export type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  preventScroll?: boolean;
};

/**
 * Mobile-optimized slide-up bottom sheet – light theme.
 * Features: drag handle, overlay close, escape key, scroll lock.
 */
export const BottomSheet = memo(
  ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    closeOnOverlay = true,
    closeOnEscape = true,
    className,
    preventScroll = true,
  }: BottomSheetProps) => {
    // Scroll lock when open
    useEffect(() => {
      if (!isOpen || !preventScroll) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [isOpen, preventScroll]);

    // Escape key handler
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };

      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnOverlay && e.target === e.currentTarget) {
          onClose();
        }
      },
      [closeOnOverlay, onClose],
    );

    if (!isOpen) return null;

    return createPortal(
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-end justify-center',
          'bg-black/50 backdrop-blur-sm',
        )}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
      >
        <div
          className={cn(
            'w-full max-w-[480px] bg-white',
            'rounded-t-3xl rounded-b-none',
            'p-4 pb-6 max-h-[85vh] overflow-y-auto',
            'shadow-2xl',
            'animate-slide-up',
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag Handle */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h2
                id="bottom-sheet-title"
                className="text-lg font-semibold text-gray-900"
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Content */}
          <div className="text-gray-900">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="mt-6 pt-4 border-t border-gray-200">{footer}</div>
          )}
        </div>
      </div>,
      document.body,
    );
  },
);

BottomSheet.displayName = 'BottomSheet';
export default BottomSheet;