import BookDetailsClient from "./BookDetailsClient";
import { getBookBySlug } from "@/features/books/data/books";
import { notFound } from "next/navigation";

export default async function BookDetailsRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return <BookDetailsClient slug={slug} />;
}
