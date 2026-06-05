export interface AppliedCoupon {
  code: string;
  label: string;
  amount: number;
}

const FLAT_COUPONS: Record<string, number> = {
  SAVE500: 500,
  SAVE1000: 1000,
};

const OFFER_TIERS = [
  {
    code: 'OFFER5',
    minSubtotal: 2500,
    percent: 5,
    label: '5% off on orders of 2,500 or more',
  },
  {
    code: 'OFFER10',
    minSubtotal: 5000,
    percent: 10,
    label: '10% off on orders of 5,000 or more',
  },
] as const;

function buildPercentCoupon(
  tier: (typeof OFFER_TIERS)[number],
  cartSubtotal: number,
): AppliedCoupon {
  return {
    code: tier.code,
    label: tier.label,
    amount: Math.round((cartSubtotal * tier.percent) / 100),
  };
}

export function tryApplyCouponCode(
  code: string,
  cartSubtotal: number,
): { coupon: AppliedCoupon } | { error: string } {
  const normalized = code.trim().toUpperCase();

  if (!normalized) {
    return { error: 'Please enter a coupon code.' };
  }

  if (FLAT_COUPONS[normalized]) {
    return {
      coupon: {
        code: normalized,
        label: `${normalized} coupon applied`,
        amount: Math.min(FLAT_COUPONS[normalized], cartSubtotal),
      },
    };
  }

  const tier = OFFER_TIERS.find(
    (item) => item.code === normalized || item.code.replace('OFFER', 'SAVE') === normalized,
  );

  if (tier) {
    if (cartSubtotal < tier.minSubtotal) {
      return {
        error: `Minimum order of Rs.${tier.minSubtotal.toLocaleString('en-IN')} required for this coupon.`,
      };
    }

    return { coupon: buildPercentCoupon(tier, cartSubtotal) };
  }

  return { error: 'Invalid coupon code. Try SAVE500, SAVE1000, OFFER5, or OFFER10.' };
}

export function tryApplyOfferIndex(
  offerIndex: number,
  cartSubtotal: number,
): { coupon: AppliedCoupon } | { error: string } {
  const tier = OFFER_TIERS[offerIndex];

  if (!tier) {
    return { error: 'This offer is not available.' };
  }

  if (cartSubtotal < tier.minSubtotal) {
    return {
      error: `Add items worth Rs.${tier.minSubtotal.toLocaleString('en-IN')} or more to use this offer.`,
    };
  }

  return { coupon: buildPercentCoupon(tier, cartSubtotal) };
}

export function bookDiscountTotal(
  items: { book: { originalPrice: number; discountedPrice: number }; quantity: number }[],
): number {
  return items.reduce(
    (sum, item) =>
      sum + (item.book.originalPrice - item.book.discountedPrice) * item.quantity,
    0,
  );
}

export function originalTotal(
  items: { book: { originalPrice: number }; quantity: number }[],
): number {
  return items.reduce((sum, item) => sum + item.book.originalPrice * item.quantity, 0);
}
