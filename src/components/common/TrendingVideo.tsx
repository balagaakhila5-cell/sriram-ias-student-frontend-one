import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface TrendingVideoProps {
    title?: string;
    videoTitle?: string;
    thumbnailSrc?: string;
    channelName?: string;
    href?: string;
}

const TrendingVideo = ({
    title = "Trending Video",
    videoTitle = "Daily Current Affairs",
    thumbnailSrc = "/assets/youtube_video_image.png",
    channelName = "By - Saurabh Tripathi",
    href = "#",
}: TrendingVideoProps) => {
    return (
        <div className="rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
            <h2 className="mb-5 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
                <span className="bg-[linear-gradient(90deg,#4D90D2_0%,#B57B95_100%)] bg-clip-text text-transparent">
                    {title}
                </span>
            </h2>

            <Link href={href} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-[14px]">
                <div className="relative w-full overflow-hidden rounded-[14px]" style={{ aspectRatio: '16/9' }}>
                    {/* Thumbnail image */}
                    <Image
                        src={thumbnailSrc}
                        alt={videoTitle}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <svg
                                className="ml-1 h-6 w-6 text-[#FF0000]"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Channel name */}
                {/* {channelName && (
                    <div className="mt-3 flex items-center gap-2 px-1">
                        <svg className="h-4 w-4 shrink-0 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                        </svg>
                        <span className="text-[13px] font-semibold text-[#444]">{channelName}</span>
                    </div>
                )} */}
            </Link>
        </div>
    );
};

export default TrendingVideo;
