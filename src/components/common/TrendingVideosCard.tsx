import Image from "next/image";

export type TrendingVideo = {
  id: number | string;
  title: string;
  image: string;
  link: string;
};

const defaultVideos: TrendingVideo[] = [
  {
    id: 1,
    title: "Daily Current Affairs - 16 March 2026",
    image: "/assets/current-affairs/daily-current-affairs/trending-video.png",
    link: "#",
  },
  {
    id: 2,
    title: "Daily Current Affairs - 16 March 2026",
    image: "/assets/current-affairs/daily-current-affairs/trending-video.png",
    link: "#",
  },
  {
    id: 3,
    title: "Daily Current Affairs - 16 March 2026",
    image: "/assets/current-affairs/daily-current-affairs/trending-video.png",
    link: "#",
  },
];

type Props = {
  videos?: TrendingVideo[];
  viewAllHref?: string;
};

export default function TrendingVideosCard({
  videos = defaultVideos,
  viewAllHref = "#",
}: Props) {
  return (
    <div className="rounded-[26px] bg-white/95 p-6 shadow-[0px_12px_30px_rgba(0,0,0,0.06)]">
      <h2 className="mb-6 text-center text-[34px] font-extrabold leading-none -ml-3">
        <span className=" bg-gradient-to-r from-[#4A8CCB] via-[#7882C7] to-[#B36F95] bg-clip-text text-transparent">
          Trending Videos
        </span>
      </h2>

      <div className="space-y-5">
        {videos.map((video, index) => (
          <div key={video.id}>
            <a
              href={video.link}
              className="flex items-start gap-4 transition-opacity duration-300 hover:opacity-90"
            >
              <div className="relative h-[112px] w-[150px] shrink-0 overflow-hidden rounded-[6px]">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <h3 className="text-[16px] font-semibold leading-[1.4] text-[#1b1b1b]">
                  {video.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-[15px] text-[#666]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#FF0000"
                    aria-hidden="true"
                  >
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.75 15.52V8.48L15.98 12l-6.23 3.52Z" />
                  </svg>
                  <span>YouTube</span>
                </div>
              </div>
            </a>

            {index !== videos.length - 1 && (
              <div className="mt-4 h-[1px] w-full bg-[#E7E7E7]" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <a
          href={viewAllHref}
          className="text-[18px] font-medium text-[#3380C4] underline underline-offset-2"
        >
          View All
        </a>
      </div>
    </div>
  );
}
