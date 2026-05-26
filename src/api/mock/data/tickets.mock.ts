import type { Ticket } from '@/types/tickets.types';

export const MOCK_ACTIVE_TICKETS: Ticket[] = [
  {
    id: 'ticket_active_001',
    drawId: 'draw_20240524_2000',
    numbers: [7, 14, 23, 31, 42, 49],
    tierId: 'tier-2',
    status: 'active',
    purchasedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'ticket_active_002',
    drawId: 'draw_20240524_2000',
    numbers: [3, 12, 25, 33, 41, 50],
    tierId: 'tier-1',
    status: 'active',
    purchasedAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export const MOCK_HISTORIC_TICKETS: Array<{
  id: string;
  drawId: string;
  numbers: number[];
  result: 'win' | 'loss' | 'partial';
  payout?: number;
  drawnAt: string;
}> = [
  {
    id: 'ticket_hist_001',
    drawId: 'draw_20240523_2000',
    numbers: [5, 11, 22, 35, 44, 48],
    result: 'win',
    payout: 5000,
    drawnAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'ticket_hist_002',
    drawId: 'draw_20240522_2000',
    numbers: [1, 9, 18, 27, 36, 45],
    result: 'loss',
    drawnAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export const MOCK_TRANSFER_RESPONSE = {
  success: true,
  transferId: `transfer_${Date.now()}`,
  recipientId: 'user_recipient_mock',
  executedAt: new Date().toISOString(),
  disclaimerAccepted: true
};