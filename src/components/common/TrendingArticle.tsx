import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface TrendingArticleProps {
    title?: string;
    articleTitle?: string;
    imageSrc?: string;
    href?: string;
    readLabel?: string;
}

const TrendingArticle = ({
    title = "Trending Article",
    articleTitle = "Habits That Are Secretly Destroying Your Productivity",
    imageSrc = "/assets/trending-article.jpg",
    href = "#",
    readLabel = "Read",
}: TrendingArticleProps) => {
    return (
        <div className="rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
            <h2 className="mb-5 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
                <span className="bg-[linear-gradient(90deg,#4D90D2_0%,#B57B95_100%)] bg-clip-text text-transparent">
                    {title}
                </span>
            </h2>

            <Link href={href} className="group block overflow-hidden rounded-[18px]">
                <div className="relative h-[280px] w-full overflow-hidden rounded-[18px]">
                    {/* Background image */}
                    <Image
                        src={imageSrc}
                        alt={articleTitle}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            // Fallback gradient if image doesn't exist
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    {/* Gradient overlay — always visible as fallback */}
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#7fbf6a_0%,#f4a261_60%,#e76f51_100%)]" />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.45)_100%)]" />

                    {/* Article title */}
                    <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <p className="text-[20px] font-extrabold leading-snug text-white drop-shadow-md">
                            {articleTitle}
                        </p>

                        {/* Read button */}
                        <div className="flex justify-center">
                            <span className="inline-flex min-w-[100px] items-center justify-center rounded-full bg-white px-6 py-2 text-[15px] font-semibold text-[#333] shadow-md transition-all duration-300 group-hover:shadow-lg">
                                {readLabel}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TrendingArticle;
