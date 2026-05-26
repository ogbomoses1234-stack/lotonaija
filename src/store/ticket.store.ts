import { create } from 'zustand';
import { lotteryApi, ticketsApi } from '@/api';
import type { PlayMode, Tier } from '@/types/lottery.types'; // ✅ Removed unused TicketSelection
import type { Ticket, TransferPayload } from '@/types/tickets.types';
import { NUMBER_GRID, LOTTERY_TIERS } from '@/utils/constants';
import { generateUniqueNumbers } from '@/utils/math';
import { useWalletStore } from './wallet.store';

interface TicketState {
  playMode: PlayMode;
  activeTier: Tier;
  selectedNumbers: number[];
  activeTickets: Ticket[];
  historicTickets: Ticket[];
  isPurchasing: boolean;
  transferModalOpen: boolean;
  selectedTicketForTransfer: Ticket | null;
  actions: {
    setPlayMode: (mode: PlayMode) => void;
    setTier: (tierId: string) => void;
    toggleNumber: (num: number) => boolean;
    clearNumbers: () => void;
    autoPick: () => void;
    purchase: () => Promise<boolean>;
    fetchTickets: () => Promise<void>;
    openTransfer: (ticket: Ticket) => void;
    closeTransfer: () => void;
    executeTransfer: (payload: TransferPayload) => Promise<boolean>;
  };
}

export const useTicketStore = create<TicketState>()((set, get) => ({
  playMode: 'PICK_NUMBERS',
  activeTier: LOTTERY_TIERS[0],
  selectedNumbers: [],
  activeTickets: [],
  historicTickets: [],
  isPurchasing: false,
  transferModalOpen: false,
  selectedTicketForTransfer: null,
  actions: {
    setPlayMode: (mode) => set({ playMode: mode }),
    setTier: (tierId) => {
      const tier = LOTTERY_TIERS.find(t => t.id === tierId) || LOTTERY_TIERS[0];
      set({ activeTier: tier });
    },
    toggleNumber: (num) => {
      const { selectedNumbers, activeTier } = get();
      if (selectedNumbers.includes(num)) {
        set({ selectedNumbers: selectedNumbers.filter(n => n !== num) });
        return true;
      }
      if (selectedNumbers.length >= activeTier.maxPicks) return false;
      set({ selectedNumbers: [...selectedNumbers, num].sort((a, b) => a - b) });
      return true;
    },
    clearNumbers: () => set({ selectedNumbers: [] }),
    autoPick: () => {
      const { activeTier } = get();
      set({ selectedNumbers: generateUniqueNumbers(activeTier.maxPicks, NUMBER_GRID.min, NUMBER_GRID.max) });
    },
purchase: async () => {
  const { selectedNumbers, activeTier } = get();
  if (selectedNumbers.length === 0) return false;
  
  // ✅ FIX: Flat price per ticket (not multiplied by number count)
  const totalCost = activeTier.price;
  
  const { balance } = useWalletStore.getState();
  if (balance < totalCost) return false;
  
  set({ isPurchasing: true });
  
  try {
    await lotteryApi.purchaseTicket({ 
      tierId: activeTier.id, 
      numbers: selectedNumbers 
    });
    
    // Refresh stores from shared state
    useWalletStore.getState().actions.fetchBalance();
    get().actions.fetchTickets();
    
    set({ selectedNumbers: [], isPurchasing: false });
    return true;
  } catch {
    set({ isPurchasing: false });
    return false;
  }
},
    fetchTickets: async () => {
      try {
        const { data } = await ticketsApi.getMyTickets();
        // ✅ FIX: Cast historic data since mock shape differs from Ticket interface
        set({ 
          activeTickets: data.active as Ticket[], 
          historicTickets: data.history as unknown as Ticket[] 
        });
      } catch { /* silent */ }
    },
    openTransfer: (ticket) => set({ transferModalOpen: true, selectedTicketForTransfer: ticket }),
    closeTransfer: () => set({ transferModalOpen: false, selectedTicketForTransfer: null }),
    executeTransfer: async (payload) => {
      try {
        await ticketsApi.transferTicket(payload);
        set(state => ({
          activeTickets: state.activeTickets.map(t =>
            t.id === payload.ticketId
              ? { ...t, status: 'transferred', transferredTo: { phone: payload.recipientPhone, name: 'Recipient', transferredAt: new Date().toISOString() } }
              : t
          ),
          transferModalOpen: false,
          selectedTicketForTransfer: null
        }));
        return true;
      } catch {
        return false;
      }
    }
  }
}));