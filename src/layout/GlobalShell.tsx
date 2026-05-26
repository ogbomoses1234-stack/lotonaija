import { Outlet } from 'react-router-dom';
import { GlassHeader } from './GlassHeader'; 
import { OfflineBanner } from './OfflineBanner';
import { BottomNavigation } from './BottomNavigation';
import AppFooter from './AppFooter';

/**
 * Root mobile viewport wrapper
 * Enforces max-width constraint, safe-area padding, and persistent UI layers
 */
export const GlobalShell = () => {
  return (
    <div className="relative bg-base-dark min-h-screen flex flex-col   shadow-2xl shadow-black/50">
      <OfflineBanner />
      <GlassHeader />
 
      
      {/* ✅ Removed py-10 and p-0, now just flex-1 */}
      <main className="flex-1 py-10  overflow-y-auto no-pull scroll-smooth">
        <Outlet />
         <AppFooter /> 
      </main>

      <BottomNavigation />
    </div>
  );
};