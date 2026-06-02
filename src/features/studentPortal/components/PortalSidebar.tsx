"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PortalNavItem } from "../nav";

interface PortalSidebarProps {
  items: PortalNavItem[];
}

export default function PortalSidebar({ items }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3">
      {items.map((item) => {
        const isActive = pathname?.startsWith(item.href) ?? false;
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={item.href.includes("free-resources") ? false : undefined}
            className="flex items-center justify-center transition-all duration-200"
            style={{
              width: 294,
              height: 52,
              borderRadius: 32,
              paddingTop: 16,
              paddingBottom: 16,
              paddingLeft: 24,
              paddingRight: 24,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: 16,
              lineHeight: "100%",
              border: "1px solid #0000001A",
              boxShadow: "0px 4px 32px 0px #0000000D",
              ...(isActive
                ? {
                    background:
                      "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)",
                    color: "#FFFFFF",
                  }
                : {
                    background: "#FFFFFF",
                    color: "rgba(0, 0, 0, 0.4)",
                  }),
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
