/**
 * Validation utilities for form inputs
 * Nigerian-specific validators with TypeScript strict mode
 */

import { validators } from './validators';

/**
 * Validation result type
 */
export type ValidationResult = {
  isValid: boolean;
  error?: string;
  warning?: string;
};

/**
 * Validate Nigerian phone number
 * @param phone - Phone number string (with or without +234)
 */
export const validatePhone = (phone: string): ValidationResult => {
  const cleaned = phone.replace(/^(\+234|0)/, '');
  
  if (!validators.nigerianPhone.test(cleaned)) {
    return {
      isValid: false,
      error: 'Enter a valid 10-digit Nigerian phone number'
    };
  }
  
  if (cleaned.length !== 10) {
    return {
      isValid: false,
      error: 'Phone number must be exactly 10 digits'
    };
  }
  
  return { isValid: true };
};

/**
 * Validate NUBAN bank account number
 * @param nuban - 10-digit NUBAN string
 */
export const validateNuban = (nuban: string): ValidationResult => {
  const cleaned = nuban.replace(/\D/g, '');
  
  if (!validators.nuban.test(cleaned)) {
    return {
      isValid: false,
      error: 'NUBAN must contain only numbers'
    };
  }
  
  if (cleaned.length !== 10) {
    return {
      isValid: false,
      error: 'NUBAN must be exactly 10 digits',
      warning: cleaned.length > 0 ? `${10 - cleaned.length} digits remaining` : undefined
    };
  }
  
  // Luhn algorithm check for NUBAN validity (simplified)
  if (!validators.luhnCheck(cleaned)) {
    return {
      isValid: true, // Allow submission but show warning
      warning: 'Double-check account number for accuracy'
    };
  }
  
  return { isValid: true };
};

/**
 * Validate lottery number selection
 * @param numbers - Array of selected numbers
 * @param config - Validation configuration
 */
export const validateNumberSelection = (
  numbers: number[],
  config: {
    min: number;
    max: number;
    minCount: number;
    maxCount: number;
  }
): ValidationResult => {
  const { min, max, minCount, maxCount } = config;
  
  if (numbers.length < minCount) {
    return {
      isValid: false,
      error: `Select at least ${minCount} numbers`
    };
  }
  
  if (numbers.length > maxCount) {
    return {
      isValid: false,
      error: `Maximum ${maxCount} numbers allowed`
    };
  }
  
  const invalidNumbers = numbers.filter(n => n < min || n > max);
  if (invalidNumbers.length > 0) {
    return {
      isValid: false,
      error: `Numbers must be between ${min} and ${max}`
    };
  }
  
  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size !== numbers.length) {
    return {
      isValid: false,
      error: 'Duplicate numbers not allowed'
    };
  }
  
  return { isValid: true };
};

/**
 * Validate wallet amount for transactions
 * @param amount - Amount in kobo or naira
 * @param config - Validation rules
 */
export const validateAmount = (
  amount: number | string,
  config: {
    min: number;
    max: number;
    currency: 'NGN';
    allowDecimals?: boolean;
  }
): ValidationResult => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const { min, max, allowDecimals = false } = config;
  
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return {
      isValid: false,
      error: 'Enter a valid amount'
    };
  }
  
  if (!allowDecimals && !Number.isInteger(numericAmount)) {
    return {
      isValid: false,
      error: 'Amount must be a whole number'
    };
  }
  
  if (numericAmount < min) {
    return {
      isValid: false,
      error: `Minimum amount is ₦${min.toLocaleString('en-NG')}`
    };
  }
  
  if (numericAmount > max) {
    return {
      isValid: false,
      error: `Maximum amount is ₦${max.toLocaleString('en-NG')}`
    };
  }
  
  return { isValid: true };
};

/**
 * Validate compliance checkbox acceptance
 */
export const validateCompliance = (
  accepted: boolean,
  terms: string[]
): ValidationResult => {
  if (!accepted) {
    return {
      isValid: false,
      error: 'You must accept the terms to continue'
    };
  }
  
  return { isValid: true };
};

/**
 * Validate recipient phone for P2P transfer
 */
export const validateTransferRecipient = (
  phone: string,
  currentUserId: string
): ValidationResult => {
  const phoneValidation = validatePhone(phone);
  if (!phoneValidation.isValid) return phoneValidation;
  
  // Prevent self-transfer
  const cleaned = phone.replace(/^(\+234|0)/, '');
  const currentCleaned = currentUserId.replace(/^(\+234|0)/, '');
  
  if (cleaned === currentCleaned) {
    return {
      isValid: false,
      error: 'Cannot transfer ticket to yourself'
    };
  }
  
  return { isValid: true };
};

/**
 * Compose multiple validators for a single field
 */
export const composeValidators = (
  ...validators: ((value: string) => ValidationResult)[]
) => {
  return (value: string): ValidationResult => {
    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) return result;
    }
    return { isValid: true };
  };
};

/**
 * Async validation wrapper for API-dependent checks
 */
export const asyncValidate = async <T>(
  value: T,
  validator: (value: T) => Promise<ValidationResult>,
  debounceMs: number = 300
): Promise<ValidationResult> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(async () => {
      try {
        const result = await validator(value);
        resolve(result);
      } catch {
        resolve({ isValid: false, error: 'Validation failed' });
      }
    }, debounceMs);
    
    // Allow cancellation if needed
    return () => clearTimeout(timeout);
  });
};