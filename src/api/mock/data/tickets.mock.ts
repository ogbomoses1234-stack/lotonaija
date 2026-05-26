import type { TransferPayload } from '@/types/tickets.types';
// ✅ Import Ticket type for active tickets (optional but helpful for clarity)

import { addHistoricTicket, getActiveTickets, getHistoricTickets, removeActiveTicket } from '../shared-mock-state';

// ✅ FIX 1: Correct import path - same directory uses './' not '../'
 

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockTicketsApi = {
  getMyTickets: async () => {
    await delay(300);
    return {
      data: {
        active: getActiveTickets(),
        history: getHistoricTickets()
      }
    };
  },
  transferTicket: async (data: TransferPayload) => {
    await delay(1000);
    const transferredTicket = removeActiveTicket(data.ticketId);
    if (!transferredTicket) throw new Error('Ticket not found');
    
    // ✅ FIX 2: Add required 'price' property when creating historic ticket
    addHistoricTicket({
      id: transferredTicket.id,
      drawId: transferredTicket.drawId,
      numbers: transferredTicket.numbers,
      result: 'loss' as const,
      drawnAt: new Date().toISOString(),
      price: transferredTicket.price // ✅ Pass price from original active ticket
    });
    
    return {
      data: {
        success: true,
        transferId: `transfer_${Date.now()}`,
        recipientId: 'user_recipient_mock',
        executedAt: new Date().toISOString(),
        disclaimerAccepted: true
      }
    };
  },
  getTransferStatus: async (ticketId: string) => {
    await delay(200);
    
    // ✅ FIX 3: Let TypeScript infer type - getActiveTickets() returns Ticket[]
    // So 't' is automatically inferred as Ticket, no annotation needed
    const activeTicket = getActiveTickets().find(t => t.id === ticketId);
    
    if (activeTicket) {
      return {
        data: {
          status: activeTicket.status,
          recipientPhone: (activeTicket as any).transferredTo?.phone || '',
          transferredAt: (activeTicket as any).transferredTo?.transferredAt || activeTicket.purchasedAt
        }
      };
    }
    
    // ✅ FIX 4: Same for historic tickets - getHistoricTickets() returns HistoricTicket[]
    // So 't' is automatically inferred as HistoricTicket
    const historicTicket = getHistoricTickets().find(t => t.id === ticketId);
    
    if (historicTicket) {
      return {
        data: { 
          status: 'completed', 
          recipientPhone: '', 
          transferredAt: historicTicket.drawnAt 
        }
      };
    }
    
    throw new Error('Ticket not found');
  }
};

export const MOCK_TRANSFER_RESPONSE = {
  success: true,
  transferId: `transfer_${Date.now()}`,
  recipientId: 'user_recipient_mock',
  executedAt: new Date().toISOString(),
  disclaimerAccepted: true
};