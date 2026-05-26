import { memo, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { createPortal } from 'react-dom';

export type ToastProps = {
  isOpen: boolean;
  onClose: () => void;
  message: ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
};

/**
 * Non-blocking toast notification with auto-dismiss
 * Positioned at bottom of mobile viewport with safe-area padding
 */
export const Toast = memo(({
  isOpen,
  onClose,
  message,
  type = 'info',
  duration = 3000,
  action,
  className
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // Wait for exit animation
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen, duration, onClose]);
  
  if (!isOpen && !isVisible) return null;
  
  const typeStyles = {
    success: 'bg-brand-success/90 border-brand-success/50 text-white',
    error: 'bg-red-500/90 border-red-400/50 text-white',
    warning: 'bg-brand-accent/90 border-brand-accent/50 text-slate-900',
    info: 'bg-white/10 border-white/20 text-white'
  };
  
  const icons = {
    success: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    )
  };
  
  return createPortal(
    <div 
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[100] flex justify-center p-4',
        'max-w-[480px] mx-auto',
        'pointer-events-none',
        isVisible ? 'animate-slide-up' : 'animate-[slide-down_0.3s_ease-in_forwards]',
        className
      )}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
    >
      <div 
        className={cn(
          'glass-panel pointer-events-auto',
          'flex items-start gap-3 p-4 pr-3',
          'border-l-4',
          typeStyles[type],
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="mt-0.5">
          {icons[type]}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{message}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {action && (
            <button
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className="text-sm font-semibold underline decoration-1 underline-offset-2 hover:opacity-80 transition-opacity"
            >
              {action.label}
            </button>
          )}
          
          <button
            onClick={onClose}
            className="p-1 text-inherit/60 hover:text-inherit transition-colors"
            aria-label="Dismiss notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
});

Toast.displayName = 'Toast';

export default Toast;