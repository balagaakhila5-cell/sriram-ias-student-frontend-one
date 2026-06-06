import type { Book } from "@/features/books/types";
import { bookDetailSlug } from "@/features/homepage/utils/homepageLinks";

export type HomeSectionBook = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  priceLabel: string;
  image: string;
  discountedPrice: number;
  originalPrice: number;
};

export function toCartBook(book: HomeSectionBook): Book {
  return {
    id: book.id,
    slug: book.slug,
    title: book.title,
    author: "SRIRAM's IAS",
    originalPrice: book.originalPrice,
    discountedPrice: book.discountedPrice,
    discountPercentage: "10% OFF",
    coverImage: book.image,
    tags: ["UPSC", "Books"],
    summary: book.summary,
    offers: [
      {
        price: Math.round(book.discountedPrice * 0.92),
        description: "Buy for 2,500 or more to get 5% off",
      },
      {
        price: Math.round(book.discountedPrice * 0.9),
        description: "Buy for 5,000 or more to get 10% off",
      },
    ],
  };
}

export function mapHomepageBook(input: {
  id: string;
  title: string;
  summary?: string;
  priceLabel: string;
  image: string;
  discountedPrice?: number;
}): HomeSectionBook {
  const discountedPrice =
    typeof input.discountedPrice === "number" && input.discountedPrice > 0
      ? input.discountedPrice
      : 5999;
  const originalPrice = Math.round(discountedPrice * 1.15);

  return {
    id: input.id,
    slug: bookDetailSlug(input.id),
    title: input.title,
    summary: input.summary ?? "Explore this book to level up your preparation.",
    priceLabel: input.priceLabel,
    image: input.image,
    discountedPrice,
    originalPrice,
  };
}
