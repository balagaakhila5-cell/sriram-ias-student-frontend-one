'use client';

import React from 'react';

export type PaymentMethod = 'qr' | 'upi' | 'card' | 'netbanking';

const SCANNER_IMAGE = '/assets/course/scanner.png';

interface CheckoutPaymentMethodsProps {
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
}

export default function CheckoutPaymentMethods({
  method,
  onMethodChange,
  upiId,
  onUpiIdChange,
  card,
  onCardChange,
}: CheckoutPaymentMethodsProps) {
  return (
    <>
      <h2 className="mb-6 text-[16px] font-semibold text-[#374151]">
        Choose payment method
      </h2>

      <RadioRow
        label="Scan QR code"
        selected={method === 'qr'}
        onSelect={() => onMethodChange('qr')}
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
        label="UPI"
        selected={method === 'upi'}
        onSelect={() => onMethodChange('upi')}
      />
      {method === 'upi' && (
        <div className="mb-4 ml-8 mt-2 flex flex-col gap-2">
          <input
            value={upiId}
            onChange={(e) => onUpiIdChange(e.target.value)}
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
        label="Credit / Debit Cards"
        selected={method === 'card'}
        onSelect={() => onMethodChange('card')}
      />
      {method === 'card' && (
        <div className="mb-4 ml-8 mt-2 flex flex-col gap-3">
          <input
            value={card.number}
            onChange={(e) => onCardChange({ ...card, number: e.target.value })}
            placeholder="Enter Card number"
            className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400 sm:w-[300px]"
          />
          <input
            value={card.name}
            onChange={(e) => onCardChange({ ...card, name: e.target.value })}
            placeholder="Enter Name on the card"
            className="w-full rounded-lg bg-[#EBF0FF] px-4 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400 sm:w-[300px]"
          />
          <div className="flex w-full gap-3 sm:w-[300px]">
            <input
              value={card.expiry}
              onChange={(e) => onCardChange({ ...card, expiry: e.target.value })}
              placeholder="Expiry Date"
              className="flex-1 rounded-lg bg-[#EBF0FF] px-3 py-3.5 text-center text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
            />
            <input
              value={card.cvv}
              onChange={(e) => onCardChange({ ...card, cvv: e.target.value })}
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
        label="Net Banking"
        selected={method === 'netbanking'}
        onSelect={() => onMethodChange('netbanking')}
      />
    </>
  );
}

function RadioRow({
  label,
  selected,
  onSelect,
}: {
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
