import type { UserProfile, AuthResponse, RegisterPayload } from '@/types/auth.types';

// ============================================================================
// INLINE MOCK DATA (no separate data files needed)
// ============================================================================

const MOCK_USER: UserProfile = {
  id: 'user_mock_123',
  phone: '+2348012345678',
  email: 'chukwudi@example.ng',
  bankCode: '058',
  bankName: 'Guaranty Trust Bank',
  nuban: '0123456789',
  accountName: 'Chukwudi O.',
  kycStatus: 'verified',
  referralCode: 'LOTTO2024',
  createdAt: new Date().toISOString(),
  verifiedAt: new Date().toISOString()
};

const MOCK_AUTH_RESPONSE: AuthResponse = {
  token: 'mock_jwt_token_do_not_use_in_production',
  user: MOCK_USER,
  expiresIn: 3600
};

const MOCK_NUBAN_VERIFY = {
  accountName: 'Chukwudi O.',
  status: 'verified' as const
};

// ============================================================================
// MOCK API IMPLEMENTATION
// ============================================================================

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockAuthApi = {
  register: async (data: RegisterPayload) => {
    await delay(800);
    
    // Simple validation
    if (data.nuban.length !== 10) {
      throw new Error('NUBAN must be 10 digits');
    }
    if (!data.agreeTerms) {
      throw new Error('You must accept the terms to continue');
    }
    
    return { data: MOCK_AUTH_RESPONSE };
  },

  verifyNuban: async (data: { bankCode: string; nuban: string }) => {
    await delay(600);
    
    // Mock verification: accept the demo account
    if (data.nuban === '0123456789') {
      return { data: MOCK_NUBAN_VERIFY };
    }
    
    throw new Error('Account not found');
  },

  getProfile: async () => {
    await delay(300);
    return { data: MOCK_USER };
  },

  updateCompliance: async (accepted: boolean) => {
    await delay(200);
    return { data: { updated: accepted } };
  }
};