export interface BookstoreViewProduct {
  _id: string;
  productId: string;
  productName: string;
  examCategoryId: string;
  examCategoryName: string;
  authorName: string;
  isbn: string;
  language: string;
  stockQuantity: number;
  soldQuantity: number;
  originalPrice: number;
  discountPrice: number;
  bookSummary: string;
  thumbnail: string;
  previewPdf: string | null;
  previewPdfFileName: string | null;
  seoKeywords: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
