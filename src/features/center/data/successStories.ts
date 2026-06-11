export type SuccessStory = {
  id: number;
  name: string;
  rank: string;
  image: string;
  videoUrl: string;
};

const FEATURED_VIDEO_URL = 'https://youtu.be/8aLYn6C9n8I';

const SUCCESS_STORY_PORTRAITS = [
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=400&h=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=500&auto=format&fit=crop',
] as const;

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 1,
    name: 'K. Priyanka',
    rank: 'AIR 08',
    image: SUCCESS_STORY_PORTRAITS[0],
    videoUrl: FEATURED_VIDEO_URL,
  },
  {
    id: 2,
    name: 'Aakash Garg',
    rank: 'AIR 05',
    image: SUCCESS_STORY_PORTRAITS[1],
    videoUrl: FEATURED_VIDEO_URL,
  },
  {
    id: 3,
    name: 'Abhi Jain',
    rank: 'AIR 34',
    image: SUCCESS_STORY_PORTRAITS[2],
    videoUrl: FEATURED_VIDEO_URL,
  },
  {
    id: 4,
    name: 'Raghav Jhunjhunwala',
    rank: 'AIR 41',
    image: SUCCESS_STORY_PORTRAITS[3],
    videoUrl: FEATURED_VIDEO_URL,
  },
  {
    id: 5,
    name: 'Swati Sharma',
    rank: 'AIR 12',
    image: SUCCESS_STORY_PORTRAITS[4],
    videoUrl: FEATURED_VIDEO_URL,
  },
];
