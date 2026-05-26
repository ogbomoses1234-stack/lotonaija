import { Outlet } from 'react-router-dom';
import { GlassHeader } from './GlassHeader';
import { OfflineBanner } from './OfflineBanner';
import { BottomNavigation } from './BottomNavigation';
import AppFooter from './AppFooter';
import ScrollToTop from '@/components/ScrollToTop';

/**
 * Root mobile viewport wrapper – light theme.
 * Enforces max-width, consistent white background,
 * and auto‑scrolls to top on route change.
 */
export const GlobalShell = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-base-body">
      {/* Scroll to top on every navigation */}
      <ScrollToTop />

      {/* Offline banner (now light‑themed) */}
      <OfflineBanner />

      {/* Header (now light‑themed) */}
      <GlassHeader />

      {/* Main content – scrollable area */}
      <main className="flex-1 pt-16 pb-24 overflow-y-auto no-pull scroll-smooth flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <AppFooter />
      </main>

      {/* Bottom navigation (now light‑themed) */}
      <BottomNavigation />
    </div>
  );
};