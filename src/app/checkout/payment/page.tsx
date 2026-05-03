'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import CouponModal from '@/components/common/CouponModal';
import OrderSuccessModal from '@/components/common/OrderSuccessModal';

type PaymentMethod = 'qr' | 'upi' | 'saved_upi' | 'card' | 'saved_card' | 'netbanking';

function generateOrderId() {
  return 'TXN' + Math.floor(100000000 + Math.random() * 900000000);
}

export default function PaymentPage() {
  const { items, subtotal } = useCartStore();
  const [method, setMethod] = useState<PaymentMethod>('qr');
  const [coupon, setCoupon] = useState('');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId] = useState(generateOrderId);

  const deliveryCharge = 50;
  const discount = items.reduce(
    (sum, i) => sum + (i.book.originalPrice - i.book.discountedPrice) * i.quantity, 0
  );
  const totalOriginal = items.reduce((sum, i) => sum + i.book.originalPrice * i.quantity, 0);
  const firstItem = items[0];

  // Reusable gradient class for buttons and icons
  const brandGradient = "bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]";

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-stretch">
      <CouponModal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)} />
      <OrderSuccessModal isOpen={showSuccessModal} orderId={orderId} />

      {/* LEFT — pure white, payment methods */}
      <div className="flex-1 bg-white flex items-start justify-center px-6 md:px-16 py-12">
        <div className="w-full flex-1 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 md:p-10">
          <h2 className="text-[16px] font-semibold text-[#374151] mb-6">Choose payment method</h2>

          {/* QR */}
          <RadioRow id="qr" label="Scan QR code" selected={method === 'qr'} onSelect={() => setMethod('qr')} />
          {method === 'qr' && (
            <div className="ml-8 mb-4 mt-2">
              <div className="w-[130px] border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="h-[130px] bg-[#EBF0FF] flex items-center justify-center relative">
                  {/* REPLACE THIS DIV WITH YOUR NEXT.JS IMAGE COMPONENT */}
                  <span className="text-xs font-semibold text-gray-400">QR Image</span>
                  {/* Example: <Image src="/qr-code.png" alt="QR" fill className="object-cover p-2" /> */}
                </div>
                <div className="w-full bg-black py-1.5 text-center">
                  <span className="text-white text-[10px] font-bold tracking-widest">SCAN ME</span>
                </div>
              </div>
            </div>
          )}

          {/* UPI */}
          <RadioRow id="upi" label="UPI" selected={method === 'upi'} onSelect={() => setMethod('upi')} />
          {method === 'upi' && (
            <div className="ml-8 mb-4 mt-2 flex flex-col gap-2">
              <input
                value={upiId} onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter Upi Id"
                className="w-full sm:w-[260px] bg-[#EBF0FF] rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium text-center"
              />
              <div className="flex justify-end w-full sm:w-[260px]">
                <button className="text-[#1F4D9D] text-[14px] font-semibold hover:underline">Verify</button>
              </div>
            </div>
          )}

          {/* saved@paytm */}
          <RadioRow id="saved_upi" label="saved@paytm" selected={method === 'saved_upi'} onSelect={() => setMethod('saved_upi')} />

          {/* Credit / Debit Cards */}
          <RadioRow id="card" label="Credit / Debit Cards" selected={method === 'card'} onSelect={() => setMethod('card')} />
          {method === 'card' && (
            <div className="ml-8 mb-4 mt-2 flex flex-col gap-3">
              <input
                value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                placeholder="Enter Card number"
                className="w-full sm:w-[300px] bg-[#EBF0FF] rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium text-center"
              />
              <input
                value={card.name} onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                placeholder="Enter Name on the card"
                className="w-full sm:w-[300px] bg-[#EBF0FF] rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium text-center"
              />
              <div className="flex gap-3 w-full sm:w-[300px]">
                <input
                  value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                  placeholder="Expiry Date"
                  className="flex-1 bg-[#EBF0FF] rounded-lg px-3 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium text-center"
                />
                <input
                  value={card.cvv} onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
                  placeholder="Enter CVV"
                  className="flex-1 bg-[#EBF0FF] rounded-lg px-3 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium text-center"
                />
              </div>
              <div className="flex justify-end w-full sm:w-[300px] mt-1">
                <button className="text-[#1F4D9D] text-[14px] font-semibold hover:underline">Verify</button>
              </div>
            </div>
          )}

          {/* Saved Card */}
          <RadioRow id="saved_card" label="Saved Card" selected={method === 'saved_card'} onSelect={() => setMethod('saved_card')} />

          {/* Net Banking */}
          <RadioRow id="netbanking" label="Net Banking" selected={method === 'netbanking'} onSelect={() => setMethod('netbanking')} />
        </div>
      </div>

      {/* RIGHT — soft light blue background container */}
      <div className="w-full flex-1 bg-[#F4F7FB] flex flex-col shrink-0">
        
        <div className="px-8 pt-12 pb-8 flex flex-col gap-6">

          {/* Book item */}
          {firstItem && (
            <div className="flex items-center gap-4">
              <div className="relative w-[64px] h-[72px] rounded-lg overflow-visible bg-[#01285A] shrink-0">
                <Image src={firstItem.book.coverImage} alt={firstItem.book.title} fill className="object-cover rounded-lg" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-100 shadow-sm rounded-full text-[#12425c] text-[11px] font-bold flex items-center justify-center">
                  {firstItem.quantity}
                </span>
              </div>
              <div className="font-['Montserrat']">
                <p className="font-semibold text-[18px] text-gray-900 leading-tight mb-1">{firstItem.book.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[14px] line-through font-medium">{firstItem.book.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="font-medium text-[18px] text-[#184a63]">{firstItem.book.discountedPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Coupon */}
          <div className="flex gap-3 mt-2">
            <input
              value={coupon} onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 bg-white rounded-lg px-4 py-3 text-[16px] text-[#00000080] outline-none placeholder:text-gray-400 border border-transparent shadow-sm"
            />
            <button
              onClick={() => setShowCouponModal(true)}
              className={`${brandGradient} text-white font-semibold text-[16px] px-8 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm`}
            >
              Apply
            </button>
          </div>

          {/* Offer boxes */}
          {firstItem && (
            <div className="flex gap-3">
              {firstItem.book.offers.map((offer, i) => (
                <div key={i} className="relative flex-1 bg-white rounded-xl p-5 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 ${brandGradient} rounded-full flex items-center justify-center shrink-0`}>
                      <span className="text-white text-[15px] font-bold">%</span>
                    </div>
                    <p className="font-bold text-[16px] text-black leading-snug">
                      Get this for {offer.price.toLocaleString('en-IN')} /-
                    </p>
                  </div>
                  <p className="text-[14px] text-[#00000099] font-semibold leading-tight mb-4">
                    {offer.description}
                  </p>
                  <div className="flex justify-end mt-auto absolute bottom-[-15%] right-5 ">
                    <button
                      onClick={() => setShowCouponModal(true)}
                      className={`${brandGradient} text-white text-[14px] font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm`}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price breakdown */}
          <div className="flex flex-col gap-4 mt-4 font-['Montserrat']">
            <PriceLine label="Total Price" value={`Rs.${totalOriginal.toLocaleString('en-IN')}`} />
            <PriceLine label="Delivery Charge" value={`Rs.${deliveryCharge}`} />
            <PriceLine label="Discount applied" value={`Rs.${discount.toLocaleString('en-IN')}`} />
            <PriceLine label="Sub Total" value={`Rs.${subtotal().toLocaleString('en-IN')}`} />
          </div>
        </div>

        {/* Pay button */}
        <div className="px-8 pb-12 flex justify-center shrink-0 mt-2">
          <button
            onClick={() => setShowSuccessModal(true)}
            className={`w-[80%] py-3.5 rounded-full ${brandGradient} text-white font-bold text-[15px] hover:opacity-90 transition-opacity shadow-lg`}
          >
            Pay Rs.{subtotal().toLocaleString('en-IN')}
          </button>
        </div>

      </div>
    </div>
  );
}

function RadioRow({
  id, label, selected, onSelect,
}: {
  id: string; label: string; selected: boolean; onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} className="flex items-center gap-3 py-3 text-left w-full hover:bg-gray-50 rounded-lg transition-colors -ml-2 px-2">
      {/* Radio Circle */}
      <div className={`w-[20px] h-[20px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
        selected ? 'border-[#1F4D9D]' : 'border-[#00000080]'
      }`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#1F4D9D]" />}
      </div>
      
      {/* Dynamic Text styling based on selection */}
      <span className={`text-[16.2px] font-medium leading-none tracking-normal text-center ${
        selected ? "text-[#1F4D9D] font-['Poppins']" : "text-[#00000080] font-['Montserrat']"
      }`}>
        {label}
      </span>
    </button>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[16px] font-semibold text-black">{label}</span>
      <span className="text-[16px] font-semibold text-[#184a63]">{value}</span>
    </div>
  );
}