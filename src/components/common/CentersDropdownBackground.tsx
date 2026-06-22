'use client';

import NavbarDropdownGradientBackground from './NavbarDropdownGradientBackground';

export default function CentersDropdownBackground() {
  return (
    <>
      <NavbarDropdownGradientBackground />
      <div className="pointer-events-none absolute inset-0 bg-white/10" aria-hidden />
    </>
  );
}
