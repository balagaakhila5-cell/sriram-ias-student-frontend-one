'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const BooksCartButton: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-24 left-4 z-[60] flex items-center gap-2 rounded-full border border-[#249EDC] bg-white px-4 py-2.5 font-['Montserrat'] text-sm font-semibold text-[#007BB5] shadow-[0_8px_24px_rgba(36,158,220,0.25)] transition-all hover:scale-[1.03] hover:bg-[#EAF7FF] sm:bottom-6 sm:left-6"
      aria-label={`View cart with ${totalItems} items`}
    >
      <ShoppingCart size={18} aria-hidden />
      <span>My Cart ({totalItems})</span>
    </button>
  );
};

export default BooksCartButton;
