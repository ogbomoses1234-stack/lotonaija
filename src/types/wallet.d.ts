/**
 * Ambient declarations for Payment Gateway SDKs & Wallet extensions
 */
declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        onSuccess: (trx: { reference: string }) => void;
        onClose: () => void;
      }) => { openPopup: () => void };
    };
    FlutterwaveCheckout?: (config: {
      public_key: string;
      tx_ref: string;
      amount: number;
      currency: 'NGN';
      payment_options: string;
      redirect_url: string;
      customer: { email: string; phone_number: string; name: string };
      customizations: { title: string; description: string };
    }) => void;
  }
}

export interface WalletStoreState {
  balance: number;
  isProcessing: boolean;
  transactions: Array<import('./wallet.types').Transaction>;
}

export {};