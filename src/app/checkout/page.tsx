'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import PaymentReceiptSuccess from '@/components/common/PaymentReceiptSuccess';
import CheckoutOrderSummary from '@/features/books/components/CheckoutOrderSummary';
import CheckoutPaymentMethods, {
  type PaymentMethod,
} from '@/features/books/components/CheckoutPaymentMethods';
import {
  buildReceiptData,
  formatPaymentDate,
  generateReceiptNo,
} from '@/features/books/utils/checkoutPayment';

type CheckoutStep = 'cart' | 'payment';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const items = useCartStore((state) => state.items);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const subtotal = useCartStore((state) => state.subtotal);
  const applyCouponCode = useCartStore((state) => state.applyCouponCode);
  const applyOfferCoupon = useCartStore((state) => state.applyOfferCoupon);
  const clearCouponMessage = useCartStore((state) => state.clearCouponMessage);

  const [step, setStep] = useState<CheckoutStep>('cart');
  const [coupon, setCoupon] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('qr');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptNo] = useState(generateReceiptNo);
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pincode: '',
  });

  const brandGradient = 'bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]';

  useEffect(() => {
    if (searchParams.get('step') === 'payment' && items.length > 0) {
      setStep('payment');
    }
  }, [searchParams, items.length]);

  const receiptData = useMemo(() => {
    const orderTitles = items.map(({ book }) => book.title).join(', ');
    return buildReceiptData(
      subtotal(),
      appliedCoupon?.amount ?? 0,
      orderTitles,
    );
  }, [appliedCoupon?.amount, items, subtotal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCouponInputChange = (value: string) => {
    setCoupon(value);
    clearCouponMessage();
  };

  const handleApplyCoupon = () => {
    applyCouponCode(coupon);
  };

  const handleApplyOffer = (offerIndex: number) => {
    applyOfferCoupon(offerIndex);
  };

  const handleProceedToPayment = () => {
    if (items.length === 0) return;
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayment = () => {
    setShowReceipt(true);
  };

  if (showReceipt) {
    return (
      <PaymentReceiptSuccess
        receiptNo={receiptNo}
        paymentDate={formatPaymentDate()}
        detailLabel="Order Details"
        detailValue={receiptData.detailValue}
        rows={receiptData.rows}
        totalPaid={receiptData.totalPaid}
      />
    );
  }

  return (
    <div
      className={`flex flex-1 flex-col items-stretch ${
        step === 'cart' ? 'lg:flex-row' : ''
      }`}
    >
      <div
        className={`flex flex-1 ${
          step === 'payment'
            ? 'items-center justify-center bg-[#F4F7FB] px-6 py-12 md:px-10'
            : 'items-start justify-center bg-white px-6 py-12 md:px-16'
        }`}
      >
        <div
          className={`w-full rounded-xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:p-10 ${
            step === 'payment' ? 'max-w-[560px]' : 'flex-1'
          }`}
        >
          {step === 'cart' ? (
            <>
              <h2 className="mb-6 text-[16px] font-semibold text-[#374151]">
                Contact Details
              </h2>

              <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  className="flex-1 rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
                />
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number *"
                  className="flex-1 rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className="mb-8 w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />

              <h2 className="mb-6 text-[16px] font-semibold text-[#374151]">
                Address Details
              </h2>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter Address *"
                rows={3}
                className="mb-4 w-full resize-none rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />

              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pin code *"
                className="mb-8 w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />

              <div className="flex items-center justify-end gap-6">
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      name: '',
                      mobile: '',
                      email: '',
                      address: '',
                      pincode: '',
                    })
                  }
                  className="text-[18px] font-semibold text-[#1F4D9D] hover:underline"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className={`${brandGradient} rounded-lg px-9 py-2 text-[18px] font-semibold text-white shadow-md transition-opacity hover:opacity-90`}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <CheckoutPaymentMethods
                method={method}
                onMethodChange={setMethod}
                upiId={upiId}
                onUpiIdChange={setUpiId}
                card={card}
                onCardChange={setCard}
              />

              <button
                type="button"
                onClick={handlePayment}
                disabled={items.length === 0}
                className={`mt-8 w-full rounded-full py-3.5 ${brandGradient} text-[15px] font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
              >
                Pay
              </button>
            </>
          )}
        </div>
      </div>

      {step === 'cart' && (
        <CheckoutOrderSummary
          variant="cart"
          couponInput={coupon}
          onCouponInputChange={handleCouponInputChange}
          onApplyCoupon={handleApplyCoupon}
          onApplyOffer={handleApplyOffer}
          footer={
            <div className="mt-2 flex shrink-0 justify-center px-8 pb-12">
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={items.length === 0}
                className={`w-[80%] rounded-full py-3.5 ${brandGradient} text-[15px] font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
              >
                Proceed To Payment
              </button>
            </div>
          }
        />
      )}
    </div>
  );
}
