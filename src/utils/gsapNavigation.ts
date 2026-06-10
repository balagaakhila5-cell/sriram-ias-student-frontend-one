import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function refreshScrollAnimations() {
  if (typeof window === 'undefined') return;

  window.scrollTo(0, 0);

  const refresh = () => ScrollTrigger.refresh(true);

  requestAnimationFrame(() => {
    refresh();
    window.setTimeout(refresh, 100);
    window.setTimeout(refresh, 350);
  });
}
