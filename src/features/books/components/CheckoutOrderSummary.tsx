'use client';

import React from 'react';
import Image from '@/components/common/AppImage';
import { useRouter } from '@/lib/appRouter';
import { useCartStore } from '@/store/cartStore';
import { computeCheckoutTotals } from '@/features/books/utils/checkoutTotals';

const brandGradient =
  'bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]';

interface CheckoutOrderSummaryProps {
  variant?: 'cart' | 'payment';
  couponInput?: string;
  onCouponInputChange?: (value: string) => void;
  onApplyCoupon?: () => void;
  onApplyOffer?: (offerIndex: number) => void;
  footer?: React.ReactNode;
}

export default function CheckoutOrderSummary({
  variant = 'cart',
  couponInput = '',
  onCouponInputChange,
  onApplyCoupon,
  onApplyOffer,
  footer,
}: CheckoutOrderSummaryProps) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const couponMessage = useCartStore((state) => state.couponMessage);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const couponDiscount = appliedCoupon?.amount ?? 0;
  const {
    cartSubtotal,
    bookDiscount,
    deliveryCharge,
    totalAmount,
  } = computeCheckoutTotals(items, couponDiscount);
  const totalDiscount = bookDiscount + couponDiscount;
  const firstItem = items[0];
  const offerBook = firstItem?.book;
  const showCartDetails = variant === 'cart';

  const handleIncrement = (book: (typeof items)[0]['book']) => {
    addItem(book, { openSidebar: false });
  };

  const handleDecrement = (bookId: string, quantity: number) => {
    if (quantity <= 1) {
      removeItem(bookId);
      if (items.length <= 1) {
        router.push('/');
      }
      return;
    }

    updateQuantity(bookId, quantity - 1);
  };

  const priceSummary = (
    <div
      className={`flex flex-col gap-4 font-['Montserrat'] ${
        showCartDetails ? 'mt-4' : 'w-full'
      }`}
    >
      <PriceLine
        label="Items Total"
        value={`Rs.${cartSubtotal.toLocaleString('en-IN')}`}
      />
      <PriceLine label="Delivery Charge" value={`Rs.${deliveryCharge}`} />
      <PriceLine
        label="Discount applied"
        value={`Rs.${totalDiscount.toLocaleString('en-IN')}`}
      />
      <PriceLine
        label="Total Amount"
        value={`Rs.${totalAmount.toLocaleString('en-IN')}`}
      />
    </div>
  );

  return (
    <div className="flex w-full flex-1 shrink-0 flex-col bg-[#F4F7FB]">
      {showCartDetails ? (
        <>
          <div className="flex flex-col gap-6 px-8 pb-8 pt-12">
            {items.map(({ book, quantity }) => (
            <div key={book.id} className="flex items-center gap-4">
              <div className="relative h-[72px] w-[64px] shrink-0 overflow-hidden rounded-lg bg-[#01285A]">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 font-['Montserrat']">
                <p className="mb-1 text-[18px] font-semibold leading-tight text-gray-900 line-clamp-2">
                  {book.title}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14px] font-medium text-gray-400 line-through">
                    {(book.originalPrice * quantity).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[18px] font-medium text-[#184a63]">
                    {(book.discountedPrice * quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex h-[34px] shrink-0 items-center justify-between rounded-md border border-[#249EDC] bg-white px-1.5">
                <button
                  type="button"
                  onClick={() => handleDecrement(book.id, quantity)}
                  aria-label="Decrease quantity"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-[#EAF7FF] cursor-pointer"
                >
                  −
                </button>
                <span className="min-w-[24px] text-center text-sm font-bold text-[#007BB5]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncrement(book)}
                  aria-label="Increase quantity"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-[#EAF7FF] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          ))}

            {items.length === 0 ? (
              <p className="text-center text-sm font-medium text-gray-500">
                Your cart is empty.
              </p>
            ) : null}

            <>
              <div className="mt-2 flex gap-3">
                <input
                  value={couponInput}
                  onChange={(e) => onCouponInputChange?.(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 rounded-lg border border-transparent bg-white px-4 py-3 text-[16px] text-[#00000080] shadow-sm outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={onApplyCoupon}
                  className={
                    appliedCoupon
                      ? 'rounded-full border border-[#DC2626] bg-white px-8 py-2 text-[16px] font-semibold text-[#DC2626] shadow-sm transition-colors hover:bg-[#FEF2F2]'
                      : `${brandGradient} rounded-full px-8 py-2 text-[16px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90`
                  }
                >
                  {appliedCoupon ? 'Remove' : 'Apply'}
                </button>
              </div>

              {appliedCoupon ? (
                <div className="rounded-lg border border-[#B9E6C9] bg-[#ECFDF3] px-4 py-3 text-sm font-medium text-[#166534]">
                  Coupon applied successfully! {appliedCoupon.code} — You saved Rs.
                  {appliedCoupon.amount.toLocaleString('en-IN')}
                </div>
              ) : null}

              {couponMessage && !appliedCoupon ? (
                <div className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#B91C1C]">
                  {couponMessage}
                </div>
              ) : null}

              {offerBook?.offers?.length ? (
              <div className="flex gap-3 pb-2">
                {offerBook.offers.map((offer, index) => {
                  const isActive =
                    appliedCoupon?.code === (index === 0 ? 'OFFER5' : 'OFFER10');

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
                      <div className="mt-auto flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => onApplyOffer?.(index)}
                          className={
                            isActive
                              ? 'rounded-full border border-[#DC2626] bg-white px-6 py-2 text-[14px] font-semibold text-[#DC2626] shadow-sm transition-colors hover:bg-[#FEF2F2]'
                              : `${brandGradient} rounded-full px-6 py-2 text-[14px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90`
                          }
                        >
                          {isActive ? 'Remove' : 'Apply'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              ) : null}
            </>

            {priceSummary}
          </div>
          {footer}
        </>
      ) : (
        <div className="flex min-h-[480px] flex-1 flex-col items-center justify-center gap-10 px-8 py-12 lg:min-h-[calc(100vh-180px)]">
          <div className="w-full max-w-[420px]">{priceSummary}</div>
          <div className="w-full max-w-[420px]">{footer}</div>
        </div>
      )}
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
  const couponDiscount = appliedCoupon?.amount ?? 0;

  return computeCheckoutTotals(items, couponDiscount).totalAmount;
}
