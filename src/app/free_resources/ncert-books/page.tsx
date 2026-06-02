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
import HoverCard from "@/components/common/HoverCard";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";
import { useResourceCategories } from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

const resourceCards = [
  {
    title: "NCERT Books",
    image: "/assets/free-resources/NCERT/NCERT-books.png",
    href: "/free_resources/ncert-page",
  },
  {
    title: "Previous Year Question Papers",
    image: "/assets/free-resources/NCERT/Previous-year-questionpaper.png",
    href: "/free_resources/previous-year",
  },
  {
    title: "Free Mock Tests",
    image: "/assets/free-resources/NCERT/free-mocktest.png",
    href: "/free_resources/free-mocktests",
  },
  {
    title: "Study Materials",
    image: "/assets/free-resources/NCERT/studymaterials.png",
    href: "/free_resources/study-materials",
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

export default function NcertBooksPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { data: categories = [] } = useResourceCategories();

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
    {
      scope: containerRef,
      dependencies: [prefersReducedMotion, categories.length],
    },
  );

  return (
    <>
      <Header />

      <main ref={containerRef} className="min-h-screen bg-[#F6F6F6] overflow-hidden">
        {/* Banner */}
        <section className="relative h-[260px] w-full overflow-hidden sm:h-[320px] md:h-[360px] lg:h-[400px]">
          <Image
            src="/assets/free-resources/NCERT/free-resources-banner.png"
            alt="Free Resources Banner"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />
        </section>

        <section className="bg-[url('/assets/image-91.png')] bg-[position:center_35%] bg-cover bg-no-repeat px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <h1 className="animate-heading mb-8 text-center text-[32px] font-extrabold uppercase leading-none sm:text-[40px] md:mb-10 md:text-[52px] lg:text-left lg:text-[56px]">
              <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                FREE RESOURCES
              </span>
            </h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 xl:gap-12 items-start">
              {/* Cards */}
              <div className="w-full">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {resourceCards.map((card) => (
                    <HoverCard
                      key={card.title}
                      title={card.title}
                      image={card.image}
                      href={card.href}
                      className="h-[210px] sm:h-[230px] md:h-[250px] lg:h-[260px]"
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="animate-sidebar w-full max-w-full space-y-5 lg:ml-auto lg:max-w-[340px] lg:pt-[2px]">
                <QuickLinks />

                <a href="/books" className="our-books-card">
                  <h2 className="our-books-title">
                    <span className={RESOURCE_PAGE_HEADING_GRADIENT}>Our Books</span>
                  </h2>

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
          </div>
        </section>
      </main>

      <Footer />

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
        }

        .our-books-title {
          margin-bottom: 12px;
          text-align: center;
          font-family: Montserrat, sans-serif;
          font-size: 28px;
          line-height: 1;
          font-weight: 900;
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
