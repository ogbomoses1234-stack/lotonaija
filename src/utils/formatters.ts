/**
 * Formatting utilities for display values
 * Nigerian locale (NGN) focused with TypeScript strict mode
 */

import { WALLET_CONFIG } from './constants';

/**
 * Format NGN currency amount
 * @param amount - Amount in naira (number) or kobo (if isKobo=true)
 * @param options - Formatting options
 */
export const formatNGN = (
  amount: number,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    isKobo?: boolean;
    locale?: string;
  } = {}
): string => {
  const {
    showSymbol = true,
    showDecimals = false,
    isKobo = false,
    locale = 'en-NG'
  } = options;
  
  // Convert kobo to naira if needed
  const nairaAmount = isKobo ? amount / 100 : amount;
  
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  }).format(nairaAmount);
  
  return showSymbol ? `${WALLET_CONFIG.currencySymbol}${formatted}` : formatted;
};

/**
 * Format phone number to Nigerian format
 * @param phone - Raw phone digits (10 digits)
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '').slice(-10);
  
  if (cleaned.length !== 10) return phone;
  
  // Format as 080X XXX XXXX
  return `0${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
};

/**
 * Format phone for international display
 */
export const formatPhoneInternational = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '').slice(-10);
  
  if (cleaned.length !== 10) return phone;
  
  return `+234 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
};

/**
 * Format NUBAN with spacing for readability
 */
export const formatNuban = (nuban: string): string => {
  const cleaned = nuban.replace(/\D/g, '');
  
  if (cleaned.length !== 10) return nuban;
  
  // Format as XXXX XXX XXX
  return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
};

/**
 * Format draw countdown timestamp
 */
export const formatDrawCountdown = (drawTimestamp: number): string => {
  const now = Date.now();
  const diff = drawTimestamp - now;
  
  if (diff <= 0) return 'Drawing now!';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

/**
 * Format date for Nigerian locale
 * ✅ FIXED: Handles null/undefined/invalid dates gracefully
 */
export const formatDateNG = (
  date: Date | string | number | null | undefined, // ✅ Allow null/undefined
  options: {
    showTime?: boolean;
    relative?: boolean;
  } = {}
): string => {
  // ✅ FIX: Handle null/undefined gracefully
  if (date == null) return '—';
  
  const { showTime = false, relative = false } = options;
  const inputDate = new Date(date);
  
  // ✅ FIX: Check for Invalid Date (NaN timestamp)
  if (isNaN(inputDate.getTime())) {
    console.warn('Invalid date passed to formatDateNG:', date);
    return '—';
  }
  
  if (relative) {
    const now = new Date();
    const diffMs = now.getTime() - inputDate.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
  }
  
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: showTime ? 'numeric' : undefined,
    minute: showTime ? '2-digit' : undefined,
    hour12: true
  }).format(inputDate);
};

/**
 * Format ticket numbers for display
 */
export const formatTicketNumbers = (
  numbers: number[],
  options: {
    delimiter?: string;
    prefix?: string;
    maxDisplay?: number;
  } = {}
): string => {
  const {
    delimiter = ' • ',
    prefix = '',
    maxDisplay = 6
  } = options;
  
  const displayNumbers = numbers.slice(0, maxDisplay);
  const formatted = displayNumbers.map(n => n.toString().padStart(2, '0'));
  
  if (numbers.length > maxDisplay) {
    formatted.push(`+${numbers.length - maxDisplay}`);
  }
  
  return `${prefix}${formatted.join(delimiter)}`;
};

/**
 * Format percentage with visual indicator
 */
export const formatPercentage = (
  value: number,
  options: {
    showSymbol?: boolean;
    decimals?: number;
    colorize?: boolean;
  } = {}
): string => {
  const {
    showSymbol = true,
    decimals = 0,
    colorize = false
  } = options;
  
  const formatted = value.toFixed(decimals);
  const symbol = showSymbol ? '%' : '';
  
  if (colorize) {
    if (value >= 80) return `🔥 ${formatted}${symbol}`;
    if (value >= 50) return `⚡ ${formatted}${symbol}`;
    return `${formatted}${symbol}`;
  }
  
  return `${formatted}${symbol}`;
};

/**
 * Format pool size with abbreviation
 */
export const formatPoolSize = (count: number): string => {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toLocaleString('en-NG');
};

/**
 * Format transaction type for history display
 */
export const formatTransactionType = (type: string): string => {
  const types: Record<string, string> = {
    deposit: '💰 Deposit',
    withdrawal: '🏦 Withdrawal',
    purchase: '🎫 Ticket Purchase',
    win: '🎉 Prize Won',
    transfer_sent: '📤 Transfer Sent',
    transfer_received: '📥 Transfer Received',
    affiliate: '🤝 Commission',
    refund: '↩️ Refund'
  };
  
  return types[type] || type;
};

/**
 * Format transaction amount with color indicator
 */
export const formatTransactionAmount = (
  amount: number,
  type: 'credit' | 'debit' | 'neutral'
): { text: string; className: string } => {
  const formatted = formatNGN(Math.abs(amount), { showDecimals: false });
  
  const styles = {
    credit: 'text-brand-success',
    debit: 'text-red-400',
    neutral: 'text-white/80'
  };
  
  const prefix = type === 'credit' ? '+' : type === 'debit' ? '−' : '';
  
  return {
    text: `${prefix}${formatted}`,
    className: styles[type]
  };
};

/**
 * Format referral code for display
 */
export const formatReferralCode = (code: string): string => {
  return code.toUpperCase().replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Format bank name with code
 */
export const formatBank = (name: string, code?: string): string => {
  return code ? `${name} (${code})` : name;
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (
  text: string,
  maxLength: number,
  options: {
    suffix?: string;
    position?: 'end' | 'middle';
  } = {}
): string => {
  const { suffix = '...', position = 'end' } = options;
  
  if (text.length <= maxLength) return text;
  
  if (position === 'middle') {
    const half = Math.floor((maxLength - suffix.length) / 2);
    return `${text.slice(0, half)}${suffix}${text.slice(-half)}`;
  }
  
  return `${text.slice(0, maxLength - suffix.length)}${suffix}`;
};

/**
 * Format error message for display
 */
export const formatError = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return 'An unexpected error occurred';
};

export default {
  formatNGN,
  formatPhone,
  formatPhoneInternational,
  formatNuban,
  formatDrawCountdown,
  formatDateNG,
  formatTicketNumbers,
  formatPercentage,
  formatPoolSize,
  formatTransactionType,
  formatTransactionAmount,
  formatReferralCode,
  formatBank,
  truncate,
  formatError
};