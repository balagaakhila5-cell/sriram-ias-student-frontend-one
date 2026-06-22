'use client';

export const NAV_DROPDOWN_GRADIENT =
  'linear-gradient(145deg, #B8E4F7 0%, #D8E6F5 42%, #EAC8D0 100%)';

export const NAV_DROPDOWN_GRADIENT_CLASS =
  'bg-[linear-gradient(145deg,#B8E4F7_0%,#D8E6F5_42%,#EAC8D0_100%)]';

export default function NavbarDropdownGradientBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: NAV_DROPDOWN_GRADIENT }}
      aria-hidden
    />
  );
}
