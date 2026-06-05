'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import CheckoutOrderSummary from '@/features/books/components/CheckoutOrderSummary';

export default function CheckoutPage() {
  const router = useRouter();
  const applyCouponCode = useCartStore((state) => state.applyCouponCode);
  const applyOfferCoupon = useCartStore((state) => state.applyOfferCoupon);
  const clearCouponMessage = useCartStore((state) => state.clearCouponMessage);

  const [coupon, setCoupon] = useState('');
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const brandGradient = 'bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]';

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

  return (
    <div className="flex flex-1 flex-col items-stretch lg:flex-row">
      <div className="flex flex-1 items-start justify-center bg-white px-6 py-12 md:px-16">
        <div className="w-full flex-1 rounded-xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:p-10">
          <h2 className="mb-6 text-[16px] font-semibold text-[#374151]">Contact Details</h2>

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

          <h2 className="mb-6 text-[16px] font-semibold text-[#374151]">Address Details</h2>

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
                setForm({ name: '', mobile: '', email: '', address: '', pincode: '' })
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
        </div>
      </div>

      <CheckoutOrderSummary
        couponInput={coupon}
        onCouponInputChange={handleCouponInputChange}
        onApplyCoupon={handleApplyCoupon}
        onApplyOffer={handleApplyOffer}
        footer={
          <div className="mt-2 flex shrink-0 justify-center px-8 pb-12">
            <button
              type="button"
              onClick={() => router.push('/checkout/payment')}
              className={`w-[80%] rounded-full py-3.5 ${brandGradient} text-[15px] font-bold text-white shadow-lg transition-opacity hover:opacity-90`}
            >
              Proceed To Payment
            </button>
          </div>
        }
      />
    </div>
  );
}
