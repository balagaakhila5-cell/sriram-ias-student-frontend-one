export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: string;
  coverImage: string;
  tags: string[];
  summary: string;
  offers: {
    price: number;
    description: string;
  }[];
}
