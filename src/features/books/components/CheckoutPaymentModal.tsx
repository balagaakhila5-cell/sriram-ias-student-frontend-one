'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import CheckoutPaymentMethods, {
  type PaymentMethod,
} from '@/features/books/components/CheckoutPaymentMethods';

const brandGradient = 'bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]';

interface CheckoutPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  upiId: string;
  onUpiIdChange: (value: string) => void;
  card: { number: string; name: string; expiry: string; cvv: string };
  onCardChange: (card: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
  }) => void;
  onPay: () => void;
  payDisabled?: boolean;
}

const CheckoutPaymentModal: React.FC<CheckoutPaymentModalProps> = ({
  isOpen,
  onClose,
  method,
  onMethodChange,
  upiId,
  onUpiIdChange,
  card,
  onCardChange,
  onPay,
  payDisabled = false,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const frame = requestAnimationFrame(() => setIsActive(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsActive(false);
    const timeout = window.setTimeout(() => setShouldRender(false), 220);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-24 sm:p-6 sm:pt-28"
      role="presentation"
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 ease-out ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close payment dialog"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-payment-title"
        className={`relative z-10 flex max-h-[calc(100vh-7rem)] w-full max-w-[700px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${
          isActive ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.98] opacity-0'
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4 md:px-8">
          <h2
            id="checkout-payment-title"
            className="text-[18px] font-semibold text-[#374151] md:text-[20px]"
          >
            Payment
          </h2>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[13px] font-semibold text-[#00679C] hover:underline"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#374151] transition-colors hover:bg-gray-100"
              aria-label="Close payment"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          <CheckoutPaymentMethods
            method={method}
            onMethodChange={onMethodChange}
            upiId={upiId}
            onUpiIdChange={onUpiIdChange}
            card={card}
            onCardChange={onCardChange}
          />

          <button
            type="button"
            onClick={onPay}
            disabled={payDisabled}
            className={`mt-8 w-full rounded-full py-3.5 ${brandGradient} text-[15px] font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentModal;
