import { memo, useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { createPortal } from 'react-dom';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  preventScroll?: boolean;
};

/**
 * Centered modal dialog with focus trap and accessibility support
 * Mobile-optimized with glassmorphism styling
 */
export const Modal = memo(({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  closeOnEscape = true,
  className,
  preventScroll = true
}: ModalProps) => {
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
  
  // Focus trap - return focus to first focusable element
  useEffect(() => {
    if (!isOpen) return;
    
    const modal = document.querySelector('[role="dialog"]');
    if (!modal) return;
    
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    modal.addEventListener('keydown', handleTab);
    firstElement?.focus();
    
    return () => modal.removeEventListener('keydown', handleTab);
  }, [isOpen]);
  
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnOverlay, onClose]);
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-[480px] w-full h-full rounded-none'
  };
  
  if (!isOpen) return null;
  
  return createPortal(
    <div 
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-black/60 backdrop-blur-sm'
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div 
        className={cn(
          'glass-panel w-full',
          sizeClasses[size],
          'p-4 max-h-[90vh] overflow-y-auto',
          'animate-slide-up',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between mb-4">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-white">
                {title}
              </h2>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white transition-colors -mr-2"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="text-white/90">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
});

Modal.displayName = 'Modal';

export default Modal;