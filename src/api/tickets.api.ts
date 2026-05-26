import { USE_MOCK_API } from './config';
import type { TransferPayload } from '@/types/tickets.types';
import apiClient from './client';
import { mockTicketsApi } from './mock/tickets.mock.api';

export const ticketsApi = {
  getMyTickets: async () => {
    if (USE_MOCK_API) return mockTicketsApi.getMyTickets();
    return apiClient.get<{
      active: Array<{
        id: string;
        drawId: string;
        numbers: number[];
        tierId: string;
        status: 'active' | 'transferred';
        purchasedAt: string;
        transferredTo?: { phone: string; name: string; transferredAt: string };
      }>;
      history: Array<{
        id: string;
        drawId: string;
        numbers: number[];
        result: 'win' | 'loss' | 'partial';
        payout?: number;
        drawnAt: string;
      }>;
    }>('/tickets');
  },

  transferTicket: async (data: TransferPayload) => {
    if (USE_MOCK_API) return mockTicketsApi.transferTicket(data);
    return apiClient.post<{
      success: boolean;
      transferId: string;
      recipientId: string;
      executedAt: string;
      disclaimerAccepted: boolean;
    }>('/tickets/transfer', data);
  },

  getTransferStatus: async (ticketId: string) => {
    if (USE_MOCK_API) return mockTicketsApi.getTransferStatus(ticketId);
    return apiClient.get<{ 
      status: string; 
      recipientPhone: string; 
      transferredAt: string 
    }>('/tickets/transfer/status', { 
      params: { ticketId } 
    });
  }
};