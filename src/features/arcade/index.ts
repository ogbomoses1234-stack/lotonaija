/**
 * Barrel export for arcade feature components
 * Enables clean imports: `import { ArcadeLounge } from '@/features/arcade'`
 */
export { ArcadeLounge } from './ArcadeLounge';
export { AffiliateScoreboard } from './AffiliateScoreboard';
export { SharingDeck } from './SharingDeck';
export { QuickCopyButton } from './QuickCopyButton';
export { SocialShareIcon } from './SocialShareIcon';
export { InstantPlayGrid } from './InstantPlayGrid';
export { FullscreenArcadeModal } from './FullscreenArcadeModal';

// Default export for lazy loading
export { default } from './ArcadeLounge';