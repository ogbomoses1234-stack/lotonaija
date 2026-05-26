/**
 * Ambient declarations for Auth SDKs & Global Window Extensions
 */
declare global {
  interface Window {
    __AUTH_SESSION__?: {
      token: string;
      expiresAt: number;
      userId: string;
    };
  }
}

/**
 * Environment variable augmentation for Vite
 */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PAYSTACK_PUBLIC_KEY: string;
  readonly VITE_FLUTTERWAVE_PUBLIC_KEY: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_DRAW_SCHEDULE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};