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

const sections = [
  {
    id: "prelims",
    title: "PRELIMS",
    description: "Check all PRELIMS previous year question paper",
    href: "/free_resources/previous-year/prelims-paper",
    image: "/assets/our-toppers-gallery/want-to-become-boy.png",
    cardBg: "bg-[#F5F0E8]",
  },
  {
    id: "mains",
    title: "MAINS",
    description: "Check all MAINS previous year question paper",
    href: "/free_resources/previous-year/mains-paper",
    image: "/assets/our-toppers-gallery/want-to-become-girl.png",
    cardBg: "bg-gradient-to-br from-[#E8F4FC] to-[#D4E8F8]",
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
            src="/assets/free-resources/previous-year/previous-year.png"
            alt="Previous Year Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_15.33%,rgba(0,0,0,0.1)_50.97%)]" />
        </section>

        <section className="relative bg-[#fcfcfc] bg-[url('/assets/bg-wave.png')] bg-cover bg-center bg-no-repeat px-6 py-16 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-[1400px]">
            <h1 className="animate-heading mb-12 text-center text-[32px] font-extrabold uppercase leading-none md:text-[44px] lg:text-[52px]">
              <span className="bg-[linear-gradient(90deg,#D57E89_0%,#9A8FB6_50%,#3E9CDB_100%)] bg-clip-text text-transparent">
                Previous Year Question Papers
              </span>
            </h1>

            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
              <div className="animate-cards-row grid grid-cols-1 gap-8 md:grid-cols-2">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    className={`animate-card relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${section.cardBg}`}
                  >
                    <h2 className="text-[28px] font-extrabold uppercase md:text-[32px]">
                      <span className="bg-[linear-gradient(90deg,#D57E89_0%,#9A8FB6_50%,#3E9CDB_100%)] bg-clip-text text-transparent">
                        {section.title}
                      </span>
                    </h2>
                    <p className="mt-3 max-w-[220px] text-[15px] font-medium leading-snug text-[#444]">
                      {section.description}
                    </p>
                    <Link
                      href={section.href}
                      className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#0B1628] px-6 py-3 text-[15px] font-bold text-white transition-transform hover:scale-[1.03]"
                    >
                      View
                      <ArrowRight size={18} aria-hidden />
                    </Link>
                    <div className="pointer-events-none absolute bottom-0 right-0 h-[240px] w-[200px]">
                      <Image
                        src={section.image}
                        alt=""
                        fill
                        className="object-contain object-bottom"
                        sizes="200px"
                      />
                    </div>
                  </article>
                ))}
              </div>

              <aside className="animate-sidebar w-full xl:mt-[20px]">
                <QuickLinks />
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
