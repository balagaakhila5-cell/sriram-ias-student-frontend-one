import type { Book } from "@/features/books/types";
import type { BookstoreListProductItem } from "@/features/books/types/bookstoreList";
import type { BookstoreViewProduct } from "@/features/books/types/bookstoreView";
import type { HomepageBook } from "@/features/homepage/types";
import { bookDetailSlug } from "@/features/homepage/utils/homepageLinks";

const PLACEHOLDER_COVER = "/assets/books.png";

function computeDiscountPercentage(originalPrice: number, discountedPrice: number): string {
  if (!originalPrice || originalPrice <= discountedPrice) return "";
  const percent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  return percent > 0 ? `${percent}% OFF` : "";
}

function formatBookTags(item: {
  seoKeywords?: string[];
  examCategoryName?: string;
}): string[] {
  if (Array.isArray(item.seoKeywords) && item.seoKeywords.length > 0) {
    return item.seoKeywords;
  }
  return item.examCategoryName ? [item.examCategoryName] : [];
}

export function mapBookstoreViewToBook(item: BookstoreViewProduct): Book {
  const id = item.productId || item._id || "";
  const originalPrice = Number(item.originalPrice) || Number(item.discountPrice) || 0;
  const discountedPrice = Number(item.discountPrice) || 0;

  return {
    id,
    slug: bookDetailSlug(id),
    title: item.productName || "Book",
    subtitle: item.examCategoryName,
    categoryName: item.examCategoryName,
    examCategoryId: item.examCategoryId,
    author: item.authorName || "SRIRAM's IAS",
    isbn: item.isbn || "",
    language: item.language || "English",
    originalPrice,
    discountedPrice,
    discountPercentage: computeDiscountPercentage(originalPrice, discountedPrice),
    coverImage: item.thumbnail || PLACEHOLDER_COVER,
    tags: formatBookTags(item),
    summary: item.bookSummary || "",
    stockQuantity: Number(item.stockQuantity) || 0,
    soldQuantity: Number(item.soldQuantity) || 0,
    previewPdf: item.previewPdf,
    previewPdfFileName: item.previewPdfFileName,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    offers: [],
  };
}

export function mapBookstoreListItemToBook(item: BookstoreListProductItem): Book {
  const id = item.productId || item._id || "";
  const discountedPrice = Number(item.discountPrice) || 0;
  const originalPrice = Number(item.originalPrice) || discountedPrice;

  return {
    id,
    slug: bookDetailSlug(id),
    title: item.productName || "Book",
    subtitle: item.examCategoryName,
    categoryName: item.examCategoryName,
    author: item.authorName || "SRIRAM's IAS",
    originalPrice,
    discountedPrice,
    discountPercentage: computeDiscountPercentage(originalPrice, discountedPrice),
    coverImage: item.thumbnailUrl || PLACEHOLDER_COVER,
    tags: item.examCategoryName ? [item.examCategoryName] : [],
    summary: item.bookSummary || "",
    stockQuantity: Number(item.stockQuantity) || 0,
    offers: [],
  };
}

export function mapBookstoreListItemsToBooks(
  items: BookstoreListProductItem[] = [],
): Book[] {
  return items
    .map(mapBookstoreListItemToBook)
    .filter((book) => Boolean(book.id && book.title));
}

export function mapHomepageBookToBook(book: HomepageBook): Book {
  const id = book._id || book.productId || "";
  const discountedPrice =
    typeof book.discountedPrice === "number" && book.discountedPrice > 0
      ? book.discountedPrice
      : typeof book.price === "number" && book.price > 0
        ? book.price
        : 0;
  const originalPrice =
    typeof book.originalPrice === "number" && book.originalPrice > 0
      ? book.originalPrice
      : discountedPrice;

  return {
    id,
    slug: book.slug || bookDetailSlug(id),
    title: book.title || book.productName || "Book",
    subtitle: book.categoryName || book.examCategoryName,
    categoryName: book.categoryName || book.examCategoryName,
    author: book.authorName || "SRIRAM's IAS",
    originalPrice,
    discountedPrice,
    discountPercentage: computeDiscountPercentage(originalPrice, discountedPrice),
    coverImage: book.image || book.thumbnail || PLACEHOLDER_COVER,
    tags: book.categoryName ? [book.categoryName] : book.tags || [],
    summary: book.summary || book.bookSummary || "",
    offers: [],
  };
}

export function mapHomepageBooksToBooks(books: HomepageBook[] = []): Book[] {
  return books
    .map(mapHomepageBookToBook)
    .filter((book) => Boolean(book.id && book.title));
}
