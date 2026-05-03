import { Book } from '../types';

export const mockBooks: Book[] = Array(8).fill(null).map((_, i) => ({
  id: `${i + 1}`,
  slug: `indian-economy-general-studies-book-${i + 1}`,
  title: "Indian Economy General Studies Book -1",
  author: "Author Name",
  originalPrice: 6999,
  discountedPrice: 5999,
  discountPercentage: "10% OFF",
  coverImage: "/assets/books/indianEconomy.png",
  tags: ["Science", "Indian Economy", "Finance Rules", "Loans data"],
  summary: "The Indian Economy is a mixed economy, meaning both the government (public sector) and private sector operate together. It is one of the fastest-growing major economies in the world.",
  offers: [
    { price: 5500, description: "Buy for 2,500 or more to get 5% off" },
    { price: 5000, description: "Buy for 5,000 or more to get 10% off" }
  ]
}));

export const getBookBySlug = (slug: string): Book | undefined => {
  return mockBooks.find(b => b.slug === slug);
};
