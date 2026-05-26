/**
 * API Configuration: Toggle between mock and real backend
 * 
 * 🎯 PRODUCTION NOTE: Keep USE_MOCK_API = true until real backend is deployed.
 * Change to conditional logic ONLY when your API at https://api.lottong.ng/v1 is live.
 */

// ✅ FIX: Force mock API for BOTH development AND production
// Change this back to conditional logic ONLY when real API is ready:
export const USE_MOCK_API = true; 
// Original conditional (for later): 
// export const USE_MOCK_API = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API !== 'false';

// API base URL (only used when USE_MOCK_API = false)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.lottong.ng/v1';

// Helper to conditionally import mock or real API (kept for future use)
export const getApiModule = async <T>(mockModule: () => Promise<T>, realModule: () => Promise<T>): Promise<T> => {
  if (USE_MOCK_API) {
    console.log('🎭 Using MOCK API');
    return mockModule();
  }
  console.log('🌐 Using REAL API');
  return realModule();
};