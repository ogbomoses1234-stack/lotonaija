/**
 * Authentication, KYC, and user profile types
 */

export type KYCStatus = 'pending' | 'verified' | 'rejected' | 'expired';
export type AuthStep = 'phone' | 'bank' | 'nuban' | 'compliance' | 'otp';

export interface UserProfile {
  id: string;
  phone: string;
  email?: string;
  bankCode: string;
  bankName: string;
  nuban: string;
  accountName: string;
  kycStatus: KYCStatus;
  referralCode: string;
  createdAt: string;
  verifiedAt?: string;
}

export interface RegisterPayload {
  phone: string;
  bankCode: string;
  nuban: string;
  agreeTerms: boolean;
  referralCode?: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
  refreshToken?: string;
  expiresIn: number;
}

export interface ComplianceCheck {
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  agreedToResponsibleGaming: boolean;
  acceptedAt: string;
}