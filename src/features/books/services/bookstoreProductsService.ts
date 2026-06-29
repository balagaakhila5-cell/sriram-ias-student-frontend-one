import { http } from "@/lib/http";
import {
  ApiError,
  type ApiEnvelope,
  extractApiMessage,
  isApiSuccess,
} from "@/lib/apiResult";
import type { Book } from "@/features/books/types";
import type {
  BookstoreListData,
  BookstoreListPagination,
  BookstoreListProductItem,
  BookstoreListRequest,
} from "@/features/books/types/bookstoreList";
import {
  mapBookstoreListItemToBook,
  mapBookstoreListItemsToBooks,
  mapBookstoreViewToBook,
} from "@/features/books/adapters/bookstoreProductsAdapter";
import type { BookstoreViewProduct } from "@/features/books/types/bookstoreView";

const BOOKS_FETCH_ERROR = "Unable to fetch products. Please try again.";
const PRODUCT_DETAIL_ERROR = "Unable to fetch product details. Please try again.";
const LIST_PRODUCTS_PATH = "/bookstore/products/list";
const VIEW_PRODUCT_PATH = "/bookstore/products/view";
const DEFAULT_PAGE_LIMIT = 50;
const MAX_LIST_PAGES = 100;

type RawPublicListItem = BookstoreListProductItem & {
  thumbnail?: string;
  price?: number;
  bookSummary?: string;
};

type RawPublicListPayload =
  | BookstoreListData
  | RawPublicListItem[]
  | null
  | undefined;

function buildListRequest(page: number, limit: number): BookstoreListRequest {
  return {
    page,
    limit,
    search: "",
    status: "",
  };
}

function emptyPagination(page: number, limit: number): BookstoreListPagination {
  return {
    total: 0,
    page,
    limit,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };
}

function normalizePublicListItem(raw: RawPublicListItem): BookstoreListProductItem {
  const discountPrice = Number(raw.discountPrice ?? raw.price) || 0;

  return {
    _id: String(raw._id || raw.productId || ""),
    productId: String(raw.productId || raw._id || ""),
    productName: raw.productName || "",
    authorName: raw.authorName || "",
    examCategoryName: raw.examCategoryName || "",
    discountPrice,
    originalPrice: Number(raw.originalPrice) || discountPrice,
    stockQuantity: Number(raw.stockQuantity) || 0,
    thumbnailUrl: raw.thumbnailUrl || raw.thumbnail || "",
    bookSummary: raw.bookSummary || "",
    status: raw.status || "ACTIVE",
  };
}

function parsePublicListPayload(
  payload: RawPublicListPayload,
  page: number,
  limit: number,
): BookstoreListData {
  if (Array.isArray(payload)) {
    const items = payload.map(normalizePublicListItem);

    return {
      items,
      pagination: {
        total: items.length,
        page: 1,
        limit: items.length || limit,
        totalPages: items.length > 0 ? 1 : 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  const items = Array.isArray(payload?.items)
    ? payload.items.map(normalizePublicListItem)
    : [];

  return {
    items,
    pagination: payload?.pagination ?? emptyPagination(page, limit),
  };
}

async function fetchBookstoreProductsListPage(
  page: number,
  limit: number,
): Promise<BookstoreListData> {
  const { data } = await http.post<ApiEnvelope<RawPublicListPayload>>(
    LIST_PRODUCTS_PATH,
    buildListRequest(page, limit),
    { timeout: 90_000 },
  );

  if (!isApiSuccess(data.statusCode) || data.success !== true) {
    throw new ApiError(extractApiMessage(data, BOOKS_FETCH_ERROR), {
      statusCode: data.statusCode,
    });
  }

  return parsePublicListPayload(data.data, page, limit);
}

async function fetchAllActiveBookProducts(): Promise<BookstoreListProductItem[]> {
  const allItems: BookstoreListProductItem[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage && page <= MAX_LIST_PAGES) {
    const result = await fetchBookstoreProductsListPage(page, DEFAULT_PAGE_LIMIT);
    allItems.push(...result.items);
    hasNextPage = Boolean(result.pagination?.hasNextPage);
    page += 1;
  }

  return allItems;
}

async function fetchBookFromPublicList(productId: string): Promise<Book | null> {
  const items = await fetchAllActiveBookProducts();
  const match = items.find(
    (item) => item.productId === productId || item._id === productId,
  );

  return match ? mapBookstoreListItemToBook(match) : null;
}

export async function fetchAvailableBookProducts(): Promise<Book[]> {
  try {
    const items = await fetchAllActiveBookProducts();
    return mapBookstoreListItemsToBooks(items);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(BOOKS_FETCH_ERROR);
  }
}

export async function fetchBookProductById(productId: string): Promise<Book | null> {
  const normalizedId = String(productId || "").trim();
  if (!normalizedId) return null;

  try {
    const { data } = await http.post<ApiEnvelope<BookstoreViewProduct>>(
      VIEW_PRODUCT_PATH,
      { productId: normalizedId },
      { timeout: 90_000 },
    );

    if (!isApiSuccess(data.statusCode) || data.success !== true) {
      throw new ApiError(extractApiMessage(data, PRODUCT_DETAIL_ERROR), {
        statusCode: data.statusCode,
      });
    }

    if (!data.data) return fetchBookFromPublicList(normalizedId);
    return mapBookstoreViewToBook(data.data);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.httpStatus === 404) {
        return fetchBookFromPublicList(normalizedId);
      }
      throw error;
    }

    throw new ApiError(PRODUCT_DETAIL_ERROR);
  }
}

export async function fetchBookProductBySlug(slug: string): Promise<Book | null> {
  const normalizedSlug = decodeURIComponent(String(slug || "").trim());
  if (!normalizedSlug) return null;

  return fetchBookProductById(normalizedSlug);
}

export async function fetchBookProductPreviewImages(productId: string): Promise<string[]> {
  try {
    const { data } = await http.post<
      ApiEnvelope<{ previewImages?: string[] }>
    >("/bookstore/products/view-sample", { productId });

    if (!isApiSuccess(data.statusCode)) {
      throw new ApiError(extractApiMessage(data, BOOKS_FETCH_ERROR), {
        statusCode: data.statusCode,
      });
    }

    return Array.isArray(data.data?.previewImages) ? data.data.previewImages : [];
  } catch {
    return [];
  }
}
