"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QuickLinks from "@/components/common/QuickLinks";
import FloatingActions from "@/components/common/FloatingActions";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";

gsap.registerPlugin(ScrollTrigger);

const PYQ_ASSETS = {
  prelimsBg: "/assets/free-resources/previous-year/boy-background-color.png",
  prelimsVisual: "/assets/free-resources/previous-year/prelims.png",
  mainsBg: "/assets/free-resources/previous-year/girl-background-color.png",
  mainsVisual: "/assets/free-resources/previous-year/mains.png",
  banner: "/assets/free-resources/previous-year/previous-year.png",
} as const;

/** Same box for Prelims and Mains visuals — equal size (circle built into PNG) */
const PYQ_VISUAL_SIZE = {
  width: 232,
  height: 258,
} as const;

const PYQ_CARD_SHELL =
  "animate-card group relative mx-auto h-[300px] w-full max-w-[451px] overflow-visible rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:z-10 hover:translate-x-6 hover:scale-[1.03] hover:shadow-[0_20px_48px_rgba(0,0,0,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:scale-100 sm:mx-0 sm:max-w-none md:hover:translate-x-8 md:hover:scale-[1.035]";

/** Figma View button — teal → navy gradient */
const PYQ_VIEW_BUTTON =
  "inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(90deg,#2AA7DF_0%,#03283B_100%)] px-6 py-3 text-[16px] font-bold text-white shadow-[0_4px_14px_rgba(3,40,59,0.25)] transition-transform hover:scale-[1.03]";

const sections = [
  {
    id: "prelims",
    title: "PRELIMS",
    description: "Check all PRELIMS previous year question paper",
    href: "/free_resources/previous-year/prelims-paper",
    background: PYQ_ASSETS.prelimsBg,
    visual: PYQ_ASSETS.prelimsVisual,
    visualScale: "scale-100",
  },
  {
    id: "mains",
    title: "MAINS",
    description: "Check all MAINS previous year question paper",
    href: "/free_resources/previous-year/mains-paper",
    background: PYQ_ASSETS.mainsBg,
    visual: PYQ_ASSETS.mainsVisual,
    /** Mains PNG has more padding — scale up to match Prelims boy */
    visualScale: "scale-[1.16]",
  },
] as const;

export default function PreviousYearPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.fromTo(
        ".animate-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
      gsap.fromTo(
        ".animate-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".animate-cards-row", start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".animate-sidebar",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="min-h-screen bg-[#fcfcfc] font-['Montserrat',sans-serif]"
      >
        <section className="relative h-[320px] w-full overflow-hidden md:h-[400px] lg:h-[420px]">
          <Image
            src={PYQ_ASSETS.banner}
            alt="Previous Year Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />
        </section>

        <section className="relative bg-[#fcfcfc] bg-[url('/assets/bg-wave.png')] bg-cover bg-center bg-no-repeat px-4 py-12 sm:px-6 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-[1400px]">
            <h1
              className={`animate-heading mb-10 text-left text-[34px] font-extrabold uppercase leading-tight tracking-tight sm:text-[44px] lg:text-[52px] ${RESOURCE_PAGE_HEADING_GRADIENT}`}
            >
              Previous Year Question Papers
            </h1>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
              <div className="animate-cards-row grid min-w-0 grid-cols-1 gap-6 overflow-visible px-1 py-3 sm:grid-cols-2 sm:gap-6">
                {sections.map((section) => (
                  <article key={section.id} className={PYQ_CARD_SHELL}>
                    <div className="absolute inset-0 overflow-hidden rounded-[28px]">
                      <Image
                        src={section.background}
                        alt=""
                        fill
                        priority
                        className="z-0 object-cover object-center"
                        sizes="(min-width: 640px) 50vw, 451px"
                      />
                    </div>

                    <div className="relative z-20 grid h-full grid-cols-[minmax(0,48%)_minmax(0,52%)] items-center overflow-visible">
                      <div className="flex min-w-0 flex-col justify-center overflow-visible pl-7 pr-4 py-6 sm:pl-8 sm:pr-5">
                        <h2
                          className={`w-fit max-w-full text-[26px] font-extrabold uppercase leading-[1.08] tracking-tight sm:text-[30px] ${RESOURCE_PAGE_HEADING_GRADIENT}`}
                        >
                          {section.title}
                        </h2>
                        <p className="mt-3 max-w-[200px] text-[15px] font-medium leading-[1.45] text-[#444444] sm:max-w-[210px] sm:text-[16px]">
                          {section.description}
                        </p>
                        <Link
                          href={section.href}
                          className={`mt-4 sm:mt-5 ${PYQ_VIEW_BUTTON}`}
                        >
                          View
                          <ArrowRight size={18} aria-hidden />
                        </Link>
                      </div>

                      <div className="pointer-events-none flex min-h-0 min-w-0 items-center justify-end overflow-visible pr-0 sm:pr-1">
                        <div
                          className={`relative shrink-0 origin-center transition-transform duration-300 ${section.visualScale}`}
                          style={{
                            width: PYQ_VISUAL_SIZE.width,
                            height: PYQ_VISUAL_SIZE.height,
                          }}
                        >
                          <Image
                            src={section.visual}
                            alt=""
                            width={PYQ_VISUAL_SIZE.width * 2}
                            height={PYQ_VISUAL_SIZE.height * 2}
                            priority
                            className="h-full w-full object-contain object-center"
                            sizes={`${PYQ_VISUAL_SIZE.width}px`}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="animate-sidebar w-full justify-self-center lg:sticky lg:top-[120px] lg:justify-self-end lg:pt-2">
                <QuickLinks compact />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
