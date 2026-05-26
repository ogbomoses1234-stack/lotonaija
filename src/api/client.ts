// No changes needed - this file is only used when real API is enabled
import axios, { 
  type AxiosInstance, 
  type InternalAxiosRequestConfig, 
  type AxiosError, 
  type AxiosResponse 
} from 'axios';
import { API_CONFIG, ERROR_MESSAGES } from '@/utils/constants';

/**
 * Centralized Axios client with interceptors for auth, error handling, and timeouts
 * Optimized for mobile networks with retry-ready structure
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Platform': 'web',
    'X-App-Version': import.meta.env.VITE_APP_VERSION || '1.0.0'
  },
});

// Request Interceptor: Inject Auth Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(new Error(error.message || 'Request failed'))
);

// Response Interceptor: Error Formatting & 401 Handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    // Session expired or invalid token
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth';
      }
      return Promise.reject(new Error(ERROR_MESSAGES.auth.sessionExpired));
    }

    // Network or server error formatting
    const message = error.response?.data?.message || error.message || ERROR_MESSAGES.generic;
    return Promise.reject(new Error(message));
  }
);

export default apiClient;