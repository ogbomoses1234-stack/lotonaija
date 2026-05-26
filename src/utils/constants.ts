/**
 * Application-wide constants
 * Centralized configuration for lottery platform
 */

/**
 * Nigerian Banks List (Top 20 by volume)
 */
export const NIGERIAN_BANKS = [
  { code: '058', name: 'Guaranty Trust Bank' },
  { code: '011', name: 'First Bank of Nigeria' },
  { code: '033', name: 'Zenith Bank' },
  { code: '057', name: 'Access Bank' },
  { code: '082', name: 'Union Bank' },
  { code: '214', name: 'United Bank for Africa' },
  { code: '070', name: 'Fidelity Bank' },
  { code: '221', name: 'Stanbic IBTC Bank' },
  { code: '039', name: 'Sterling Bank' },
  { code: '063', name: 'Providus Bank' },
  { code: '044', name: 'Ecobank Nigeria' },
  { code: '030', name: 'Heritage Bank' },
  { code: '076', name: 'Wema Bank' },
  { code: '050', name: 'Polaris Bank' },
  { code: '101', name: 'Unity Bank' },
  { code: '084', name: 'Keystone Bank' },
  { code: '301', name: 'Jaiz Bank' },
  { code: '102', name: 'Globus Bank' },
  { code: '090156', name: 'Opay' },
  { code: '090157', name: 'Kuda Bank' }
] as const;

/**
 * Lottery Tier Configurations
 */
export const LOTTERY_TIERS = [
  {
    id: 'tier-1',
    name: 'Bronze',
    price: 200,
    pool: 1_000_000,
    maxPicks: 6,
    color: 'amber'
  },
  {
    id: 'tier-2',
    name: 'Silver',
    price: 500,
    pool: 500_000,
    maxPicks: 6,
    color: 'gray'
  },
  {
    id: 'tier-3',
    name: 'Gold',
    price: 1000,
    pool: 200_000,
    maxPicks: 6,
    color: 'yellow'
  }
] as const;

/**
 * Number Grid Configuration
 */
export const NUMBER_GRID = {
  min: 1,
  max: 50,
  defaultMaxSelection: 6,
  cols: { mobile: 5, desktop: 6 }
} as const;

/**
 * Wallet Configuration
 */
export const WALLET_CONFIG = {
  currency: 'NGN',
  currencySymbol: '₦',
  minDeposit: 500,
  maxDeposit: 1_000_000,
  minWithdrawal: 1000,
  maxWithdrawal: 500_000,
  quickFundAmounts: [500, 1000, 2000, 5000, 10000],
  withdrawalFee: 0, // Free withdrawals
  processingTime: '24-48 hours'
} as const;

/**
 * Ticket Transfer Configuration
 */
export const TRANSFER_CONFIG = {
  enabled: true,
  deadlineBeforeDraw: 30 * 60 * 1000, // 30 minutes in ms
  maxTransfersPerTicket: 1,
  confirmationRequired: true,
  disclaimer: 'Transferring a ticket permanently reassigns ownership. Future winnings will be paid to the recipient\'s wallet. This action cannot be undone.'
} as const;

/**
 * Draw Schedule Configuration
 */
export const DRAW_SCHEDULE = {
  frequency: 'daily',
  drawTime: '20:00', // 8 PM WAT
  timezone: 'Africa/Lagos',
  cutoffMinutes: 15 // Stop sales 15 mins before draw
} as const;

/**
 * Affiliate Program Configuration
 */
export const AFFILIATE_CONFIG = {
  commissionRate: 0.10, // 10% of referred user's spend
  minPayout: 5000,
  payoutFrequency: 'weekly',
  referralCodeLength: 8,
  bonusForFirstDeposit: 500
} as const;

/**
 * Arcade Games Configuration
 */
export const ARCADE_GAMES = [
  {
    id: 'scratch-mini',
    name: 'Mini Scratch',
    price: 100,
    maxWin: 5000,
    type: 'instant'
  },
  {
    id: 'lucky-spin',
    name: 'Lucky Spin',
    price: 200,
    maxWin: 10000,
    type: 'wheel'
  },
  {
    id: 'quick-pick',
    name: 'Quick Pick',
    price: 150,
    maxWin: 7500,
    type: 'instant'
  }
] as const;

/**
 * UI/UX Constants
 */
export const UI_CONSTANTS = {
  borderRadius: '30px',
  glassBlur: '12px',
  animationFast: 150,
  animationNormal: 300,
  animationSlow: 500,
  debounceInput: 300,
  throttleScroll: 100,
  hapticDuration: 15,
  maxMobileWidth: 480,
  safeAreaPadding: 16
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://api.lottong.ng/v1',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
  endpoints: {
    auth: {
      register: '/auth/register',
      login: '/auth/login',
      verify: '/auth/verify',
      profile: '/auth/profile'
    },
    lottery: {
      tiers: '/draws/tiers',
      active: '/draws/active',
      purchase: '/tickets/purchase',
      results: '/draws/results'
    },
    wallet: {
      balance: '/wallet/balance',
      fund: '/wallet/fund',
      withdraw: '/wallet/withdraw',
      history: '/wallet/history'
    },
    tickets: {
      list: '/tickets',
      transfer: '/tickets/transfer',
      status: '/tickets/status'
    },
    arcade: {
      games: '/arcade/games',
      play: '/arcade/play',
      referrals: '/referrals'
    }
  }
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  network: 'No internet connection. Please check your network settings.',
  auth: {
    invalidPhone: 'Invalid phone number format',
    invalidNuban: 'Invalid account number',
    unverified: 'Account verification required',
    sessionExpired: 'Session expired. Please log in again.'
  },
  wallet: {
    insufficient: 'Insufficient wallet balance',
    limit: 'Transaction exceeds daily limit',
    processing: 'Transaction still processing'
  },
  tickets: {
    soldOut: 'This tier is sold out',
    drawClosed: 'Sales closed for this draw',
    alreadyTransferred: 'Ticket already transferred',
    transferDeadline: 'Transfer deadline passed'
  },
  generic: 'An unexpected error occurred. Please try again.'
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  registered: 'Account created successfully!',
  verified: 'Account verified. Welcome!',
  purchased: 'Ticket purchased! Good luck! 🍀',
  transferred: 'Ticket transferred successfully',
  funded: 'Wallet funded successfully',
  withdrawn: 'Withdrawal request submitted'
} as const;

/**
 * Feature Flags (for gradual rollout)
 */
export const FEATURE_FLAGS = {
  enableScratchCards: true,
  enableP2PTransfer: true,
  enableArcade: true,
  enableAffiliate: true,
  enableBiometricAuth: false,
  enablePushNotifications: false
} as const;

export default {
  NIGERIAN_BANKS,
  LOTTERY_TIERS,
  NUMBER_GRID,
  WALLET_CONFIG,
  TRANSFER_CONFIG,
  DRAW_SCHEDULE,
  AFFILIATE_CONFIG,
  ARCADE_GAMES,
  UI_CONSTANTS,
  API_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS
};