export interface YoutubeVideoApiItem {
  _id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  youtubeVideoId?: string;
  thumbnailUrl?: string;
  status: "ACTIVE" | "INACTIVE" | string;
  priority?: number;
  rank?: number | null;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface YoutubeVideosListResponse extends YoutubeVideoApiItem {
  count?: number;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface YoutubeVideoCard {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  youtubeVideoId?: string;
  priority: number;
  rank: number;
}

export interface ActiveYoutubeVideosResult {
  videos: YoutubeVideoCard[];
  message: string;
}
