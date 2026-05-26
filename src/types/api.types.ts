/**
 * Standardized REST API response types
 * Enforces consistent error handling and pagination across all endpoints
 */

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  code: string;
  details?: Record<string, unknown>;
  timestamp: string;
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaginatedResponse<T> = {
  success: true;
  data: T[];
  pagination: PaginationMeta;
  message?: string;
};

export type RequestConfig = {
  timeout?: number;
  retries?: number;
  cache?: 'default' | 'no-store' | 'reload' | 'force-cache';
  headers?: Record<string, string>;
};

/**
 * Type guard for API responses
 */
export const isSuccessResponse = <T>(res: ApiResponse<T>): res is ApiSuccessResponse<T> => res.success;
export const isErrorResponse = (res: ApiResponse<unknown>): res is ApiErrorResponse => !res.success;