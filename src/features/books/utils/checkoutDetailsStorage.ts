import type { CheckoutFormFields } from '@/features/books/utils/checkoutFormValidation';

export const CHECKOUT_DETAILS_KEY = 'sriram-checkout-details';

const EMPTY_FORM: CheckoutFormFields = {
  name: '',
  mobile: '',
  email: '',
  address: '',
  pincode: '',
};

export function loadCheckoutDetails(): CheckoutFormFields {
  if (typeof window === 'undefined') return { ...EMPTY_FORM };

  try {
    const raw = localStorage.getItem(CHECKOUT_DETAILS_KEY);
    if (!raw) return { ...EMPTY_FORM };

    const parsed = JSON.parse(raw) as Partial<CheckoutFormFields>;
    return {
      name: parsed.name ?? '',
      mobile: parsed.mobile ?? '',
      email: parsed.email ?? '',
      address: parsed.address ?? '',
      pincode: parsed.pincode ?? '',
    };
  } catch {
    return { ...EMPTY_FORM };
  }
}

export function saveCheckoutDetails(form: CheckoutFormFields): void {
  localStorage.setItem(CHECKOUT_DETAILS_KEY, JSON.stringify(form));
}

export function clearCheckoutDetails(): void {
  localStorage.removeItem(CHECKOUT_DETAILS_KEY);
}
