/**
 * Shared mock state for development
 * Centralizes in-memory data so API mocks and stores stay in sync
 */
import type { Transaction } from '@/types/wallet.types';
import type { Ticket } from '@/types/tickets.types';

// ============================================================================
// TYPE EXPORTS
// ============================================================================
export type HistoricTicket = {
  id: string;
  drawId: string;
  numbers: number[];
  result: 'win' | 'loss' | 'partial';
  payout?: number;
  drawnAt: string;
  price: number; // ✅ Required for consistency with Ticket interface
};

// ============================================================================
// WALLET STATE
// ============================================================================
export let mockWalletBalance = 15000; // NGN starting balance

export let mockTransactions: Transaction[] = [
  {
    id: 'tx_001',
    date: new Date(Date.now() - 86400000).toISOString(),
    type: 'deposit',
    amount: 10000,
    status: 'completed',
    reference: 'REF_DEP_001',
    description: 'Wallet funding via Paystack',
    color: 'green'
  },
  {
    id: 'tx_002',
    date: new Date(Date.now() - 43200000).toISOString(),
    type: 'purchase',
    amount: -1200,
    status: 'completed',
    reference: 'REF_TKT_001',
    description: 'Lottery ticket purchase',
    color: 'red'
  }
];

// ============================================================================
// TICKET STATE
// ============================================================================
export let mockActiveTickets: Ticket[] = [
  {
    id: 'ticket_active_001',
    drawId: 'draw_20240524_2000',
    numbers: [7, 14, 23, 31, 42, 49],
    tierId: 'tier-2',
    status: 'active',
    purchasedAt: new Date(Date.now() - 3600000).toISOString(),
    price: 500 // ✅ Matches tier-2/Silver price
  }
];

export let mockHistoricTickets: HistoricTicket[] = [
  {
    id: 'ticket_hist_001',
    drawId: 'draw_20240523_2000',
    numbers: [5, 11, 22, 35, 44, 48],
    result: 'win',
    payout: 5000,
    drawnAt: new Date(Date.now() - 86400000).toISOString(),
    price: 500 // ✅ Consistent with active ticket pricing
  }
];

// ============================================================================
// ARCADE STATE
// ============================================================================
export let mockAffiliateMetrics = {
  clicks: 247,
  signups: 18,
  activeReferrals: 12,
  totalCommission: 8500,
  pendingPayout: 2500,
  referralCode: 'LOTTO2024',
  conversionRate: 0.073
};

// ============================================================================
// UTILITIES - State Mutations
// ============================================================================
export const addTransaction = (tx: Omit<Transaction, 'id'>) => {
  const newTx: Transaction = {
    ...tx,
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  };
  mockTransactions.unshift(newTx);
  return newTx;
};

export const deductBalance = (amount: number) => {
  mockWalletBalance = Math.max(0, mockWalletBalance - amount);
  return mockWalletBalance;
};

export const addBalance = (amount: number) => {
  mockWalletBalance += amount;
  return mockWalletBalance;
};

export const addActiveTicket = (ticket: Ticket) => {
  mockActiveTickets.unshift(ticket);
  return ticket;
};

export const removeActiveTicket = (ticketId: string) => {
  const index = mockActiveTickets.findIndex(t => t.id === ticketId);
  if (index !== -1) {
    return mockActiveTickets.splice(index, 1)[0];
  }
  return null;
};

export const addHistoricTicket = (ticket: HistoricTicket) => {
  mockHistoricTickets.unshift(ticket);
  return ticket;
};

// ============================================================================
// GETTERS - Return copies to prevent direct mutation
// ============================================================================
export const getActiveTickets = (): Ticket[] => [...mockActiveTickets];
export const getHistoricTickets = (): HistoricTicket[] => [...mockHistoricTickets];
export const getBalance = (): number => mockWalletBalance;
export const getTransactions = (): Transaction[] => [...mockTransactions];
export const getAffiliateMetrics = () => ({ ...mockAffiliateMetrics });

// ============================================================================
// RESET - For testing purposes
// ============================================================================
export const resetMockState = () => {
  mockWalletBalance = 15000;
  
  mockTransactions = [
    {
      id: 'tx_001',
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'deposit',
      amount: 10000,
      status: 'completed',
      reference: 'REF_DEP_001',
      description: 'Wallet funding via Paystack',
      color: 'green'
    },
    {
      id: 'tx_002',
      date: new Date(Date.now() - 43200000).toISOString(),
      type: 'purchase',
      amount: -1200,
      status: 'completed',
      reference: 'REF_TKT_001',
      description: 'Lottery ticket purchase',
      color: 'red'
    }
  ];
  
  mockActiveTickets = [
    {
      id: 'ticket_active_001',
      drawId: 'draw_20240524_2000',
      numbers: [7, 14, 23, 31, 42, 49],
      tierId: 'tier-2',
      status: 'active',
      purchasedAt: new Date(Date.now() - 3600000).toISOString(),
      price: 500
    }
  ];
  
  mockHistoricTickets = [
    {
      id: 'ticket_hist_001',
      drawId: 'draw_20240523_2000',
      numbers: [5, 11, 22, 35, 44, 48],
      result: 'win',
      payout: 5000,
      drawnAt: new Date(Date.now() - 86400000).toISOString(),
      price: 500
    }
  ];
};