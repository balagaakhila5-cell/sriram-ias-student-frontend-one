import Link from 'next/link';
import React from 'react'

export interface QuickLinkItem {
    title: string;
    href: string;
    border: string;
    text: string;
    icon: React.ReactNode;
}

interface QuickLinksProps {
    links?: QuickLinkItem[];
}

const defaultLinks: QuickLinkItem[] = [
    {
        title: "Daily Current Affairs",
        href: "/current-affairs/daily-current-affairs",
        border: "border-[#E29A9A]",
        text: "text-[#C77878]",
        icon: "💡",
    },
    {
        title: "Daily Practice Questions",
        href: "/current-affairs/daily-practice-questions",
        border: "border-[#7B72C4]",
        text: "text-[#625BB0]",
        icon: "📘",
    },
    {
        title: "Infographics",
        href: "/infographics",
        border: "border-[#91B25F]",
        text: "text-[#73923F]",
        icon: "📊",
    },
];

const QuickLinks = ({ links = defaultLinks }: QuickLinksProps) => {
    const quickLinks = links;

    return (
        <div
            className="relative rounded-[22px] px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] bg-cover overflow-hidden"
            style={{ backgroundImage: "url('/assets/current-affairs/quicklink-bg.png')" }} // 👉 change path here

        >       <h2 className="mb-5 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
                <span className="bg-[linear-gradient(90deg,#4D90D2_0%,#B57B95_100%)] bg-clip-text text-transparent">
                    Quick Links
                </span>

            </h2>

            <div className="space-y-5">
                {quickLinks.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={`flex min-h-[58px] items-center gap-4 rounded-full border bg-white px-6 transition-all duration-300 hover:shadow-md ${item.border}`}
                    >
                        <span className="text-[22px]">{item.icon}</span>
                        <span className={`text-[16px] font-semibold md:text-[18px] ${item.text}`}>
                            {item.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default QuickLinks