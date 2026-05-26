import { memo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Loader } from '@/components/common/Loader';
import { cn } from '@/utils/cn';

export const ProfileCenter = memo(() => {
  const navigate = useNavigate();
 
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const skipRedirect = useRef(false); // Prevent automatic redirect during our manual logout
const user = useAuthStore((s) => s.user);
const logout = useAuthStore((s) => s.logout);
  const handleLogout = async () => {
    // 1. Confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to log out? You will be returned to the onboarding screen.'
    );
    if (!confirmed) return;

    // 2. Block automatic redirect, show loader
    skipRedirect.current = true;
    setIsLoggingOut(true);

    try {
      // 3. Clear persisted store (optional)
      useAuthStore.persist?.clearStorage();
      // 4. Execute the store logout (sets isAuthenticated = false)
      await logout();
      // 5. Keep the loader visible for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // 6. Navigate to onboarding
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      // On error, allow automatic redirect again and hide loader
      skipRedirect.current = false;
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="safe-area pt-6 pb-24 px-4 bg-base-body min-h-screen space-y-8">
      {/* Full‑screen logout loader overlay */}
      {isLoggingOut ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Loader size="lg" variant="spinner" />
            <p className="text-lg font-bold text-gray-900">Logging out...</p>
            <p className="text-sm text-gray-500">
              You'll be redirected shortly.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 border border-gray-300 flex items-center justify-center shadow-inner">
              <span className="text-sm font-black text-gray-500 font-mono">
                {user?.accountName?.charAt(0) || '?'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Account</h1>
              <p className="text-xs text-gray-400 font-mono">{user?.phone || ''}</p>
            </div>
          </div>

          {user ? (
            <>
              {/* Account Details Card */}
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                {/* Subtle decorative line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono mb-1">
                      Account Name
                    </p>
                    <p className="text-base font-bold text-gray-900">{user.accountName}</p>
                  </div>

                  <div className="border-t border-dashed border-gray-100" />

                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono mb-1">
                      Bank Details
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {user.bankName} ({user.bankCode})
                    </p>
                  </div>

                  <div className="border-t border-dashed border-gray-100" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono mb-1">
                        KYC Status
                      </p>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border',
                          user.kycStatus === 'verified' &&
                            'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
                          user.kycStatus === 'pending' &&
                            'bg-amber-50 text-amber-600 border-amber-200',
                          user.kycStatus === 'rejected' &&
                            'bg-red-50 text-red-600 border-red-200',
                          !['verified', 'pending', 'rejected'].includes(user.kycStatus) &&
                            'bg-gray-50 text-gray-500 border-gray-200'
                        )}
                      >
                        {user.kycStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone / Logout */}
              <div className="rounded-2xl border-2 border-dashed border-red-200 bg-red-50/30 p-4">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest font-mono mb-3">
                  Account Actions
                </p>
                <PrimaryButton
                  variant="ghost"
                  fullWidth
                  onClick={handleLogout}   
                  className="!text-red-600 !border-red-200 hover:!bg-red-50"
                >
                  Log Out
                </PrimaryButton>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-gray-400 font-bold text-sm">No user data available</p>
            </div>
          )}
        </>
      )}
    </div>
  );
});

ProfileCenter.displayName = 'ProfileCenter';
export default ProfileCenter;