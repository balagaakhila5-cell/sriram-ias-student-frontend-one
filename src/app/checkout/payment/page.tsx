'use client';

import React, { useMemo, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import PaymentReceiptSuccess, {
  type PaymentReceiptRow,
} from '@/components/common/PaymentReceiptSuccess';
import CheckoutOrderSummary from '@/features/books/components/CheckoutOrderSummary';

type PaymentMethod = 'qr' | 'upi' | 'saved_upi' | 'card' | 'saved_card' | 'netbanking';

const SCANNER_IMAGE = '/assets/course/scanner.png';
const GST_PERCENT = 18;

function generateReceiptNo() {
  return 'SI-090-' + Math.floor(1000 + Math.random() * 9000);
}

function formatPaymentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function PaymentPage() {
  const applyCouponCode = useCartStore((state) => state.applyCouponCode);
  const applyOfferCoupon = useCartStore((state) => state.applyOfferCoupon);
  const clearCouponMessage = useCartStore((state) => state.clearCouponMessage);
  const items = useCartStore((state) => state.items);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const subtotal = useCartStore((state) => state.subtotal);

  const [method, setMethod] = useState<PaymentMethod>('qr');
  const [coupon, setCoupon] = useState('');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptNo] = useState(generateReceiptNo);

  const brandGradient = 'bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]';

  const receiptData = useMemo(() => {
    const cartSubtotal = subtotal();
    const couponDiscount = appliedCoupon?.amount ?? 0;
    const deliveryCharge = 50;
    const priceAfterDiscount = Math.max(cartSubtotal - couponDiscount + deliveryCharge, 0);
    const gstAmount = Math.round((priceAfterDiscount * GST_PERCENT) / 100);
    const totalPaid = priceAfterDiscount + gstAmount;

    const rows: PaymentReceiptRow[] = [
      { label: 'Book Price', amount: cartSubtotal },
    ];

    if (couponDiscount > 0) {
      rows.push({ label: 'Coupon Discount', amount: couponDiscount, isDiscount: true });
    }

    if (deliveryCharge > 0) {
      rows.push({ label: 'Delivery Charge', amount: deliveryCharge });
    }

    rows.push({ label: 'Price After Discount', amount: priceAfterDiscount });
    rows.push({ label: `GST (${GST_PERCENT}%)`, amount: gstAmount });

    const orderTitles = items.map(({ book }) => book.title).join(', ');

    return {
      rows,
      totalPaid,
      detailValue: orderTitles || 'Books Order',
    };
  }, [appliedCoupon?.amount, items, subtotal]);

  const handleCouponInputChange = (value: string) => {
    setCoupon(value);
    clearCouponMessage();
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
    <div className="flex flex-1 flex-col items-stretch lg:flex-row">
      <div className="flex flex-1 items-start justify-center bg-white px-6 py-12 md:px-16">
        <div className="w-full flex-1 rounded-xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:p-10">
          <h2 className="mb-6 text-[16px] font-semibold text-[#374151]">
            Choose payment method
          </h2>

          <RadioRow
            id="qr"
            label="Scan QR code"
            selected={method === 'qr'}
            onSelect={() => setMethod('qr')}
          />
          {method === 'qr' && (
            <div className="mb-4 ml-8 mt-2">
              <div className="inline-block rounded-[8px] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.12)]">
                <img
                  src={SCANNER_IMAGE}
                  alt="QR Scanner"
                  className="h-[155px] w-[155px] object-contain"
                />
              </div>
            </div>
          )}

          <RadioRow
            id="upi"
            label="UPI"
            selected={method === 'upi'}
            onSelect={() => setMethod('upi')}
          />
          {method === 'upi' && (
            <div className="mb-4 ml-8 mt-2 flex flex-col gap-2">
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter Upi Id"
                className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400 sm:w-[260px]"
              />
              <div className="flex w-full justify-end sm:w-[260px]">
                <button
                  type="button"
                  className="text-[14px] font-semibold text-[#1F4D9D] hover:underline"
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          <RadioRow
            id="saved_upi"
            label="saved@paytm"
            selected={method === 'saved_upi'}
            onSelect={() => setMethod('saved_upi')}
          />

          <RadioRow
            id="card"
            label="Credit / Debit Cards"
            selected={method === 'card'}
            onSelect={() => setMethod('card')}
          />
          {method === 'card' && (
            <div className="mb-4 ml-8 mt-2 flex flex-col gap-3">
              <input
                value={card.number}
                onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                placeholder="Enter Card number"
                className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400 sm:w-[300px]"
              />
              <input
                value={card.name}
                onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                placeholder="Enter Name on the card"
                className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400 sm:w-[300px]"
              />
              <div className="flex w-full gap-3 sm:w-[300px]">
                <input
                  value={card.expiry}
                  onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                  placeholder="Expiry Date"
                  className="flex-1 rounded-lg bg-[#EBF0FF] px-3 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
                />
                <input
                  value={card.cvv}
                  onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
                  placeholder="Enter CVV"
                  className="flex-1 rounded-lg bg-[#EBF0FF] px-3 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
              <div className="mt-1 flex w-full justify-end sm:w-[300px]">
                <button
                  type="button"
                  className="text-[14px] font-semibold text-[#1F4D9D] hover:underline"
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          <RadioRow
            id="saved_card"
            label="Saved Card"
            selected={method === 'saved_card'}
            onSelect={() => setMethod('saved_card')}
          />

          <RadioRow
            id="netbanking"
            label="Net Banking"
            selected={method === 'netbanking'}
            onSelect={() => setMethod('netbanking')}
          />
        </div>
      </div>

      <CheckoutOrderSummary
        couponInput={coupon}
        onCouponInputChange={handleCouponInputChange}
        onApplyCoupon={() => applyCouponCode(coupon)}
        onApplyOffer={applyOfferCoupon}
        footer={
          <div className="mt-2 flex shrink-0 justify-center px-8 pb-12">
            <button
              type="button"
              onClick={handlePayment}
              className={`w-[80%] rounded-full py-3.5 ${brandGradient} text-[15px] font-bold text-white shadow-lg transition-opacity hover:opacity-90`}
            >
              Pay Rs.{receiptData.totalPaid.toLocaleString('en-IN')}
            </button>
          </div>
        }
      />
    </div>
  );
}

function RadioRow({
  id,
  label,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="-ml-2 flex w-full items-center gap-3 rounded-lg px-2 py-3 text-left transition-colors hover:bg-gray-50"
    >
      <div
        className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${
          selected ? 'border-[#1F4D9D]' : 'border-[#00000080]'
        }`}
      >
        {selected ? <div className="h-2.5 w-2.5 rounded-full bg-[#1F4D9D]" /> : null}
      </div>

      <span
        className={`text-center text-[16.2px] font-medium leading-none tracking-normal ${
          selected ? "font-['Poppins'] text-[#1F4D9D]" : "font-['Montserrat'] text-[#00000080]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
