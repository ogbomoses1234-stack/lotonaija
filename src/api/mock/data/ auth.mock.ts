import type { UserProfile, AuthResponse } from '@/types/auth.types';

export const MOCK_USER: UserProfile = {
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

export const MOCK_AUTH_RESPONSE: AuthResponse = {
  token: 'mock_jwt_token_do_not_use_in_production',
  user: MOCK_USER,
  expiresIn: 3600
};

export const MOCK_NUBAN_VERIFY = {
  accountName: 'Chukwudi O.',
  status: 'verified' as const
};