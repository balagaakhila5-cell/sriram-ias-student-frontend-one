export interface BookstoreListProductItem {
  _id: string;
  productId: string;
  productName: string;
  authorName: string;
  examCategoryName: string;
  discountPrice: number;
  originalPrice?: number;
  stockQuantity: number;
  thumbnailUrl: string;
  bookSummary?: string;
  status: string;
}

export interface BookstoreListPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BookstoreListData {
  items: BookstoreListProductItem[];
  pagination: BookstoreListPagination;
}

export interface BookstoreListRequest {
  page: number;
  limit: number;
  search: string;
  status: string;
}
