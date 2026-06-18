import BooksPageClient from "./BooksPageClient";
import { mockBooks } from "@/features/books/data/books";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books | SRIRAM\'s IAS',
  description: 'Explore our latest collection of recommended books and study materials for IAS preparation.',
};

export default async function BooksRoute() {
  // In a real app we'd fetch books from an API here
  const books = mockBooks;
  
  return <BooksPageClient books={books} />;
}
