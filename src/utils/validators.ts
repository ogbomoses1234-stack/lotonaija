/**
 * Low-level validator patterns and helper functions
 * Exported for composition in validations.ts
 */

/**
 * Nigerian phone number pattern (10 digits after country code)
 * Matches: 08012345678, +2348012345678, 2348012345678
 */
export const nigerianPhone = /^\d{10}$/;

/**
 * NUBAN account number pattern (exactly 10 digits)
 */
export const nuban = /^\d{10}$/;

/**
 * Nigerian bank code pattern (3 digits)
 */
export const bankCode = /^\d{3}$/;

/**
 * Draw ID pattern (alphanumeric, 8-12 chars)
 */
export const drawId = /^[A-Z0-9]{8,12}$/;

/**
 * Ticket ID pattern (UUID-like format)
 */
export const ticketId = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

/**
 * Amount pattern for NGN (allows decimals up to 2 places)
 */
export const ngnAmount = /^\d+(\.\d{1,2})?$/;

/**
 * Luhn algorithm check for card/account number validation
 * Simplified for NUBAN verification
 */
export const luhnCheck = (value: string): boolean => {
  let sum = 0;
  let shouldDouble = false;
  
  // Process from right to left
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

/**
 * Check if string is a valid Nigerian bank name
 */
export const isValidBankName = (bank: string, allowedBanks: string[]): boolean => {
  const normalized = bank.trim().toLowerCase();
  return allowedBanks.some(b => b.toLowerCase() === normalized);
};

/**
 * Validate lottery number is within pool range
 */
export const isValidLotteryNumber = (
  num: number,
  min: number,
  max: number
): boolean => {
  return Number.isInteger(num) && num >= min && num <= max;
};

/**
 * Check if array has unique values
 */
export const hasUniqueValues = <T>(arr: T[]): boolean => {
  return new Set(arr).size === arr.length;
};

/**
 * Validate timestamp is in future
 */
export const isFutureTimestamp = (timestamp: number): boolean => {
  return timestamp > Date.now();
};

/**
 * Validate URL is safe (basic check)
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validate referral code format
 */
export const isValidReferralCode = (code: string): boolean => {
  return /^[A-Z0-9]{6,10}$/.test(code.toUpperCase());
};

/**
 * Sanitize user input for XSS prevention
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 500); // Limit length
};

/**
 * Validate password strength (for account creation)
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Minimum 8 characters required');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('At least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('At least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('At least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Check if network is likely available (basic heuristic)
 */
export const isNetworkLikelyAvailable = (): boolean => {
  return navigator.onLine && 
         navigator.connection?.effectiveType !== 'slow-2g';
};

export default {
  nigerianPhone,
  nuban,
  bankCode,
  drawId,
  ticketId,
  ngnAmount,
  luhnCheck,
  isValidBankName,
  isValidLotteryNumber,
  hasUniqueValues,
  isFutureTimestamp,
  isValidUrl,
  isValidReferralCode,
  sanitizeInput,
  validatePassword,
  isNetworkLikelyAvailable
};