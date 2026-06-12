import type { CartItem } from '@/store/cartStore';
import { bookDiscountTotal } from '@/features/books/utils/checkoutCoupons';

export const CHECKOUT_DELIVERY_CHARGE = 50;

export function computeCheckoutTotals(
  items: CartItem[],
  couponDiscount = 0,
) {
  const cartSubtotal = items.reduce(
    (sum, item) => sum + item.book.discountedPrice * item.quantity,
    0,
  );
  const bookDiscount = bookDiscountTotal(items);
  const totalAmount = Math.max(
    cartSubtotal - couponDiscount + CHECKOUT_DELIVERY_CHARGE,
    0,
  );

  return {
    cartSubtotal,
    bookDiscount,
    couponDiscount,
    deliveryCharge: CHECKOUT_DELIVERY_CHARGE,
    totalAmount,
  };
}
