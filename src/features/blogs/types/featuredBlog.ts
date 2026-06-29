export interface FeaturedBlog {
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
  description?: string;
  isFeatured: boolean;
  youtubeVideoUrl?: string | null;
}

export interface FeaturedBlogParams {
  language: string;
}

export interface FeaturedBlogApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: FeaturedBlog | null;
  error: unknown;
}
