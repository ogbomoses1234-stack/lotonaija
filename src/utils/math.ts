/**
 * Mathematical utilities for lottery calculations
 * All functions are pure and TypeScript strict-mode compliant
 */

/**
 * Generate random integer between min and max (inclusive)
 */
export const randomInt = (min: number, max: number): number => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

/**
 * Generate array of unique random numbers within range
 * @param count - Number of values to generate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Sorted array of unique random numbers
 */
export const generateUniqueNumbers = (
  count: number,
  min: number,
  max: number
): number[] => {
  if (count > max - min + 1) {
    throw new Error(`Cannot generate ${count} unique numbers in range [${min}, ${max}]`);
  }
  
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(randomInt(min, max));
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * Calculate total cost for ticket purchase
 */
export const calculateTicketCost = (
  selectedNumbers: number[],
  tierPrice: number,
  quantity: number = 1
): number => {
  if (selectedNumbers.length === 0) return 0;
  return selectedNumbers.length * tierPrice * quantity;
};

/**
 * Calculate wallet shortfall amount
 * @param totalCost - Total purchase amount
 * @param walletBalance - Current wallet balance
 * @returns Amount needed to complete purchase (0 if sufficient)
 */
export const calculateShortfall = (
  totalCost: number,
  walletBalance: number
): number => {
  return Math.max(0, totalCost - walletBalance);
};

/**
 * Calculate percentage of pool remaining
 */
export const calculatePoolPercentage = (
  remaining: number,
  total: number
): number => {
  if (total === 0) return 0;
  return Math.round((remaining / total) * 100);
};

/**
 * Format countdown milliseconds to MM:SS:MS format
 */
export const formatCountdown = (milliseconds: number): string => {
  if (milliseconds <= 0) return '00:00:00';
  
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  
  return [hours, minutes, seconds]
    .map(val => val.toString().padStart(2, '0'))
    .join(':');
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Calculate probability odds for lottery tier
 */
export const calculateOdds = (
  numbersToPick: number,
  numberPool: number,
  matchesRequired: number
): string => {
  // Simplified combination calculation: C(n,r) = n! / (r! * (n-r)!)
  const combination = (n: number, r: number): number => {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    
    let result = 1;
    for (let i = 0; i < r; i++) {
      result = result * (n - i) / (i + 1);
    }
    return Math.round(result);
  };
  
  const totalCombinations = combination(numberPool, numbersToPick);
  const winningCombinations = combination(numbersToPick, matchesRequired);
  const odds = totalCombinations / winningCombinations;
  
  return `1 in ${odds.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
};

/**
 * Debounce utility for input validation
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle utility for scroll/tick events
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
};