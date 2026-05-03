'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import CouponModal from '@/components/common/CouponModal';

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore();
  const router = useRouter();
  const [coupon, setCoupon] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', address: '', pincode: '',
  });

  const deliveryCharge = 50;
  const discount = items.reduce(
    (sum, i) => sum + (i.book.originalPrice - i.book.discountedPrice) * i.quantity, 0
  );
  const totalOriginal = items.reduce((sum, i) => sum + i.book.originalPrice * i.quantity, 0);
  const firstItem = items[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Reusable gradient class for buttons and icons
  const brandGradient = "bg-gradient-to-r from-[rgba(24,151,216,0.8)] to-[#021C29]";

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-stretch">
      <CouponModal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)} />

      {/* LEFT — pure white, centers the form card */}
      <div className="flex-1 bg-white flex items-start justify-center px-6 md:px-16 py-12">
        <div className="w-full flex-1 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 md:p-10">

          <h2 className="text-[16px] font-semibold text-[#374151] mb-6">Contact Details</h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="Name *"
              className="flex-1 bg-[#EBF0FF] rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium text-center"
            />
            <input
              name="mobile" value={form.mobile} onChange={handleChange}
              placeholder="Mobile Number *"
              className="flex-1 bg-[#EBF0FF] rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium text-center"
            />
          </div>

          <input
            name="email" value={form.email} onChange={handleChange}
            placeholder="Email Address *"
            className="w-full bg-[#EBF0FF] rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium mb-8 text-center"
          />

          <h2 className="text-[16px] font-semibold text-[#374151] mb-6">Address Details</h2>

          <textarea
            name="address" value={form.address} onChange={handleChange}
            placeholder="Enter Address *"
            rows={3}
            className="w-full bg-[#EBF0FF] rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium resize-none mb-4 text-center"
          />

          <input
            name="pincode" value={form.pincode} onChange={handleChange}
            placeholder="Pin code *"
            className="w-full bg-[#EBF0FF] rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 font-medium mb-8 text-center"
          />

          <div className="flex justify-end items-center gap-6">
            <button
              onClick={() => setForm({ name: '', mobile: '', email: '', address: '', pincode: '' })}
              className="text-[#1F4D9D] font-semibold text-[18px] hover:underline"
            >
              Reset
            </button>
            <button className={`${brandGradient} text-white font-semibold text-[18px] px-9 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md`}>
              Save
            </button>
          </div>
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

          {/* Offer boxes (Matched to screenshot 3) */}
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

        {/* Proceed button */}
        <div className="px-8 pb-12 flex justify-center shrink-0 mt-2">
          <button
            onClick={() => router.push('/checkout/payment')}
            className={`w-[80%] py-3.5 rounded-full ${brandGradient} text-white font-bold text-[15px] hover:opacity-90 transition-opacity shadow-lg`}
          >
            Proceed To Payment
          </button>
        </div>

      </div>
    </div>
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