'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { mockBooks } from '@/features/books/data/books';

const CartSidebar: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();
  const router = useRouter();

  const suggestedBooks = mockBooks.slice(0, 3);

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[65]"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[375px] bg-white z-[70] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-[22px] font-bold text-gray-900 font-['Montserrat']">My Cart</h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={16} color="white" strokeWidth={3} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Cart Items */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <p className="text-gray-500 font-['Montserrat'] font-medium text-base">Your cart is empty</p>
            </div>
          ) : (
            <div className="px-4 py-4 flex flex-col gap-3">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="flex gap-3 bg-white rounded-xl p-3 border border-gray-100">
                  {/* Book Image */}
                  <div className="w-[80px] h-[90px] relative rounded-lg overflow-hidden shrink-0 bg-[#01285A]">
                    <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col gap-1 font-['Montserrat']">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-bold text-sm text-gray-900 leading-tight line-clamp-2">{book.title}</p>
                      <button
                        onClick={() => removeItem(book.id)}
                        className="shrink-0 text-gray-400 hover:text-red-500 transition-colors mt-0.5"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Quantity stepper */}
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-gray-500 font-medium">Quantity</span>
                      <div className="flex items-center border border-gray-200 rounded ml-2">
                        <span className="px-3 py-0.5 text-sm font-semibold text-gray-800">{quantity}</span>
                        <div className="flex flex-col border-l border-gray-200">
                          <button
                            onClick={() => updateQuantity(book.id, quantity + 1)}
                            className="px-1 py-0.5 hover:bg-gray-50"
                          >
                            <ChevronUp size={12} />
                          </button>
                          <button
                            onClick={() => updateQuantity(book.id, quantity - 1)}
                            className="px-1 py-0.5 hover:bg-gray-50 border-t border-gray-200"
                          >
                            <ChevronDown size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-400 text-xs line-through font-medium">
                        {book.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-gray-900 font-black text-base">
                        {book.discountedPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-2 bg-gray-50 mx-0" />

          {/* You May Also Like */}
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-base font-bold text-gray-900 font-['Montserrat'] mb-3">You May Also like</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {suggestedBooks.map((book) => (
                <div key={book.id} className="shrink-0 w-[110px] flex flex-col gap-1 font-['Montserrat']">
                  <div className="w-[110px] h-[110px] relative rounded-lg overflow-hidden bg-[#01285A]">
                    <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
                  </div>
                  <p className="text-[11px] font-semibold text-gray-900 leading-tight line-clamp-2">{book.title}</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[#1897D8] font-bold text-xs">
                      {book.discountedPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-gray-400 line-through text-[10px]">
                      ({book.originalPrice.toLocaleString('en-IN')})
                    </span>
                    <span className="text-gray-500 text-[10px]">10% off</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-2 bg-gray-50" />

          {/* Subtotal */}
          <div className="px-5 pt-4 pb-2 font-['Montserrat']">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Subtotal</span>
              <span className="text-lg font-bold text-[#1897D8]">
                Rs.{subtotal().toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Check for coupon code after checking out</p>
          </div>
        </div>

        {/* Footer - Checkout Button */}
        <div className="px-5 py-4 border-t border-gray-100 bg-white">
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full py-4 rounded-full bg-linear-to-r from-[#00679C] to-[#002436] text-white font-bold text-base font-['Montserrat'] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
