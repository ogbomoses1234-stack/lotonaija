import type { TransferPayload } from '@/types/tickets.types';
import { 
  getActiveTickets, 
  getHistoricTickets,
  removeActiveTicket,
  addHistoricTicket,
 
} from './shared-mock-state'; // ✅ Correct path: same directory (not ../)

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
    
    // ✅ FIX: Add required 'price' property to historic ticket
    addHistoricTicket({
      id: transferredTicket.id,
      drawId: transferredTicket.drawId,
      numbers: transferredTicket.numbers,
      result: 'loss' as const,
      drawnAt: new Date().toISOString(),
      price: transferredTicket.price // ✅ Add price from original ticket
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
    
    // ✅ FIX: Let TypeScript infer types (no explicit annotation needed)
    // getActiveTickets() returns Ticket[], so 't' is inferred as Ticket
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
    
    // ✅ FIX: Same for historic tickets - let TS infer HistoricTicket type
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