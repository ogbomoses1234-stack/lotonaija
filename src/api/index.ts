/**
 * Barrel export for all API modules
 * Enables clean imports: `import { lotteryApi, ticketsApi } from '@/api'`
 */
export { default as apiClient } from './client';
export { authApi } from './auth.api';
export { lotteryApi } from './lottery.api';
export { walletApi } from './wallet.api';
export { ticketsApi } from './tickets.api';
export { arcadeApi } from './arcade.api';

// Re-export common types for convenience (optional)
export type { 
  UserProfile, AuthResponse, RegisterPayload 
} from '@/types/auth.types';
export type { 
  Tier, DrawState, TicketSelection, PlayMode 
} from '@/types/lottery.types';
export type { 
  WalletBalance, Transaction, FundRequest, WithdrawRequest 
} from '@/types/wallet.types';
export type { 
  Ticket, TransferPayload, TransferResponse 
} from '@/types/tickets.types';
export type { 
  ArcadeGame, InstantWinResult, AffiliateMetric 
} from '@/types/arcade.types';