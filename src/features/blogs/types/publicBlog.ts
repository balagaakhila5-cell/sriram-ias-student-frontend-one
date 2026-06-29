export interface PublicBlog {
  id: string;
  blogId: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  time: string;
  readTime: string;
  tags: string[];
  isMainBlog: boolean;
  youtubeVideoUrl?: string | null;
}

export interface PublicBlogListParams {
  language: string;
  category?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface PublicBlogListPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PublicBlogListResult {
  blogs: PublicBlog[];
  pagination: PublicBlogListPagination;
}

export interface BlogListApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: PublicBlog[];
  error: unknown;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
