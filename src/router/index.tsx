import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { GlobalShell } from '@/layout/GlobalShell';
import { ProtectedRoute } from './ProtectedRoute';
import { routeConfig, type RouteMeta } from './routes.config';
import { Suspense, lazy } from 'react';
import { Loader } from '@/components/common/Loader';

console.log('📡 Router module loaded');

// ============================================================================
// LAZY-LOADED COMPONENTS
// Each target file MUST have: export default ComponentName;
// ============================================================================

// Existing components
const LotteryHub = lazy(() => import('../features/lottery/LotteryHub').then(m => ({ default: m.LotteryHub })));
const TicketLedger = lazy(() => import('../features/tickets/TicketLedger').then(m => ({ default: m.TicketLedger })));
const WalletCenter = lazy(() => import('../features/wallet/WalletCenter').then(m => ({ default: m.WalletCenter })));
const ArcadeLounge = lazy(() => import('../features/arcade/ArcadeLounge').then(m => ({ default: m.ArcadeLounge })));
const OnboardingForm = lazy(() => import('../features/auth/OnboardingForm').then(m => ({ default: m.OnboardingForm })));

// ✅ NEW: Add lazy imports for new feature pages
const NotificationsCenter = lazy(() => import('../features/notifications/NotificationsCenter').then(m => ({ default: m.NotificationsCenter })));
const ResultsStats = lazy(() => import('../features/stats/ResultsStats').then(m => ({ default: m.ResultsStats })));
const ReferralProgram = lazy(() => import('../features/referrals/ReferralProgram').then(m => ({ default: m.ReferralProgram })));
const SecurityPrivacy = lazy(() => import('../features/security/SecurityPrivacy').then(m => ({ default: m.SecurityPrivacy })));
const AppSettings = lazy(() => import('../features/settings/AppSettings').then(m => ({ default: m.AppSettings })));
const ProfileCenter = lazy(() => import('../features/profile/ProfileCenter').then(m => ({ default: m.ProfileCenter })));
const TermsPage = lazy(() => import('../features/legal/TermsPage'));
const PrivacyPage = lazy(() => import('../features/legal/PrivacyPage'));
const ResponsibleGamingPage = lazy(() => import('../features/legal/ResponsibleGamingPage'));
const SupportPage = lazy(() => import('../features/support/SupportPage'));

// ============================================================================
// COMPONENT MAP - String keys match routeConfig.component values
// ============================================================================
type LazyComponent = React.LazyExoticComponent<React.ComponentType<unknown>>;

const componentMap: Record<string, LazyComponent> = {
  // Existing
  LotteryHub,
  TicketLedger,
  WalletCenter,
  ArcadeLounge,
  OnboardingForm,
  // ✅ NEW: Add new component keys
  NotificationsCenter,
  ResultsStats,
  ReferralProgram,
  SecurityPrivacy,
  AppSettings,
  ProfileCenter,
  TermsPage,
  PrivacyPage,
  ResponsibleGamingPage,
  SupportPage,
};

// ============================================================================
// ERROR FALLBACK
// ============================================================================
const RouteErrorFallback = ({ label }: { label: string }) => (
  <div className="safe-area flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
    <div className="glass-panel p-6 max-w-sm w-full">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Failed to Load</h2>
      <p className="text-white/70 text-sm mb-4">Could not load the {label} feature. Please try again.</p>
      <button
        onClick={() => window.location.reload()}
        className="btn-primary w-full"
      >
        Retry
      </button>
    </div>
  </div>
);

// ============================================================================
// BUILD ROUTES
// ============================================================================
const buildRouteChildren = () => {
  return routeConfig.map((route: RouteMeta) => {
    console.log(`🔗 Registering route: ${route.path}`);
    
    const LazyComponent = componentMap[route.component];
    
    if (!LazyComponent) {
      console.error(`❌ No component found for: ${route.component}`);
      return {
        path: route.path === '/' ? undefined : route.path,
        element: <div className="text-red-400 p-4">Missing component: {route.component}</div>
      };
    }
    
    const suspenseFallback = <Loader label={`Loading ${route.label}...`} />;
    
    const element = route.requiresAuth ? (
      <ProtectedRoute requiresKYC={route.requiresKYC}>
        <Suspense fallback={suspenseFallback}>
          <LazyComponent />
        </Suspense>
      </ProtectedRoute>
    ) : (
      <Suspense fallback={suspenseFallback}>
        <LazyComponent />
      </Suspense>
    );
    
    return {
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element,
      errorElement: <RouteErrorFallback label={route.label} />
    };
  });
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalShell />,
    children: [
      ...buildRouteChildren(),
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);

// ============================================================================
// EXPORT
// ============================================================================
export const AppRouter = () => {
  console.log('🔄 AppRouter rendering, location:', window.location.pathname);
  return <RouterProvider router={router} />;
};

export type { RouteMeta } from './routes.config';
export { ProtectedRoute } from './ProtectedRoute';
export { routeConfig } from './routes.config';