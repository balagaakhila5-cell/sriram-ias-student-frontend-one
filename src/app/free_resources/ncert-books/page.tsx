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
import HoverCard from "@/components/common/HoverCard";
import { useResourceCategories } from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_HREF: Record<string, string> = {
  "ncert books": "/free_resources/NCERT-page",
  "study materials": "/free_resources/study-materials",
  "previous year question papers": "/free_resources/previous-year",
  "free mock tests": "/free_resources/free-mocktests",
};

const resourceCards = [
  {
    title: "NCERT Books",
    image: "/assets/free-resources/NCERT/NCERT-books.png",
    href: "/free_resources/NCERT-page",
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

function getCategoryHref(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, href] of Object.entries(CATEGORY_HREF)) {
    if (lower.includes(key)) return href;
  }
  return "#";
}

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
    { scope: containerRef, dependencies: [prefersReducedMotion, categories.length] }
  );

  return (
    <>
      <Header />

      <main ref={containerRef} className="min-h-screen bg-[#F6F6F6]">
        <section className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="/assets/free-resources/NCERT/free-resources-banner.png"
            alt="Free Resources Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />
        </section>

        <section className="bg-[url('/assets/image-91.png')] bg-[position:center_35%] bg-cover bg-no-repeat px-6 py-12 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <h1 className="animate-heading mb-10 text-[36px] font-extrabold uppercase leading-none md:text-[58px] lg:text-[56px]">
              <span className="bg-[linear-gradient(90deg,#459BE4_0%,#8D7DBA_45%,#E37B8A_100%)] bg-clip-text text-transparent">
                FREE RESOURCES
              </span>
            </h1>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] items-start">
              <div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
                  {resourceCards.map((card) => (
                    <HoverCard
                      key={card.title}
                      title={card.title}
                      image={card.image}
                      href={card.href}
                      className="h-[260px]"
                    />
                  ))}
                </div>
              </div>

              <aside className="animate-sidebar space-y-5 lg:pt-[2px] lg:ml-auto">
                <QuickLinks />
                <OurBooks />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}