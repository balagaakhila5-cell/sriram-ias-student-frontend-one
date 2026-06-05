'use client';

import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import {
  bookDiscountTotal,
  originalTotal,
} from '@/features/books/utils/checkoutCoupons';

const brandGradient =
  'bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]';

interface CheckoutOrderSummaryProps {
  couponInput: string;
  onCouponInputChange: (value: string) => void;
  onApplyCoupon: () => void;
  onApplyOffer: (offerIndex: number) => void;
  footer?: React.ReactNode;
}

export default function CheckoutOrderSummary({
  couponInput,
  onCouponInputChange,
  onApplyCoupon,
  onApplyOffer,
  footer,
}: CheckoutOrderSummaryProps) {
  const items = useCartStore((state) => state.items);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const couponMessage = useCartStore((state) => state.couponMessage);
  const subtotal = useCartStore((state) => state.subtotal);

  const deliveryCharge = 50;
  const bookDiscount = bookDiscountTotal(items);
  const couponDiscount = appliedCoupon?.amount ?? 0;
  const totalDiscount = bookDiscount + couponDiscount;
  const totalOriginal = originalTotal(items);
  const cartSubtotal = subtotal();
  const finalTotal = Math.max(cartSubtotal - couponDiscount + deliveryCharge, 0);
  const firstItem = items[0];

  return (
    <div className="flex w-full flex-1 shrink-0 flex-col bg-[#F4F7FB]">
      <div className="flex flex-col gap-6 px-8 pb-8 pt-12">
        {items.map(({ book, quantity }) => (
          <div key={book.id} className="flex items-center gap-4">
            <div className="relative h-[72px] w-[64px] shrink-0 overflow-hidden rounded-lg bg-[#01285A]">
              <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
            </div>
            <div className="font-['Montserrat']">
              <p className="mb-1 text-[18px] font-semibold leading-tight text-gray-900">
                {book.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-gray-400 line-through">
                  {(book.originalPrice * quantity).toLocaleString('en-IN')}
                </span>
                <span className="text-[18px] font-medium text-[#184a63]">
                  {(book.discountedPrice * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-2 flex gap-3">
          <input
            value={couponInput}
            onChange={(e) => onCouponInputChange(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 rounded-lg border border-transparent bg-white px-4 py-3 text-[16px] text-[#00000080] shadow-sm outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            className={`${brandGradient} rounded-lg px-8 py-2 text-[16px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90`}
          >
            Apply
          </button>
        </div>

        {appliedCoupon ? (
          <div className="rounded-lg border border-[#B9E6C9] bg-[#ECFDF3] px-4 py-3 text-sm font-medium text-[#166534]">
            {appliedCoupon.code} applied — saved Rs.
            {appliedCoupon.amount.toLocaleString('en-IN')}
          </div>
        ) : null}

        {couponMessage && !appliedCoupon ? (
          <div className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#B91C1C]">
            {couponMessage}
          </div>
        ) : null}

        {firstItem ? (
          <div className="flex gap-3">
            {firstItem.book.offers.map((offer, index) => {
              const isActive = appliedCoupon?.code === (index === 0 ? 'OFFER5' : 'OFFER10');

              return (
                <div
                  key={offer.description}
                  className={`relative flex flex-1 flex-col rounded-xl bg-white p-5 shadow-sm ${
                    isActive ? 'ring-2 ring-[#249EDC]' : ''
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${brandGradient}`}
                    >
                      <span className="text-[15px] font-bold text-white">%</span>
                    </div>
                    <p className="text-[16px] font-bold leading-snug text-black">
                      Get this for {offer.price.toLocaleString('en-IN')} /-
                    </p>
                  </div>
                  <p className="mb-4 text-[14px] font-semibold leading-tight text-[#00000099]">
                    {offer.description}
                  </p>
                  <div className="absolute bottom-[-15%] right-5 mt-auto flex justify-end">
                    <button
                      type="button"
                      onClick={() => onApplyOffer(index)}
                      className={`${brandGradient} rounded-lg px-6 py-2 text-[14px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90`}
                    >
                      {isActive ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="mt-4 flex flex-col gap-4 font-['Montserrat']">
          <PriceLine label="Total Price" value={`Rs.${totalOriginal.toLocaleString('en-IN')}`} />
          <PriceLine label="Delivery Charge" value={`Rs.${deliveryCharge}`} />
          <PriceLine
            label="Discount applied"
            value={`Rs.${totalDiscount.toLocaleString('en-IN')}`}
          />
          <PriceLine label="Sub Total" value={`Rs.${finalTotal.toLocaleString('en-IN')}`} />
        </div>
      </div>

      {footer}
    </div>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[16px] font-semibold text-black">{label}</span>
      <span className="text-[16px] font-semibold text-[#184a63]">{value}</span>
    </div>
  );
}

export function useCheckoutFinalTotal() {
  const items = useCartStore((state) => state.items);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const subtotal = useCartStore((state) => state.subtotal);

  const deliveryCharge = 50;
  const couponDiscount = appliedCoupon?.amount ?? 0;

  return Math.max(subtotal() - couponDiscount + deliveryCharge, 0);
}
