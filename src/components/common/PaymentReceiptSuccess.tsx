'use client';

import React from 'react';
import { useRouter } from '@/lib/appRouter';

const CONFIRMED_BAG = '/assets/course/confirmed-bag.png';

export interface PaymentReceiptRow {
  label: string;
  amount: number;
  isDiscount?: boolean;
}

export interface PaymentReceiptSuccessProps {
  receiptNo: string;
  customerName?: string;
  customerId?: string;
  paymentDate: string;
  detailLabel?: string;
  detailValue: string;
  rows: PaymentReceiptRow[];
  totalPaid: number;
  showFooter?: boolean;
  onGoHome?: () => void;
}

const formatPrice = (price: number) => price.toLocaleString('en-IN');

function buildInvoiceHtml(props: PaymentReceiptSuccessProps) {
  const {
    receiptNo,
    customerName = 'Customer',
    customerId = 'STU767678',
    paymentDate,
    detailLabel = 'Order Details',
    detailValue,
    rows,
    totalPaid,
  } = props;

  const rowHtml = rows
    .map(
      (row) => `
      <span>${row.label}</span>
      <span class="right">${row.isDiscount ? '- ' : ''}Rs.${formatPrice(row.amount)}</span>
    `,
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body { margin: 0; padding: 30px; font-family: Arial, sans-serif; background: #ffffff; color: #000000; }
          .receipt { max-width: 850px; margin: 0 auto; border: 1px solid #e5e7eb; }
          .header { background: #1e3f6d; color: white; padding: 20px 35px; display: flex; justify-content: space-between; }
          .header h2, .header p { margin: 0; }
          .info { padding: 30px 35px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
          .full { grid-column: span 3; }
          .label { color: #777; font-size: 15px; margin-bottom: 8px; }
          .value { font-weight: 700; font-size: 16px; }
          .row-head, .total { background: #e7eefc; display: grid; grid-template-columns: 1fr 180px; padding: 16px 35px; font-weight: 700; }
          .rows { display: grid; grid-template-columns: 1fr 180px; gap: 16px; padding: 24px 35px; font-weight: 700; }
          .right { text-align: right; }
          .note { text-align: center; padding: 22px; font-size: 15px; }
          @media print { body { padding: 0; } .receipt { border: none; } }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div>
              <h2>Financial Receipt</h2>
              <p style="margin-top: 8px; font-weight: 700;">SRIRAM's IAS</p>
            </div>
            <div>
              <p style="opacity: 0.75;">Receipt No :</p>
              <p style="margin-top: 8px; font-weight: 700;">${receiptNo}</p>
            </div>
          </div>
          <div class="info">
            <div><div class="label">Student Name</div><div class="value">${customerName}</div></div>
            <div><div class="label">Student ID</div><div class="value">${customerId}</div></div>
            <div><div class="label">Payment Date</div><div class="value">${paymentDate}</div></div>
            <div class="full"><div class="label">${detailLabel}</div><div class="value">${detailValue}</div></div>
          </div>
          <div class="row-head"><span>Description</span><span class="right">Amount</span></div>
          <div class="rows">${rowHtml}</div>
          <div class="total"><span>Total Paid</span><span class="right">Rs.${formatPrice(totalPaid)}</span></div>
          <div class="note">This is a system generated document and does not require<br />signature</div>
        </div>
        <script>window.onload = function () { window.print(); };</script>
      </body>
    </html>
  `;
}

export default function PaymentReceiptSuccess({
  receiptNo,
  customerName = 'Customer',
  customerId = 'STU767678',
  paymentDate,
  detailLabel = 'Order Details',
  detailValue,
  rows,
  totalPaid,
  onGoHome,
}: PaymentReceiptSuccessProps) {
  const router = useRouter();

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
      return;
    }
    router.push('/');
  };

  const handleDownloadInvoice = () => {
    const receiptWindow = window.open('', '_blank', 'width=900,height=900');
    if (!receiptWindow) return;

    receiptWindow.document.write(
      buildInvoiceHtml({
        receiptNo,
        customerName,
        customerId,
        paymentDate,
        detailLabel,
        detailValue,
        rows,
        totalPaid,
      }),
    );
    receiptWindow.document.close();
  };

  return (
    <div
      className="w-full font-['Montserrat',sans-serif]"
      style={{
        background: 'linear-gradient(115deg, #fffdf8 0%, #fff9ed 45%, #fff2d5 100%)',
      }}
    >
      <div className="min-h-[calc(100vh-140px)] px-6 py-6 md:px-10 md:py-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between xl:px-4">
          <div className="flex flex-col items-start mt-4 lg:mt-10 lg:max-w-[580px]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#00b814] text-[28px] text-[#00b814]">
                ✓
              </div>
              <h1 className="text-[28px] font-extrabold text-[#00b814]">
                Admission Confirmed
              </h1>
            </div>

            <p className="mb-6 max-w-[520px] text-[17px] font-medium leading-[1.6] text-black">
              Thank you for the payment&nbsp; the order of service and the payment is
              received and you will get a confirmation mail
            </p>

            <img
              src={CONFIRMED_BAG}
              alt="Order Confirmed"
              className="mb-8 h-[220px] w-[300px] object-contain md:h-[250px] md:w-[340px] lg:h-[270px] lg:w-[360px]"
            />

            <div className="mt-2 flex flex-wrap gap-5">
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="h-[40px] cursor-pointer rounded-full px-6 text-[15px] font-semibold text-white"
                style={{
                  background: 'linear-gradient(90deg, #43a8da 0%, #003247 100%)',
                }}
              >
                Download Invoice
              </button>

              <button
                type="button"
                onClick={handleGoHome}
                className="h-[40px] cursor-pointer rounded-full border border-[#1a85bb] bg-white px-10 text-[15px] font-semibold text-[#1a85bb]"
              >
                Go Home
              </button>
            </div>
          </div>

          <div className="w-full max-w-[640px] shrink-0 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] lg:ml-auto">
            <div className="flex items-start justify-between bg-[#1e3f6d] px-6 py-5 text-white md:px-10">
              <div>
                <h2 className="text-[18px] font-bold">Financial Receipt</h2>
                <p className="mt-2 text-[17px] font-extrabold">SRIRAM&apos;s IAS</p>
              </div>
              <div>
                <p className="text-[17px] font-semibold text-white/70">Receipt No :</p>
                <p className="mt-2 text-[17px] font-extrabold">{receiptNo}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3 md:px-10">
              <ReceiptInfo label="Student Name" value={customerName} />
              <ReceiptInfo label="Student ID" value={customerId} />
              <ReceiptInfo label="Payment Date" value={paymentDate} />
              <div className="sm:col-span-3">
                <ReceiptInfo label={detailLabel} value={detailValue} />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_180px] bg-[#e7eefc] px-6 py-4 md:px-10">
              <span className="text-[17px] font-bold text-[#5c6170]">Description</span>
              <span className="text-right text-[17px] font-bold text-[#5c6170]">Amount</span>
            </div>

            <div className="grid grid-cols-[1fr_180px] gap-y-5 px-6 py-6 md:px-10">
              {rows.map((row) => (
                <React.Fragment key={row.label}>
                  <span className="text-[17px] font-extrabold text-black">{row.label}</span>
                  <span className="text-right text-[17px] font-extrabold text-black">
                    {row.isDiscount ? '- ' : ''}Rs.{formatPrice(row.amount)}
                  </span>
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-[1fr_180px] bg-[#e7eefc] px-6 py-5 md:px-10">
              <span className="text-[17px] font-extrabold text-black">Total Paid</span>
              <span className="text-right text-[17px] font-extrabold text-black">
                Rs.{formatPrice(totalPaid)}
              </span>
            </div>

            <div className="px-6 py-5 text-center text-[17px] font-medium leading-[1.5] text-black md:px-10">
              This is a system generated document and does not require
              <br />
              signature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[17px] font-semibold text-[#777]">{label}</p>
      <p className="mt-3 text-[17px] font-extrabold text-black">{value}</p>
    </div>
  );
}
