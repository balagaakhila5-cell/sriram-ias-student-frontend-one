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

const ourBooksImages = [
  "/assets/free-resources/NCERT/prelims-revision.png",
  "/assets/free-resources/NCERT/History.jpg.jpeg",
  "/assets/free-resources/NCERT/Modern-history.jpg.jpeg",
  "/assets/free-resources/NCERT/Medieval-history.jpg.jpeg",
  "/assets/free-resources/NCERT/Art-&-Culture.jpg.jpeg",
  "/assets/free-resources/NCERT/geo.jpg.jpeg",
  "/assets/free-resources/NCERT/Environment.jpg.jpeg",
  "/assets/free-resources/NCERT/sci-&-tech.jpg.jpeg",
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
        className="w-full overflow-hidden bg-[#f7f8fb] font-['Montserrat',sans-serif]"
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
        <section className="relative bg-white bg-[url('/dot_background.svg'),url('/dot_background.svg')] bg-[position:top_left,bottom_right] bg-[size:450px_auto] bg-no-repeat px-6 py-14 md:px-8 lg:px-10 xl:px-12">
          <div className="relative z-10 mx-auto grid max-w-[1385px] grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
            {/* Left side */}
            <div>
              <h1 className="animate-heading mb-10 text-left text-[36px] font-extrabold uppercase leading-none md:text-[46px] lg:text-[56px]">
                <span className="bg-[linear-gradient(90deg,#4B97DD_0%,#8E7CB8_45%,#E07B8B_100%)] bg-clip-text text-transparent">
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

              {/* Mobile / Tablet View */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
                {categories.map((cat) => (
                  <HoverCard key={cat.href} {...cat} className="h-[200px]" />
                ))}
              </div>
            </div>

            {/* Right side Sidebar */}
            <aside className="animate-sidebar w-full space-y-6 xl:mt-[95px]">
              <QuickLinks links={quickLinks} />

              <a href="/books" className="our-books-card">
                <h2 className="our-books-title">Our Books</h2>

                <div className="our-books-image-area">
                  {ourBooksImages.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className={`our-books-slide our-books-slide-${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt="Our Books"
                        fill
                        sizes="(max-width: 640px) 100vw, 340px"
                        className="our-books-img"
                      />
                    </div>
                  ))}

                  <div className="our-books-dots">
                    {ourBooksImages.map((_, index) => (
                      <span key={index} className={`dot-${index + 1}`} />
                    ))}
                  </div>

                  <button type="button" className="buy-now-btn">
                    Buy Now <span>→</span>
                  </button>
                </div>
              </a>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />

      <style jsx>{`
        .our-books-card {
          display: block;
          width: 100%;
          border-radius: 18px;
          background: #dcecff;
          padding: 16px;
          text-decoration: none;
          overflow: hidden;
          box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.12);
          cursor: pointer;
        }

        .our-books-title {
          margin-bottom: 12px;
          text-align: center;
          font-family: Montserrat, sans-serif;
          font-size: 28px;
          line-height: 1;
          font-weight: 900;
          background: linear-gradient(
            90deg,
            #3c9ddd 0%,
            #817ec0 45%,
            #d57483 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .our-books-image-area {
          position: relative;
          height: 245px;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          background: #111111;
        }

        .our-books-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(100%);
          will-change: transform, opacity;
        }

        .our-books-slide-1 {
          opacity: 1;
          transform: translateX(0);
        }

        .our-books-img {
          object-fit: cover;
          object-position: center;
        }

        .our-books-card:hover .our-books-slide-1 {
          animation: bookMove1 24s infinite ease-in-out;
        }

        .our-books-card:hover .our-books-slide-2 {
          animation: bookMove2 24s infinite ease-in-out;
        }

        .our-books-card:hover .our-books-slide-3 {
          animation: bookMove3 24s infinite ease-in-out;
        }

        .our-books-card:hover .our-books-slide-4 {
          animation: bookMove4 24s infinite ease-in-out;
        }

        .our-books-card:hover .our-books-slide-5 {
          animation: bookMove5 24s infinite ease-in-out;
        }

        .our-books-card:hover .our-books-slide-6 {
          animation: bookMove6 24s infinite ease-in-out;
        }

        .our-books-card:hover .our-books-slide-7 {
          animation: bookMove7 24s infinite ease-in-out;
        }

        .our-books-card:hover .our-books-slide-8 {
          animation: bookMove8 24s infinite ease-in-out;
        }

        @keyframes bookMove1 {
          0%,
          9% {
            opacity: 1;
            transform: translateX(0);
          }

          12.5%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes bookMove2 {
          0%,
          9% {
            opacity: 1;
            transform: translateX(100%);
          }

          12.5%,
          21.5% {
            opacity: 1;
            transform: translateX(0);
          }

          25%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes bookMove3 {
          0%,
          21.5% {
            opacity: 1;
            transform: translateX(100%);
          }

          25%,
          34% {
            opacity: 1;
            transform: translateX(0);
          }

          37.5%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes bookMove4 {
          0%,
          34% {
            opacity: 1;
            transform: translateX(100%);
          }

          37.5%,
          46.5% {
            opacity: 1;
            transform: translateX(0);
          }

          50%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes bookMove5 {
          0%,
          46.5% {
            opacity: 1;
            transform: translateX(100%);
          }

          50%,
          59% {
            opacity: 1;
            transform: translateX(0);
          }

          62.5%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes bookMove6 {
          0%,
          59% {
            opacity: 1;
            transform: translateX(100%);
          }

          62.5%,
          71.5% {
            opacity: 1;
            transform: translateX(0);
          }

          75%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes bookMove7 {
          0%,
          71.5% {
            opacity: 1;
            transform: translateX(100%);
          }

          75%,
          84% {
            opacity: 1;
            transform: translateX(0);
          }

          87.5%,
          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        @keyframes bookMove8 {
          0%,
          84% {
            opacity: 1;
            transform: translateX(100%);
          }

          87.5%,
          96.5% {
            opacity: 1;
            transform: translateX(0);
          }

          100% {
            opacity: 1;
            transform: translateX(-100%);
          }
        }

        .our-books-dots {
          position: absolute;
          left: 50%;
          bottom: 14px;
          z-index: 5;
          display: flex;
          gap: 7px;
          transform: translateX(-50%);
        }

        .our-books-dots span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.75);
        }

        .our-books-card:hover .dot-1 {
          animation: activeDot1 24s infinite;
        }

        .our-books-card:hover .dot-2 {
          animation: activeDot2 24s infinite;
        }

        .our-books-card:hover .dot-3 {
          animation: activeDot3 24s infinite;
        }

        .our-books-card:hover .dot-4 {
          animation: activeDot4 24s infinite;
        }

        .our-books-card:hover .dot-5 {
          animation: activeDot5 24s infinite;
        }

        .our-books-card:hover .dot-6 {
          animation: activeDot6 24s infinite;
        }

        .our-books-card:hover .dot-7 {
          animation: activeDot7 24s infinite;
        }

        .our-books-card:hover .dot-8 {
          animation: activeDot8 24s infinite;
        }

        @keyframes activeDot1 {
          0%,
          9% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          12.5%,
          100% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
        }

        @keyframes activeDot2 {
          0%,
          9% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }

          12.5%,
          21.5% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          25%,
          100% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
        }

        @keyframes activeDot3 {
          0%,
          21.5% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }

          25%,
          34% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          37.5%,
          100% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
        }

        @keyframes activeDot4 {
          0%,
          34% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }

          37.5%,
          46.5% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          50%,
          100% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
        }

        @keyframes activeDot5 {
          0%,
          46.5% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }

          50%,
          59% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          62.5%,
          100% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
        }

        @keyframes activeDot6 {
          0%,
          59% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }

          62.5%,
          71.5% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          75%,
          100% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
        }

        @keyframes activeDot7 {
          0%,
          71.5% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }

          75%,
          84% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          87.5%,
          100% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
        }

        @keyframes activeDot8 {
          0%,
          84% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }

          87.5%,
          96.5% {
            background: #ff3f6c;
            transform: scale(1.35);
          }

          100% {
            background: rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
        }

        .buy-now-btn {
          position: absolute;
          left: 50%;
          bottom: 22px;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transform: translateX(-50%);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          background: rgba(58, 78, 94, 0.88);
          padding: 10px 24px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .our-books-card:hover .buy-now-btn {
          background: rgba(26, 116, 170, 0.94);
        }

        @media (min-width: 640px) {
          .our-books-card {
            padding: 18px 18px 20px;
          }

          .our-books-title {
            font-size: 30px;
          }

          .our-books-image-area {
            height: 275px;
          }
        }

        @media (min-width: 1024px) {
          .our-books-title {
            font-size: 32px;
          }

          .our-books-image-area {
            height: 305px;
          }
        }
      `}</style>
    </>
  );
}