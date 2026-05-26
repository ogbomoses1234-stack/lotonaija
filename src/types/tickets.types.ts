export type TicketStatus = 'active' | 'transferred' | 'won' | 'lost' | 'expired' | 'voided';
export type Ticket = {
  id: string;
  drawId: string;
  numbers: number[];
  tierId: string;
  status: 'active' | 'transferred' | 'won' | 'lost' | 'expired' | 'voided';
  purchasedAt: string;
  price: number;
  transferredTo?: {
    phone: string;
    name: string;
    transferredAt: string;
  };
  payout?: number;
  matchedNumbers?: number[];
};

export type TransferPayload = {
  ticketId: string;
  recipientPhone: string;
  confirmIrreversible: boolean;
  deviceFingerprint?: string;
};

export type TransferResponse = {
  success: boolean;
  transferId: string;
  recipientId: string;
  executedAt: string;
  disclaimerAccepted: boolean;
};

export type LedgerTab = 'active' | 'completed';
export type LedgerFilters = {
  tab: LedgerTab;
  searchQuery?: string;
  statusFilter?: TicketStatus;
};