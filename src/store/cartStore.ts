'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Book } from '@/features/books/types';
import type { AppliedCoupon } from '@/features/books/utils/checkoutCoupons';
import {
  tryApplyCouponCode,
  tryApplyOfferIndex,
} from '@/features/books/utils/checkoutCoupons';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isHydrated: boolean;
  appliedCoupon: AppliedCoupon | null;
  couponMessage: string | null;
  addItem: (book: Book, options?: { openSidebar?: boolean }) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  subtotal: () => number;
  applyCouponCode: (code: string) => boolean;
  applyOfferCoupon: (offerIndex: number) => boolean;
  clearCoupon: () => void;
  clearCouponMessage: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isHydrated: false,
      appliedCoupon: null,
      couponMessage: null,

      addItem: (book, options) => {
        const openSidebar = options?.openSidebar !== false;

        set((state) => {
          const existing = state.items.find((i) => i.book.id === book.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.book.id === book.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
              isOpen: openSidebar ? true : state.isOpen,
              appliedCoupon: null,
              couponMessage: null,
            };
          }
          return {
            items: [...state.items, { book, quantity: 1 }],
            isOpen: openSidebar ? true : state.isOpen,
            appliedCoupon: null,
            couponMessage: null,
          };
        });
      },

      removeItem: (bookId) =>
        set((state) => ({
          items: state.items.filter((i) => i.book.id !== bookId),
          appliedCoupon: null,
          couponMessage: null,
        })),

      updateQuantity: (bookId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((i) =>
            i.book.id === bookId ? { ...i, quantity } : i,
          ),
          appliedCoupon: null,
          couponMessage: null,
        }));
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.book.discountedPrice * item.quantity,
          0,
        ),

      applyCouponCode: (code) => {
        const cartSubtotal = get().subtotal();
        const result = tryApplyCouponCode(code, cartSubtotal);

        if ('error' in result) {
          set({ appliedCoupon: null, couponMessage: result.error });
          return false;
        }

        set({
          appliedCoupon: result.coupon,
          couponMessage: `${result.coupon.label} — saved Rs.${result.coupon.amount.toLocaleString('en-IN')}`,
        });
        return true;
      },

      applyOfferCoupon: (offerIndex) => {
        const cartSubtotal = get().subtotal();
        const result = tryApplyOfferIndex(offerIndex, cartSubtotal);

        if ('error' in result) {
          set({ appliedCoupon: null, couponMessage: result.error });
          return false;
        }

        set({
          appliedCoupon: result.coupon,
          couponMessage: `${result.coupon.label} — saved Rs.${result.coupon.amount.toLocaleString('en-IN')}`,
        });
        return true;
      },

      clearCoupon: () => set({ appliedCoupon: null, couponMessage: null }),
      clearCouponMessage: () => set({ couponMessage: null }),
    }),
    {
      name: 'sriram_cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Cart store rehydration failed:', error);
        }

        useCartStore.setState({ isHydrated: true });
      },
    },
  ),
);

if (typeof window !== 'undefined') {
  void useCartStore.persist.rehydrate();
}
