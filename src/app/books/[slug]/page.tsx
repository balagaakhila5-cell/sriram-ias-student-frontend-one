import BookDetailsClient from "./BookDetailsClient";
import { getBookBySlug } from "@/features/books/data/books";
import type { Metadata } from 'next';
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  
  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title} | SRIRAM's IAS Books`,
    description: book.summary,
  };
}

export default async function BookDetailsRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return <BookDetailsClient slug={slug} />;
}
