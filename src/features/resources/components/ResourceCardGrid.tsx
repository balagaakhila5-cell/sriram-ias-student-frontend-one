import type { ReactNode } from "react";
import { RESOURCE_CARD_GRID } from "./cardStyles";

interface ResourceCardGridProps {
  children: ReactNode;
  className?: string;
}

export default function ResourceCardGrid({
  children,
  className = "",
}: ResourceCardGridProps) {
  return (
    <div className={`${RESOURCE_CARD_GRID} ${className}`.trim()}>
      {children}
    </div>
  );
}
