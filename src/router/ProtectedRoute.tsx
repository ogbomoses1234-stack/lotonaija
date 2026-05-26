import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Suspense, type ReactNode } from 'react';
import { useAuthStore } from '@/store';
import { Loader } from '@/components/common/Loader';

interface ProtectedRouteProps {
  children?: ReactNode;
  requiresKYC?: boolean;
}

/**
 * Auth & KYC guard wrapper
 * Checks Zustand state, redirects to `/auth` if unauthenticated or KYC pending.
 * Preserves `from` location for post-login redirect.
 */
export const ProtectedRoute = ({ children, requiresKYC = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="safe-area flex items-center justify-center min-h-screen">
        <Loader size="lg" label="Verifying session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiresKYC && user?.kycStatus !== 'verified') {
    return <Navigate to="/auth?step=kyc" state={{ from: location }} replace />;
  }

  const content = children || <Outlet />;

  return (
    <Suspense fallback={<Loader variant="pulse" label="Loading feature..." />}>
      {content}
    </Suspense>
  );
};