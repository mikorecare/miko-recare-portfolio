// components/ui/PageWrapper.tsx
"use client";

import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  position?: "left" | "right" | "cover" | "back";
  className?: string;
}

export default function PageWrapper({
  children,
  position = "right",
  className = "",
}: PageWrapperProps) {
  const getBorderRadius = () => {
    switch (position) {
      case "cover":
        return "rounded-l-xl rounded-r-md";
      case "back":
        return "rounded-r-xl rounded-l-md";
      case "left":
        return "rounded-l-xl rounded-r-md";
      case "right":
      default:
        return "rounded-r-xl rounded-l-md";
    }
  };

  const getShadow = () => {
    switch (position) {
      case "cover":
        return "shadow-[-4px_0_12px_rgba(0,0,0,0.3)]";
      case "back":
        return "shadow-[4px_0_12px_rgba(0,0,0,0.3)]";
      case "left":
        return "shadow-[-2px_0_8px_rgba(0,0,0,0.2)]";
      case "right":
      default:
        return "shadow-[2px_0_8px_rgba(0,0,0,0.2)]";
    }
  };

  return (
    <div
      className={`${getBorderRadius()} ${getShadow()} relative overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(135deg, #f4e4c1 0%, #e8d5a3 100%)",
      }}
    >
      {/* Spine shadow on left side for right pages */}
      {position === "right" && (
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/10 to-transparent pointer-events-none rounded-l-md"></div>
      )}

      {/* Spine shadow on right side for left pages */}
      {position === "left" && (
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/10 to-transparent pointer-events-none rounded-r-md"></div>
      )}

      {/* Page edge shadow for cover */}
      {position === "cover" && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
      )}

      {/* Page edge shadow for back cover */}
      {position === "back" && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
      )}

      {/* Parchment texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {children}
    </div>
  );
}
