import Image from "next/image";
import { FOOTER_SOCIAL_LINKS } from "@/config/footerLinks";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";

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
    link: FOOTER_SOCIAL_LINKS.youtube,
  },
  {
    id: 2,
    title: "Daily Current Affairs - 16 March 2026",
    image: "/assets/current-affairs/daily-current-affairs/trending-video.png",
    link: FOOTER_SOCIAL_LINKS.youtube,
  },
  {
    id: 3,
    title: "Daily Current Affairs - 16 March 2026",
    image: "/assets/current-affairs/daily-current-affairs/trending-video.png",
    link: FOOTER_SOCIAL_LINKS.youtube,
  },
];

type Props = {
  videos?: TrendingVideo[];
  viewAllHref?: string;
};

export default function TrendingVideosCard({
  videos = defaultVideos,
  viewAllHref = FOOTER_SOCIAL_LINKS.youtube,
}: Props) {
  return (
    <div className="rounded-[26px] bg-white/95 p-6 shadow-[0px_12px_30px_rgba(0,0,0,0.06)]">
      <h2 className="mb-6 text-center text-[34px] font-extrabold leading-none -ml-3">
        <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
          Trending Videos
        </span>
      </h2>

      <div className="space-y-5">
        {videos.map((video, index) => (
          <div key={video.id}>
            <a
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
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
          target="_blank"
          rel="noopener noreferrer"
          className="text-[18px] font-medium text-[#3380C4] underline underline-offset-2 transition-colors hover:text-[#1E6F9F]"
        >
          View All
        </a>
      </div>
    </div>
  );
}
