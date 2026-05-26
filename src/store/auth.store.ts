import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '@/api/auth.api';
import type { UserProfile, KYCStatus } from '@/types/auth.types';

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  actions: {
    register: (data: { phone: string; bankCode: string; nuban: string; agreeTerms: boolean }) => Promise<void>;
    fetchProfile: () => Promise<void>;
    logout: () => void;
    updateKYC: (status: KYCStatus) => void;
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
      actions: {
        register: async (data) => {
          set({ isLoading: true, error: null });
          try {
            const { data: res } = await authApi.register(data);
            localStorage.setItem('auth_token', res.token);
            set({ isAuthenticated: true, user: res.user, isLoading: false });
          } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
            throw err;
          }
        },
        fetchProfile: async () => {
          set({ isLoading: true });
          try {
            const { data: user } = await authApi.getProfile();
            set({ isAuthenticated: true, user, isLoading: false });
          } catch {
            localStorage.removeItem('auth_token');
            set({ isAuthenticated: false, user: null, isLoading: false });
          }
        },
        logout: () => {
          localStorage.removeItem('auth_token');
          set({ isAuthenticated: false, user: null, isLoading: false, error: null });
        },
        updateKYC: (status) => set(state => state.user ? { user: { ...state.user, kycStatus: status } } : {})
      }
    }),
{ name: 'auth-storage', storage: createJSONStorage(() => localStorage) }
  )
);