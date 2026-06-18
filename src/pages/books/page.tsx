import BooksPageClient from "./BooksPageClient";
import { mockBooks } from "@/features/books/data/books";

export default function BooksRoute() {
  return <BooksPageClient books={mockBooks} />;
}
