import Link from "@/components/common/AppLink";
import React from "react";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";

export interface QuickLinkItem {
    title: string;
    href: string;
    border: string;
    text: string;
    icon: React.ReactNode;
    /** Tailwind hover background (defaults from border color) */
    hoverBg?: string;
}

/** e.g. border-[#E29A9A] → hover:bg-[#E29A9A] */
function hoverBgFromBorder(border: string, hoverBg?: string): string {
    if (hoverBg) return hoverBg;
    const match = border.match(/#[A-Fa-f0-9]{6}/);
    return match ? `hover:bg-[${match[0]}]` : "";
}

interface QuickLinksProps {
    links?: QuickLinkItem[];
    /** Tighter layout for Previous Year gateway (Figma) */
    compact?: boolean;
}

const defaultLinks: QuickLinkItem[] = [
    {
        title: "Daily Current Affairs",
        href: "/current-affairs/daily-current-affairs",
        border: "border-[#E29A9A]",
        text: "text-[#C77878]",
        hoverBg: "hover:bg-[#E29A9A] hover:border-[#E29A9A]",
        icon: "💡",
    },
    {
        title: "Daily Practice Quiz",
        href: "/current-affairs/daily-practice-questions",
        border: "border-[#7B72C4]",
        text: "text-[#625BB0]",
        hoverBg: "hover:bg-[#7B72C4] hover:border-[#7B72C4]",
        icon: "📘",
    },
    {
        title: "Infographics",
        href: "/current-affairs/infographics",
        border: "border-[#91B25F]",
        text: "text-[#73923F]",
        hoverBg: "hover:bg-[#91B25F] hover:border-[#91B25F]",
        icon: "📊",
    },
];

const QuickLinks = ({ links = defaultLinks, compact = false }: QuickLinksProps) => {
    const quickLinks = links;

    return (
        <div
            className={`relative overflow-hidden rounded-[22px] bg-cover shadow-[0px_10px_30px_rgba(0,0,0,0.05)] ${
                compact ? "px-5 py-6" : "px-5 py-6"
            }`}
            style={{ backgroundImage: "url('/assets/current-affairs/quicklink-bg.png')" }}
        >
            <h2
                className={`text-center font-extrabold leading-none ${
                    compact
                        ? "mb-5 text-[26px]"
                        : "mb-5 text-[30px] md:text-[34px]"
                }`}
            >
                <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                    Quick Links
                </span>
            </h2>

            <div className={compact ? "flex flex-col gap-4" : "space-y-5"}>
                {quickLinks.map((item) => {
                    const hoverBg = hoverBgFromBorder(item.border, item.hoverBg);

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`group flex items-center rounded-full border-2 bg-white transition-all duration-300 hover:shadow-md ${item.border} ${hoverBg} ${
                                compact
                                    ? "min-h-[54px] gap-4 px-5 py-3.5"
                                    : "min-h-[58px] gap-4 px-6 py-4"
                            }`}
                        >
                            <span
                                className={`shrink-0 leading-none transition-colors duration-300 group-hover:!text-white [&_img]:transition-[filter] [&_img]:duration-300 group-hover:[&_img]:brightness-0 group-hover:[&_img]:invert group-hover:[&_svg]:!stroke-white ${
                                    compact ? "text-[20px]" : "text-[22px]"
                                }`}
                            >
                                {item.icon}
                            </span>
                            <span
                                className={`font-semibold transition-colors duration-300 ${item.text} group-hover:!text-white ${
                                    compact
                                        ? "text-[15px] leading-snug pr-1"
                                        : "text-[16px] leading-snug md:text-[18px]"
                                }`}
                            >
                                {item.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickLinks