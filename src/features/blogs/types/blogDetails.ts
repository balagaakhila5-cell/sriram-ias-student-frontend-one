import type { BlogLanguage } from '@/features/blogs/types/blogLanguage';

export interface BlogTableOfContent {
  order: number;
  topic: string;
  image: string | null;
  content: string;
}

export interface BlogDetails {
  id: string;
  blogId: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  youtubeVideoUrl: string | null;
  metaTitle: string;
  metaDescription: string;
  readTime: string;
  tags: string[];
  tableOfContents: BlogTableOfContent[];
  language: BlogLanguage;
  date: string;
  time: string;
}

export interface BlogDetailsParams {
  id: string;
}

export interface BlogDetailsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: BlogDetails | null;
  error: unknown;
}
