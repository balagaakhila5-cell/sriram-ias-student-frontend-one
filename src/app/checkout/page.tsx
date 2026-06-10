'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import PaymentReceiptSuccess from '@/components/common/PaymentReceiptSuccess';
import CheckoutOrderSummary from '@/features/books/components/CheckoutOrderSummary';
import CheckoutPaymentModal from '@/features/books/components/CheckoutPaymentModal';
import { type PaymentMethod } from '@/features/books/components/CheckoutPaymentMethods';
import {
  buildReceiptData,
  formatPaymentDate,
  generateReceiptNo,
} from '@/features/books/utils/checkoutPayment';
import {
  type CheckoutFormErrors,
  type CheckoutFormFields,
  hasCheckoutFormErrors,
  validateCheckoutForm,
} from '@/features/books/utils/checkoutFormValidation';
import {
  clearCheckoutDetails,
  loadCheckoutDetails,
  saveCheckoutDetails,
} from '@/features/books/utils/checkoutDetailsStorage';

const brandGradient = 'bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const items = useCartStore((state) => state.items);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const subtotal = useCartStore((state) => state.subtotal);
  const applyCouponCode = useCartStore((state) => state.applyCouponCode);
  const applyOfferCoupon = useCartStore((state) => state.applyOfferCoupon);
  const clearCoupon = useCartStore((state) => state.clearCoupon);
  const clearCouponMessage = useCartStore((state) => state.clearCouponMessage);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('qr');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptNo] = useState(generateReceiptNo);
  const [form, setForm] = useState<CheckoutFormFields>({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveMessageType, setSaveMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    setForm(loadCheckoutDetails());
  }, []);

  const receiptData = useMemo(() => {
    const orderTitles = items.map(({ book }) => book.title).join(', ');
    return buildReceiptData(
      subtotal(),
      appliedCoupon?.amount ?? 0,
      orderTitles,
    );
  }, [appliedCoupon?.amount, items, subtotal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const field = name as keyof CheckoutFormFields;

    let nextValue = value;
    if (field === 'mobile') {
      nextValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (field === 'pincode') {
      nextValue = value.replace(/\D/g, '').slice(0, 6);
    }

    setForm((f) => ({ ...f, [field]: nextValue }));
    setSaveMessage(null);

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCouponInputChange = (value: string) => {
    setCoupon(value);
    if (appliedCoupon && value.trim().toUpperCase() !== appliedCoupon.code) {
      clearCoupon();
    } else {
      clearCouponMessage();
    }
  };

  const handleApplyCoupon = () => {
    if (appliedCoupon) {
      clearCoupon();
      setCoupon('');
      return;
    }

    const ok = applyCouponCode(coupon);
    if (ok) {
      const nextCoupon = useCartStore.getState().appliedCoupon;
      if (nextCoupon) setCoupon(nextCoupon.code);
    }
  };

  const handleApplyOffer = (offerIndex: number) => {
    const offerCode = offerIndex === 0 ? 'OFFER5' : 'OFFER10';

    if (appliedCoupon?.code === offerCode) {
      clearCoupon();
      setCoupon('');
      return;
    }

    const ok = applyOfferCoupon(offerIndex);
    if (ok) setCoupon(offerCode);
  };

  const handleSave = () => {
    const validationErrors = validateCheckoutForm(form);
    setErrors(validationErrors);

    if (hasCheckoutFormErrors(validationErrors)) {
      setSaveMessage('Please fix the highlighted fields before saving.');
      setSaveMessageType('error');
      return;
    }

    try {
      saveCheckoutDetails(form);
      setSaveMessage('Contact and address details saved successfully.');
      setSaveMessageType('success');
    } catch {
      setSaveMessage('Could not save details. Please try again.');
      setSaveMessageType('error');
    }
  };

  const openPaymentModal = () => {
    if (items.length === 0) return;

    const validationErrors = validateCheckoutForm(form);
    setErrors(validationErrors);
    if (hasCheckoutFormErrors(validationErrors)) return;

    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (searchParams.get('step') === 'payment') {
      router.replace('/checkout', { scroll: false });
    }
  };

  const handlePayment = () => {
    setIsPaymentModalOpen(false);
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
    <>
      <div className="flex flex-1 flex-col items-stretch lg:flex-row">
        <div className="flex flex-1 items-start justify-center bg-white px-6 py-12 md:px-16">
          <div className="w-full flex-1 rounded-xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:p-10">
            <h2 className="mb-6 text-[16px] font-semibold text-[#374151]">
              Contact Details
            </h2>

            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-1 flex-col">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
                />
                {errors.name ? (
                  <p className="mt-1.5 text-left text-xs font-medium text-red-600">{errors.name}</p>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col">
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Mobile Number *"
                  className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
                />
                {errors.mobile ? (
                  <p className="mt-1.5 text-left text-xs font-medium text-red-600">{errors.mobile}</p>
                ) : null}
              </div>
            </div>

            <div className="mb-8">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address *"
                className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />
              {errors.email ? (
                <p className="mt-1.5 text-left text-xs font-medium text-red-600">{errors.email}</p>
              ) : null}
            </div>

            <h2 className="mb-6 text-[16px] font-semibold text-[#374151]">
              Address Details
            </h2>

            <div className="mb-4">
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter Address *"
                rows={3}
                className="w-full resize-none rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />
              {errors.address ? (
                <p className="mt-1.5 text-left text-xs font-medium text-red-600">{errors.address}</p>
              ) : null}
            </div>

            <div className="mb-8">
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={6}
                placeholder="Pin code *"
                className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />
              {errors.pincode ? (
                <p className="mt-1.5 text-left text-xs font-medium text-red-600">{errors.pincode}</p>
              ) : null}
            </div>

            {saveMessage ? (
              <div
                className={`mb-4 rounded-lg border px-4 py-3 text-sm font-medium ${
                  saveMessageType === 'success'
                    ? 'border-[#B9E6C9] bg-[#ECFDF3] text-[#166534]'
                    : 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]'
                }`}
              >
                {saveMessage}
              </div>
            ) : null}

            <div className="flex items-center justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: '',
                    mobile: '',
                    email: '',
                    address: '',
                    pincode: '',
                  });
                  setErrors({});
                  setSaveMessage(null);
                  clearCheckoutDetails();
                }}
                className="text-[18px] font-semibold text-[#1F4D9D] hover:underline"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSave}
                className={`${brandGradient} rounded-lg px-9 py-2 text-[18px] font-semibold text-white shadow-md transition-opacity hover:opacity-90`}
              >
                Save
              </button>
            </div>
          </div>
        </div>

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
                onClick={openPaymentModal}
                disabled={items.length === 0}
                className={`w-[80%] rounded-full py-3.5 ${brandGradient} text-[15px] font-bold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
              >
                Proceed To Payment
              </button>
            </div>
          }
        />
      </div>

      <CheckoutPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        method={method}
        onMethodChange={setMethod}
        upiId={upiId}
        onUpiIdChange={setUpiId}
        card={card}
        onCardChange={setCard}
        onPay={handlePayment}
        payDisabled={items.length === 0}
      />
    </>
  );
}
