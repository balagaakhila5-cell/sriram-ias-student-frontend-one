declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

export interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayCheckoutOptions {
  key?: string;
  amount?: number;
  currency?: string;
  order_id?: string;
  name?: string;
  description?: string;
  method?: Record<string, boolean>;
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
}

export function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      existing.addEventListener('load', () => resolve(Boolean(window.Razorpay)));
      existing.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/** Map UI payment selection to backend payment mode business IDs */
export function mapUiPaymentToModeId(
  paymentId: string,
  modes: Array<{ paymentModeId: string; paymentModeName?: string }>,
): string {
  const normalized = paymentId.toLowerCase();
  const findByHint = (hint: string) =>
    modes.find((m) =>
      `${m.paymentModeName ?? ''} ${m.paymentModeId}`.toLowerCase().includes(hint),
    )?.paymentModeId;

  if (normalized === 'card' || normalized === 'saved-card') {
    return findByHint('card') ?? findByHint('pm002') ?? 'PM002';
  }
  if (normalized === 'net-banking') {
    return findByHint('net') ?? findByHint('bank') ?? findByHint('pm003') ?? 'PM003';
  }
  if (normalized === 'paytm') {
    return findByHint('wallet') ?? findByHint('pm006') ?? 'PM006';
  }

  return findByHint('upi') ?? findByHint('pm001') ?? 'PM001';
}
