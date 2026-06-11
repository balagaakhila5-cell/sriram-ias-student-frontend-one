import { getYouTubeVideoId } from '@/lib/youtube';

export type SuccessStory = {
  id: number;
  name: string;
  rank: string;
  videoUrl: string;
};

const FEATURED_VIDEO_URL = 'https://youtu.be/8aLYn6C9n8I';

export const SUCCESS_STORIES: SuccessStory[] = [
  { id: 1, name: 'K. Priyanka', rank: 'AIR 08', videoUrl: FEATURED_VIDEO_URL },
  { id: 2, name: 'Aakash Garg', rank: 'AIR 05', videoUrl: FEATURED_VIDEO_URL },
  { id: 3, name: 'Abhi Jain', rank: 'AIR 34', videoUrl: FEATURED_VIDEO_URL },
  { id: 4, name: 'Raghav Jhunjhunwala', rank: 'AIR 41', videoUrl: FEATURED_VIDEO_URL },
  { id: 5, name: 'Swati Sharma', rank: 'AIR 12', videoUrl: FEATURED_VIDEO_URL },
];

export function getSuccessStoryThumbnail(videoUrl: string): string {
  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId) return '/assets/youtube_video_image.png';
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
