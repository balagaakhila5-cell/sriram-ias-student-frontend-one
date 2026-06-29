import type { PublicBlog } from '@/features/blogs/types/publicBlog';

export type HomepageBundleBlog = PublicBlog & {
  description?: string;
};

export interface BlogHomepageBundle {
  featured: HomepageBundleBlog | null;
  previewBlogs: HomepageBundleBlog[];
  categories: string[];
  gsPaperWise: Record<string, HomepageBundleBlog[]>;
}

export interface BlogHomepageParams {
  language: string;
}

export interface BlogHomepageApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: BlogHomepageBundle;
  error: unknown;
}
