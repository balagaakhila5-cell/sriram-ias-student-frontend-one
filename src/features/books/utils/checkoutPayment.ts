import type { PaymentReceiptRow } from '@/components/common/PaymentReceiptSuccess';

const GST_PERCENT = 18;

export function generateReceiptNo() {
  return 'SI-090-' + Math.floor(1000 + Math.random() * 9000);
}

export function formatPaymentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}

export function buildReceiptData(
  cartSubtotal: number,
  couponDiscount: number,
  orderTitles: string,
) {
  const deliveryCharge = 50;
  const priceAfterDiscount = Math.max(
    cartSubtotal - couponDiscount + deliveryCharge,
    0,
  );
  const gstAmount = Math.round((priceAfterDiscount * GST_PERCENT) / 100);
  const totalPaid = priceAfterDiscount + gstAmount;

  const rows: PaymentReceiptRow[] = [{ label: 'Book Price', amount: cartSubtotal }];

  if (couponDiscount > 0) {
    rows.push({
      label: 'Coupon Discount',
      amount: couponDiscount,
      isDiscount: true,
    });
  }

  if (deliveryCharge > 0) {
    rows.push({ label: 'Delivery Charge', amount: deliveryCharge });
  }

  rows.push({ label: 'Price After Discount', amount: priceAfterDiscount });
  rows.push({ label: `GST (${GST_PERCENT}%)`, amount: gstAmount });

  return {
    rows,
    totalPaid,
    detailValue: orderTitles || 'Books Order',
  };
}
