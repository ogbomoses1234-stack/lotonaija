import {   USE_MOCK_API } from './config';
import type { UserProfile, AuthResponse, RegisterPayload } from '@/types/auth.types';

// Real API client (only imported when not using mock)
const getRealClient = () => import('./client').then(mod => mod.default);

export const authApi = {
  register: async (data: RegisterPayload) => {
    if (USE_MOCK_API) {
      const { mockAuthApi } = await import('./mock/auth.mock.api');
      return mockAuthApi.register(data);
    }
    const client = await getRealClient();
    return client.post<AuthResponse>('/auth/register', data);
  },

  verifyNuban: async (data: { bankCode: string; nuban: string }) => {
    if (USE_MOCK_API) {
      const { mockAuthApi } = await import('./mock/auth.mock.api');
      return mockAuthApi.verifyNuban(data);
    }
    const client = await getRealClient();
    return client.post<{ accountName: string; status: 'verified' | 'invalid' }>('/auth/verify-nuban', data);
  },

  getProfile: async () => {
    if (USE_MOCK_API) {
      const { mockAuthApi } = await import('./mock/auth.mock.api');
      return mockAuthApi.getProfile();
    }
    const client = await getRealClient();
    return client.get<UserProfile>('/auth/profile');
  },

  updateCompliance: async (accepted: boolean) => {
    if (USE_MOCK_API) {
      const { mockAuthApi } = await import('./mock/auth.mock.api');
      return mockAuthApi.updateCompliance(accepted);
    }
    const client = await getRealClient();
    return client.patch<{ updated: boolean }>('/auth/compliance', { accepted });
  }
};