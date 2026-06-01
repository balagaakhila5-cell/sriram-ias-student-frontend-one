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

gsap.registerPlugin(ScrollTrigger);

const PYQ_ASSETS = {
  prelimsBg: "/assets/free-resources/previous-year/boy-background-color.png",
  prelimsPerson: "/assets/free-resources/previous-year/boy-img.png",
  mainsBg: "/assets/free-resources/previous-year/girl-background-color.png",
  mainsPerson: "/assets/free-resources/previous-year/girl-img.png",
  banner: "/assets/free-resources/previous-year/previous-year.png",
} as const;

/** Blue → red gradient for all PYQ headings */
const PYQ_HEADING_GRADIENT =
  "bg-[linear-gradient(90deg,#3E9CDB_0%,#9A8FB6_45%,#D57E89_75%,#E53935_100%)] bg-clip-text text-transparent";

const sections = [
  {
    id: "prelims",
    title: "PRELIMS",
    description: "Check all PRELIMS previous year question paper",
    href: "/free_resources/previous-year/prelims-paper",
    background: PYQ_ASSETS.prelimsBg,
    person: PYQ_ASSETS.prelimsPerson,
  },
  {
    id: "mains",
    title: "MAINS",
    description: "Check all MAINS previous year question paper",
    href: "/free_resources/previous-year/mains-paper",
    background: PYQ_ASSETS.mainsBg,
    person: PYQ_ASSETS.mainsPerson,
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
              className={`animate-heading mb-10 text-center text-[34px] font-extrabold uppercase leading-tight tracking-tight sm:text-[44px] lg:text-[56px] ${PYQ_HEADING_GRADIENT}`}
            >
              Previous Year Question Papers
            </h1>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
              {/* Prelims + Mains — Figma-width cards */}
              <div className="animate-cards-row grid min-w-0 grid-cols-1 gap-6 overflow-visible px-1 py-3 sm:grid-cols-2 sm:gap-5">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    className="animate-card group relative h-[268px] w-full min-w-0 max-w-[420px] justify-self-center overflow-hidden rounded-[24px] shadow-[0_8px_28px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out will-change-transform hover:z-20 hover:scale-[1.05] hover:shadow-[0_16px_42px_rgba(0,0,0,0.14)] sm:max-w-none sm:justify-self-stretch"
                  >
                    <Image
                      src={section.background}
                      alt=""
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />

                    <div className="relative z-10 flex h-full max-w-[54%] flex-col justify-start px-6 pb-5 pt-6">
                      <h2
                        className={`text-[22px] font-extrabold uppercase leading-[1.05] sm:text-[24px] ${PYQ_HEADING_GRADIENT}`}
                      >
                        {section.title}
                      </h2>
                      <p className="mt-2 text-[15px] font-medium leading-[1.4] text-[#3D3D3D] sm:text-[16px]">
                        {section.description}
                      </p>
                      <Link
                        href={section.href}
                        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#0B1628] px-5 py-2.5 text-[15px] font-bold text-white transition-transform hover:scale-[1.03]"
                      >
                        View
                        <ArrowRight size={18} aria-hidden />
                      </Link>
                    </div>

                    <div className="pointer-events-none absolute -bottom-2 right-[-6px] z-[5] h-[128%] w-[68%]">
                      <Image
                        src={section.person}
                        alt=""
                        width={420}
                        height={440}
                        className="h-full w-full scale-[1.08] object-contain object-bottom object-right transition-transform duration-300 group-hover:scale-[1.12]"
                        sizes="420px"
                        priority
                      />
                    </div>
                  </article>
                ))}
              </div>

              {/* Quick Links — right column (Figma) */}
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
