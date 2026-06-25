"use client";

import Image from "@/components/common/AppImage";
import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QuickLinks from "@/components/common/QuickLinks";
import HoverCard from "@/components/common/HoverCard";
import FreeResourcesOurBooksSlider from "@/components/common/FreeResourcesOurBooksSlider";
import {
  RESOURCE_PAGE_HEADING_GRADIENT,
  RESOURCE_SECTION_GATEWAY_OVERLAY,
  RESOURCE_SECTION_SHELL,
} from "@/features/resources/components/cardStyles";
import { CATEGORY_ROUTE_MAP } from "@/features/resources/adapters/customerFreeResourcesAdapter";
import { useResourceCategories } from "@/features/resources/hooks/useResources";

gsap.registerPlugin(ScrollTrigger);

export default function NcertBooksPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { data: categories = [], isLoading, isError, error } = useResourceCategories();

  const resourceCards = useMemo(
    () =>
      categories.map((category) => {
        const config = CATEGORY_ROUTE_MAP[category._id] ?? {
          href: "/free_resources/ncert-books",
          image: category.thumbnail || "/assets/free-resources/NCERT/NCERT-books.png",
          description: category.description || category.name,
        };

        return {
          id: category._id,
          title: category.name,
          description: config.description,
          image: config.image,
          href: config.href,
        };
      }),
    [categories],
  );

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
      dependencies: [prefersReducedMotion, resourceCards.length],
    },
  );

  return (
    <>
      <Header />

      <main ref={containerRef} className="min-h-screen overflow-x-hidden bg-[#f2f6fa]">
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

        <section className={`${RESOURCE_SECTION_SHELL} px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-14`}>
          <div className={RESOURCE_SECTION_GATEWAY_OVERLAY} aria-hidden />
          <div className="relative z-10 mx-auto max-w-[1600px]">
            <h1 className="animate-heading mb-8 text-center text-[32px] font-extrabold uppercase leading-none sm:text-[40px] md:mb-10 md:text-[52px] lg:text-left lg:text-[56px]">
              <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                FREE RESOURCES
              </span>
            </h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 xl:gap-12 items-start">
              <div className="w-full">
                {isLoading && (
                  <p className="mb-6 text-center text-[16px] text-[#555]">Loading...</p>
                )}

                {isError && (
                  <p className="mb-6 text-center text-[16px] text-red-600">
                    {error instanceof Error ? error.message : "Failed to load resources."}
                  </p>
                )}

                {!isLoading && !isError && resourceCards.length === 0 && (
                  <p className="mb-6 text-center text-[16px] text-[#555]">
                    No Records Found
                  </p>
                )}

                {!isLoading && !isError && resourceCards.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {resourceCards.map((card) => (
                      <HoverCard
                        key={card.id}
                        title={card.title}
                        image={card.image}
                        href={card.href}
                        className="animate-card h-[210px] sm:h-[230px] md:h-[250px] lg:h-[260px]"
                      />
                    ))}
                  </div>
                )}
              </div>

              <aside className="animate-sidebar w-full max-w-full space-y-5 lg:ml-auto lg:max-w-[340px] lg:pt-[2px]">
                <QuickLinks />
                <FreeResourcesOurBooksSlider gradientTitle />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
