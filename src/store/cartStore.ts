'use client';

import { create } from 'zustand';
import { Book } from '@/features/books/types';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (book) => {
    set((state) => {
      const existing = state.items.find((i) => i.book.id === book.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.book.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, { book, quantity: 1 }], isOpen: true };
    });
  },

  removeItem: (bookId) =>
    set((state) => ({ items: state.items.filter((i) => i.book.id !== bookId) })),

  updateQuantity: (bookId, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      items: state.items.map((i) =>
        i.book.id === bookId ? { ...i, quantity } : i
      ),
    }));
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  subtotal: () =>
    get().items.reduce((sum, i) => sum + i.book.discountedPrice * i.quantity, 0),
}));
