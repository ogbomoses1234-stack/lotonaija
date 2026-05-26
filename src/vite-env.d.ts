/// <reference types="vite/client" />

/**
 * Environment variables type declarations
 * Add your VITE_ prefixed env vars here for type safety
 */

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PAYSTACK_PUBLIC_KEY: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_DRAW_SCHEDULE: string;
  // ✅ ADD: Mock API toggle
  readonly VITE_USE_MOCK_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Global type extensions for the application
 */

declare global {
  interface Window {
    // Paystack/Flutterwave SDK globals
    PaystackPop?: {
      setup: (config: Record<string, unknown>) => {
        openPopup: () => void;
        close: () => void;
      };
    };
    FlutterwaveCheckout?: (config: Record<string, unknown>) => void;
    
    // Haptic feedback API (Android Chrome)
    navigator: Navigator & {
      vibrate?: (pattern: number | number[]) => boolean;
      connection?: {
        effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
        saveData: boolean;
      };
    };
  }
  
  // CSS custom properties for Tailwind integration
  namespace JSX {
    interface IntrinsicElements {
      // Allow CSS variables in style props
      [elemName: string]: unknown;
    }
  }
}

/**
 * Module declarations for assets
 */

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

/**
 * Utility type for component props with optional className
 */
export type WithClassName<T = unknown> = T & {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Async component type for lazy-loaded routes
 */
export type AsyncComponent = React.LazyExoticComponent<React.ComponentType<unknown>>;

/**
 * Event handler types with proper typing
 */
export type EventHandler<E = unknown> = (event: E) => void | Promise<void>;
export type ChangeHandler<E = React.ChangeEvent<unknown>> = (event: E) => void;
export type SubmitHandler<E = React.FormEvent> = (event: E) => void | Promise<void>;

/**
 * Nullable utility type
 */
export type Nullable<T> = T | null | undefined;

/**
 * Recursive partial for nested objects
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

export {};