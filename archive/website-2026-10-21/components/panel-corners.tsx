import type { HTMLAttributes, ReactNode } from "react";

interface PanelCornersProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// Adds small instrument-style corner ticks around a section card.
export default function PanelCorners({
  children,
  className = "",
  ...props
}: PanelCornersProps) {
  return (
    <div className={`panel-corners ${className}`} {...props}>
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
      {children}
    </div>
  );
}
