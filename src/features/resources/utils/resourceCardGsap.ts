import gsap from "gsap";

/** Scroll-in animation — opacity only so CSS hover (slide right) is never blocked by inline transform */
export function revealResourceCards(
  containerSelector: string,
  options?: { start?: string },
) {
  gsap.fromTo(
    `${containerSelector} .resource-card-surface`,
    { opacity: 0 },
    {
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: containerSelector,
        start: options?.start ?? "top 85%",
        once: true,
      },
    },
  );
}
