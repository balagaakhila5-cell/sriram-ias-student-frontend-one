
"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QuickLinks from "@/components/common/QuickLinks";
import OurBooks from "@/components/common/OurBooks";
import FloatingActions from "@/components/common/FloatingActions";
import HoverCard from "@/components/common/HoverCard";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Daily Current Affairs",
    href: "/current-affairs/daily-current-affairs",
    image: "/assets/current-affairs/daily-current-affairs.png",
  },
  {
    title: "Monthly Magazine",
    href: "/current-affairs/monthly-magazine",
    image: "/assets/current-affairs/monthly-magazine.png",
  },
  {
    title: "Daily Practice Questions",
    href: "/current-affairs/daily-practice-questions",
    image: "/assets/current-affairs/daily-practice-questions.png",
  },
  {
    title: "Infographics",
    href: "/current-affairs/infographics",
    image: "/assets/current-affairs/infographics.png",
  },
  {
    title: "Monthly Recap",
    href: "/current-affairs/monthly-recap",
    image: "/assets/current-affairs/monthly-recap.png",
  },
];

const quickLinks = [
  {
    title: "NCERT Books",
    href: "/free_resources/ncert-books",
    border: "border-[#E29A9A]",
    text: "text-[#C77878]",
    icon: (
      <Image
        src="/assets/current-affairs/Ncert-icon.png"
        alt="NCERT Books"
        width={24}
        height={24}
      />
    ),
  },
  {
    title: "Study Material",
    href: "/free_resources/study-material",
    border: "border-[#7B72C4]",
    text: "text-[#625BB0]",
    icon: (
      <Image
        src="/assets/current-affairs/Study-icon.png"
        alt="Study Material"
        width={24}
        height={24}
      />
    ),
  },
  {
    title: "Free Mock tests",
    href: "/free_resources/free-mocktests",
    border: "border-[#91B25F]",
    text: "text-[#73923F]",
    icon: (
      <Image
        src="/assets/current-affairs/Free-mock-icon.png"
        alt="Free Mock Tests"
        width={24}
        height={24}
      />
    ),
  },
];

export default function CurrentAffairsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from(".animate-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".animate-card", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
      });

      gsap.from(".animate-sidebar", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="w-full overflow-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif] "
      >
        
        {/* Banner */}
        <section className="relative h-[280px] w-full overflow-hidden md:h-[340px] lg:h-[390px]">
          <Image
            src="/assets/current-affairs/current-affairs-banner.png"
            alt="Current Affairs Banner"
            fill
            priority
            className="object-cover brightness-[1.08]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.04)_45%,rgba(0,0,0,0.00)_100%)]" />
        </section>

        {/* Content Section with Corner Dots */}
        <section className="relative px-6 py-14 md:px-8 lg:px-10 xl:px-12 bg-white bg-[url('/dot_background.svg'),url('/dot_background.svg')] bg-[position:top_left,bottom_right] bg-[size:450px_auto] bg-no-repeat">
          <div className="relative z-10 mx-auto max-w-[1385px] grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14 ">
            {/* Left side */}
            <div>
              <h1 className="animate-heading mb-10 text-left text-[36px] font-extrabold uppercase leading-none md:text-[46px] lg:text-[56px]">
                <span className="bg-[linear-gradient(90deg,#E07B8B_0%,#8E7CB8_45%,#4B97DD_100%)] bg-clip-text text-transparent ">
                  Current Affairs
                </span>
              </h1>

              {/* Desktop View */}
              <div className="hidden lg:block">
                <div className="mb-4 flex gap-[18px]">
                  <HoverCard {...categories[0]} className="h-[242px] flex-1" />
                  <HoverCard {...categories[1]} className="h-[242px] flex-1" />
                </div>
                <div className="mb-4 flex gap-[18px]">
                  <HoverCard {...categories[2]} className="h-[242px] flex-1" />
                  <HoverCard {...categories[3]} className="h-[242px] flex-1" />
                </div>
                <div className="flex gap-[18px]">
                  <HoverCard {...categories[4]} className="h-[242px] flex-1" />
                </div>
              </div>

              {/* Mobile / tablet View */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
                {categories.map((cat) => (
                  <HoverCard key={cat.href} {...cat} className="h-[200px]" />
                ))}
              </div>
            </div>

            {/* Right side Sidebar */}
            <aside className="animate-sidebar w-full space-y-6 xl:mt-[95px]">
              <QuickLinks links={quickLinks} />
              <OurBooks />
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}