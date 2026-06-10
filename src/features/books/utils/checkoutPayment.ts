import type { PaymentReceiptRow } from '@/components/common/PaymentReceiptSuccess';
import { CHECKOUT_DELIVERY_CHARGE } from '@/features/books/utils/checkoutTotals';

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
  const deliveryCharge = CHECKOUT_DELIVERY_CHARGE;
  const totalAmount = Math.max(
    cartSubtotal - couponDiscount + deliveryCharge,
    0,
  );

  const rows: PaymentReceiptRow[] = [{ label: 'Items Total', amount: cartSubtotal }];

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

  return {
    rows,
    totalPaid: totalAmount,
    detailValue: orderTitles || 'Books Order',
  };
}
