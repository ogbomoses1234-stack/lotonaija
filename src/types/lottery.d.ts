/**
 * Ambient declarations for Lottery domain globals & window extensions
 */
declare global {
  interface Window {
    __LOTTERY_CONFIG__?: {
      maxConcurrentScratches: number;
      hapticEnabled: boolean;
      autoPickTimeout: number;
    };
  }
}

/**
 * Module augmentation for lottery assets
 */
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}

export {};