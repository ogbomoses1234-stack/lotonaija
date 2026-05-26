import type { TransferPayload, TransferResponse } from '@/types/tickets.types';
import { 
  getActiveTickets, 
  getHistoricTickets,
  removeActiveTicket,
  addHistoricTicket,
  type HistoricTicket
} from './shared-mock-state'; // ✅ Correct path: same directory

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
  
  transferTicket: async (data: TransferPayload): Promise<{ data: TransferResponse }> => {
    await delay(1000);
    
    // Find and remove from active tickets
    const transferredTicket = removeActiveTicket(data.ticketId);
    if (!transferredTicket) throw new Error('Ticket not found');
    
    // Add to historic tickets with transferred status
    addHistoricTicket({
      id: transferredTicket.id,
      drawId: transferredTicket.drawId,
      numbers: transferredTicket.numbers,
      result: 'loss' as const, // Mock result for transferred tickets
      drawnAt: new Date().toISOString(),
      price: transferredTicket.price // ✅ Pass price from original ticket
    });
    
    return {
      data: {
        success: true,
        transferId: `transfer_${Date.now()}`,
        recipientId: 'user_recipient_mock',
        executedAt: new Date().toISOString(),
        disclaimerAccepted: data.confirmIrreversible
      }
    };
  },
  
  getTransferStatus: async (ticketId: string) => {
    await delay(200);
    
    // Let TypeScript infer types from getter return types
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
    
    const historicTicket = getHistoricTickets().find((t: HistoricTicket) => t.id === ticketId);
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