export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  categoryName?: string;
  examCategoryId?: string;
  author: string;
  isbn?: string;
  language?: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: string;
  coverImage: string;
  tags: string[];
  summary: string;
  stockQuantity?: number;
  soldQuantity?: number;
  previewPdf?: string | null;
  previewPdfFileName?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  offers: {
    price: number;
    description: string;
  }[];
}
