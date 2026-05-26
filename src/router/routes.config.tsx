import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
export interface RouteMeta extends Omit<RouteObject, 'element' | 'children'> {
  /** URL path for this route */
  path: string;
  
  /** Requires authentication to access */
  requiresAuth?: boolean;
  
  /** Requires verified KYC status to access */
  requiresKYC?: boolean;
  
  /** Human-readable label for UI/navigation */
  label: string;
  
  /** Optional icon for bottom navigation */
  icon?: ReactNode;
  
  /** Layout wrapper: 'shell' = GlobalShell, 'blank' = standalone */
  layout?: 'shell' | 'blank';
  
  /** 
   * Component identifier string (NOT JSX element)
   * Must match a key in the componentMap in index.tsx
   */
  component: RouteComponentKey;
}

// ============================================================================
// COMPONENT KEY UNION TYPE
// Ensures type safety: only valid component names can be assigned
// ============================================================================

export type RouteComponentKey =
  | 'LotteryHub'
  | 'TicketLedger'
  | 'WalletCenter'
  | 'ArcadeLounge'
  | 'OnboardingForm'
  // ✅ Add new keys:
  | 'NotificationsCenter'
  | 'ResultsStats'
  | 'ReferralProgram'
  | 'SecurityPrivacy'
  | 'AppSettings'
  | 'ProfileCenter'
  |  'TermsPage' 
  | 'PrivacyPage'
  | 'ResponsibleGamingPage'
  | 'SupportPage';
export const routeConfig: RouteMeta[] = [
  {
    path: '/terms',
    component: 'TermsPage',
    requiresAuth: false,
    requiresKYC: false,
    label: 'Terms',
    layout: 'shell'
  },
  {
    path: '/privacy',
    component: 'PrivacyPage',
    requiresAuth: false,
    requiresKYC: false,
    label: 'Privacy',
    layout: 'shell'
  },
  {
    path: '/responsible-gaming',
    component: 'ResponsibleGamingPage',
    requiresAuth: false,
    requiresKYC: false,
    label: 'Responsible Gaming',
    layout: 'shell'
  },
  {
    path: '/support',
    component: 'SupportPage',
    requiresAuth: false,
    requiresKYC: false,
    label: 'Support',
    layout: 'shell'
  },
   {
    path: '/notifications',
    component: 'NotificationsCenter',
    requiresAuth: true,
    requiresKYC: false,
    label: 'Notifications',
    layout: 'shell'
  },
  {
    path: '/stats',
    component: 'ResultsStats',
    requiresAuth: true,
    requiresKYC: false,
    label: 'Stats',
    layout: 'shell'
  },
  {
    path: '/referrals',
    component: 'ReferralProgram',
    requiresAuth: true,
    requiresKYC: false,
    label: 'Referrals',
    layout: 'shell'
  },
  {
    path: '/security',
    component: 'SecurityPrivacy',
    requiresAuth: true,
    requiresKYC: true,
    label: 'Security',
    layout: 'shell'
  },
  {
    path: '/settings',
    component: 'AppSettings',
    requiresAuth: true,
    requiresKYC: false,
    label: 'Settings',
    layout: 'shell'
  },
  {
    path: '/profile',
    component: 'ProfileCenter',
    requiresAuth: true,
    requiresKYC: false,
    label: 'Account',
    icon: null,
    layout: 'shell'
  },
  {
    path: '/',
    component: 'LotteryHub', // ✅ String key, NOT <LotteryHub />
    requiresAuth: true,
    requiresKYC: true,
    label: 'Play',
    icon: null, // Optional: define SVG icon component in index.tsx if needed
    layout: 'shell'
  },
  {
    path: '/tickets',
    component: 'TicketLedger',
    requiresAuth: true,
    requiresKYC: false,
    label: 'Tickets',
    icon: null,
    layout: 'shell'
  },
  {
    path: '/wallet',
    component: 'WalletCenter',
    requiresAuth: true,
    requiresKYC: true,
    label: 'Wallet',
    icon: null,
    layout: 'shell'
  },
  {
    path: '/arcade',
    component: 'ArcadeLounge',
    requiresAuth: true,
    requiresKYC: false,
    label: 'Arcade',
    icon: null,
    layout: 'shell'
  },
  {
    path: '/auth',
    component: 'OnboardingForm',
    requiresAuth: false,
    requiresKYC: false,
    label: 'Auth',
    icon: null,
    layout: 'blank'
  }
];

// ============================================================================
// UTILITY FUNCTIONS (optional but helpful)
// ============================================================================

/**
 * Get route config by path
 */
export const getRouteByPath = (path: string): RouteMeta | undefined => {
  return routeConfig.find(route => route.path === path);
};

/**
 * Get all routes that require auth
 */
export const getProtectedRoutes = (): RouteMeta[] => {
  return routeConfig.filter(route => route.requiresAuth);
};

/**
 * Get all routes that use the shell layout
 */
export const getShellRoutes = (): RouteMeta[] => {
  return routeConfig.filter(route => route.layout === 'shell');
};

/**
 * Validate that a component key exists in the union type
 * (TypeScript enforces this at compile time, but useful for runtime checks)
 */
export const isValidComponentKey = (key: string): key is RouteComponentKey => {
  const validKeys: RouteComponentKey[] = [
    'LotteryHub',
    'TicketLedger', 
    'WalletCenter',
    'ArcadeLounge',
    'OnboardingForm'
  ];
  return validKeys.includes(key as RouteComponentKey);
};

// ============================================================================
// DEFAULT EXPORT (for barrel export convenience)
// ============================================================================

export default routeConfig;