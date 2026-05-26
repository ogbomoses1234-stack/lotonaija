import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { walletApi } from '@/api/wallet.api';
import type { Transaction } from '@/types/wallet.types';

interface WalletState {
  // ----- state -----
  balance: number;
  transactions: Transaction[];
  isProcessing: boolean;
  error: string | null;

  // ----- actions (now top‑level) -----
  fetchBalance: () => Promise<void>;
  syncTransactions: () => Promise<void>;
  fundWallet: (amount: number) => Promise<boolean>;
  withdraw: (bankCode: string, nuban: string, amount: number) => Promise<boolean>;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      // ----- state -----
      balance: 0,
      transactions: [],
      isProcessing: false,
      error: null,

      // ----- actions -----
      fetchBalance: async () => {
        try {
          const { data } = await walletApi.getBalance();
          // Handle both mock ({ available }) and real ({ balance }) responses
          const newBalance = (data as any).available ?? (data as any).balance ?? 0;
          set({ balance: newBalance });
        } catch (err) {
          set({ error: (err as Error).message });
        }
      },

      syncTransactions: async () => {
        try {
          const { data } = await walletApi.getHistory();
          set({ transactions: data.transactions as unknown as Transaction[] });
        } catch {
          // silent
        }
      },

      fundWallet: async (amount) => {
        set({ isProcessing: true, error: null });
        try {
          const { data } = await walletApi.initiateDeposit({ amount, method: 'paystack' });
          if (import.meta.env.VITE_USE_MOCK_API !== 'false') {
            await walletApi.confirmPayment(data.reference);
          }
          await get().fetchBalance();
          await get().syncTransactions();
          set({ isProcessing: false });
          return true;
        } catch (err) {
          set({ error: (err as Error).message, isProcessing: false });
          return false;
        }
      },

      withdraw: async (bankCode, nuban, amount) => {
        set({ isProcessing: true, error: null });
        try {
          const accountName = 'Verified Account';
          await walletApi.withdraw({ amount, bankCode, nuban, accountName });
          await get().fetchBalance();
          await get().syncTransactions();
          set({ isProcessing: false });
          return true;
        } catch (err) {
          set({ error: (err as Error).message, isProcessing: false });
          return false;
        }
      },
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => sessionStorage),
      // Only persist isProcessing and error; balance always fetched from API
      partialize: (state) => ({
        isProcessing: state.isProcessing,
        error: state.error,
      }),
    }
  )
);

// Auto‑fetch balance on first load (if token exists)
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth_token');
  if (token) {
    useWalletStore.getState().fetchBalance(); // ✅ top‑level now
  }
}