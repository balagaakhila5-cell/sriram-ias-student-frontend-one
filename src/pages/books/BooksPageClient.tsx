'use client';

import React from 'react';
import MainLayout from '@/components/common/MainLayout';
import BooksHero from '@/features/books/components/BooksHero';
import BooksOverviewTabs from '@/features/books/components/BooksOverviewTabs';
import BooksGrid from '@/features/books/components/BooksGrid';
import CartSidebar from '@/features/books/components/CartSidebar';
import BooksCartButton from '@/features/books/components/BooksCartButton';
import EmptyState from '@/features/currentAffairs/components/EmptyState';
import { useAvailableBookProducts } from '@/features/books/hooks/useBookstoreProducts';

function BooksGridSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-[#Fdfdfd] py-16">
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <div className="mb-16 flex justify-center">
          <div className="h-14 w-72 animate-pulse rounded-xl bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="mb-6 aspect-[3/4] w-full rounded-xl bg-slate-200" />
              <div className="mx-auto h-5 w-3/4 rounded bg-slate-200" />
              <div className="mx-auto mt-2 h-4 w-1/2 rounded bg-slate-100" />
              <div className="mx-auto mt-4 h-6 w-24 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const BooksPageClient: React.FC = () => {
  const { data: books = [], isLoading, isError, error, isFetching } =
    useAvailableBookProducts();

  const isBusy = isLoading || isFetching;
  const hasBooks = !isError && books.length > 0;

  return (
    <MainLayout>
      <BooksHero />
      {!isBusy && hasBooks ? <BooksOverviewTabs featuredBook={books[0]} /> : null}
      {isBusy ? <BooksGridSkeleton /> : null}
      {!isBusy && isError ? (
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
          <EmptyState
            title="Unable to load books"
            message={error?.message || 'Unable to fetch products. Please try again.'}
          />
        </div>
      ) : null}
      {!isBusy && !isError && books.length === 0 ? (
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
          <EmptyState title="No Books Available" message="" />
        </div>
      ) : null}
      {!isBusy && hasBooks ? <BooksGrid books={books} /> : null}
      <BooksCartButton />
      <CartSidebar suggestedBooks={books.slice(0, 3)} />
    </MainLayout>
  );
};

export default BooksPageClient;
