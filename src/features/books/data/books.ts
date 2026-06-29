import { Book } from '../types';

export const INDIAN_ECONOMY_SAMPLE_BOOK = {
  title: 'Sample Book',
  image: '/assets/books/indianEconomy.png',
  slug: '',
} as const;

export function getBookBySlug(_slug: string): Book | undefined {
  return undefined;
}
