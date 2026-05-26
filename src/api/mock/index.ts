/**
 * Mock API barrel export
 * Drop-in replacement for real API modules during development
 */
export { mockAuthApi as authApi } from './auth.mock.api';
export { mockLotteryApi as lotteryApi } from './lottery.mock.api';
export { mockWalletApi as walletApi } from './wallet.mock.api';
export { mockTicketsApi as ticketsApi } from './tickets.mock.api';
export { mockArcadeApi as arcadeApi } from './arcade.mock.api';

// Re-export types for convenience
export type { UserProfile, AuthResponse } from '@/types/auth.types';
export type { Tier, DrawState } from '@/types/lottery.types';
export type { WalletBalance, Transaction } from '@/types/wallet.types';
export type { Ticket } from '@/types/tickets.types';
export type { ArcadeGame, AffiliateMetric } from '@/types/arcade.types';