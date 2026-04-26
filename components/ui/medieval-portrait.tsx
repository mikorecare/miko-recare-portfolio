"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface MedievalPortraitProps {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  customSize?: { width: number; height: number };
  borderColor?: "amber" | "gold" | "silver" | "copper";
  glow?: boolean;
  meadow?: boolean;
  className?: string;
  children?: ReactNode;
}

const sizeClasses = {
  xs: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
  sm: "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32",
  md: "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40",
  lg: "w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48",
  xl: "w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56",
  custom: "",
};

const borderColors = {
  amber: {
    main: "border-amber-600/80",
    secondary: "border-amber-500/60",
    inner: "border-amber-400/40",
    accent: "bg-amber-500",
    accentLight: "bg-amber-400",
  },
  gold: {
    main: "border-yellow-600/80",
    secondary: "border-yellow-500/60",
    inner: "border-yellow-400/40",
    accent: "bg-yellow-500",
    accentLight: "bg-yellow-400",
  },
  silver: {
    main: "border-gray-400/80",
    secondary: "border-gray-300/60",
    inner: "border-gray-200/40",
    accent: "bg-gray-400",
    accentLight: "bg-gray-300",
  },
  copper: {
    main: "border-orange-700/80",
    secondary: "border-orange-600/60",
    inner: "border-orange-500/40",
    accent: "bg-orange-600",
    accentLight: "bg-orange-500",
  },
};

export default function MedievalPortrait({
  src,
  alt,
  size = "md",
  customSize,
  borderColor = "amber",
  glow = false,
  meadow = true,
  className = "",
  children,
}: MedievalPortraitProps) {
  const colors = borderColors[borderColor];
  const sizeClass = size === "custom" && customSize ? "" : sizeClasses[size];
  const customStyle =
    size === "custom" && customSize
      ? { width: customSize.width, height: customSize.height }
      : {};

  // Responsive corner sizes
  const cornerSize = "w-6 h-6 sm:w-8 sm:h-8";
  const dotSize = "w-1 h-1 sm:w-1.5 sm:h-1.5";
  const sideDiamondSize = "w-3 h-3 sm:w-4 sm:h-4";

  return (
    <div className={`relative ${sizeClass} ${className}`} style={customStyle}>
      {/* Medieval Ornamental Border Frame */}
      <div className="absolute -inset-1 sm:-inset-3 rounded-lg sm:rounded-xl pointer-events-none z-20">
        {/* Outer decorative border */}
        <div
          className={`absolute inset-0 rounded-lg sm:rounded-xl border-2 sm:border-4 ${colors.main} shadow-md sm:shadow-lg`}
        />

        {/* Middle ornamental border - hidden on mobile */}
        <div
          className={`absolute inset-1 rounded-md sm:rounded-xl border sm:border-2 ${colors.secondary} hidden sm:block`}
        />

        {/* Inner border - hidden on mobile */}
        <div className={`absolute inset-2 rounded sm:rounded-xl border ${colors.inner} hidden sm:block`} />

        {/* Corner ornaments - Top Left */}
        <div className={`absolute -top-1 sm:-top-2 -left-1 sm:-left-2 ${cornerSize}`}>
          <div
            className={`absolute inset-0 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 ${colors.main} rounded-tl-md sm:rounded-tl-xl`}
          />
          <div
            className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 ${dotSize} ${colors.accent} rounded-full`}
          />
          <div
            className={`absolute top-1 sm:top-2 left-1 sm:left-2 w-0.5 h-0.5 sm:w-1 sm:h-1 ${colors.accentLight} rounded-full`}
          />
        </div>

        {/* Corner ornaments - Top Right */}
        <div className={`absolute -top-1 sm:-top-2 -right-1 sm:-right-2 ${cornerSize}`}>
          <div
            className={`absolute inset-0 border-t-2 sm:border-t-4 border-r-2 sm:border-r-4 ${colors.main} rounded-tr-md sm:rounded-tr-xl`}
          />
          <div
            className={`absolute top-0.5 sm:top-1 right-0.5 sm:right-1 ${dotSize} ${colors.accent} rounded-full`}
          />
          <div
            className={`absolute top-1 sm:top-2 right-1 sm:right-2 w-0.5 h-0.5 sm:w-1 sm:h-1 ${colors.accentLight} rounded-full`}
          />
        </div>

        {/* Corner ornaments - Bottom Left */}
        <div className={`absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 ${cornerSize}`}>
          <div
            className={`absolute inset-0 border-b-2 sm:border-b-4 border-l-2 sm:border-l-4 ${colors.main} rounded-bl-md sm:rounded-bl-xl`}
          />
          <div
            className={`absolute bottom-0.5 sm:bottom-1 left-0.5 sm:left-1 ${dotSize} ${colors.accent} rounded-full`}
          />
          <div
            className={`absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-0.5 h-0.5 sm:w-1 sm:h-1 ${colors.accentLight} rounded-full`}
          />
        </div>

        {/* Corner ornaments - Bottom Right */}
        <div className={`absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 ${cornerSize}`}>
          <div
            className={`absolute inset-0 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 ${colors.main} rounded-br-md sm:rounded-br-xl`}
          />
          <div
            className={`absolute bottom-0.5 sm:bottom-1 right-0.5 sm:right-1 ${dotSize} ${colors.accent} rounded-full`}
          />
          <div
            className={`absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-0.5 h-0.5 sm:w-1 sm:h-1 ${colors.accentLight} rounded-full`}
          />
        </div>

        {/* Decorative side diamonds - hidden on mobile */}
        <div
          className={`absolute top-1/2 -left-2 sm:-left-3 ${sideDiamondSize} -translate-y-1/2 rotate-45 ${colors.main} bg-black/40 border ${colors.inner} hidden sm:block`}
        />
        <div
          className={`absolute top-1/2 -right-2 sm:-right-3 ${sideDiamondSize} -translate-y-1/2 rotate-45 ${colors.main} bg-black/40 border ${colors.inner} hidden sm:block`}
        />
        <div
          className={`absolute left-1/2 -top-2 sm:-top-3 ${sideDiamondSize} -translate-x-1/2 rotate-45 ${colors.main} bg-black/40 border ${colors.inner} hidden sm:block`}
        />
        <div
          className={`absolute left-1/2 -bottom-2 sm:-bottom-3 ${sideDiamondSize} -translate-x-1/2 rotate-45 ${colors.main} bg-black/40 border ${colors.inner} hidden sm:block`}
        />

        {/* Decorative dots on edges - hidden on mobile */}
        <div
          className={`absolute top-0.5 sm:top-1 left-1/2 -translate-x-1/2 ${dotSize} ${colors.accentLight} rounded-full hidden sm:block`}
        />
        <div
          className={`absolute bottom-0.5 sm:bottom-1 left-1/2 -translate-x-1/2 ${dotSize} ${colors.accentLight} rounded-full hidden sm:block`}
        />
        <div
          className={`absolute left-0.5 sm:left-1 top-1/2 -translate-y-1/2 ${dotSize} ${colors.accentLight} rounded-full hidden sm:block`}
        />
        <div
          className={`absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 ${dotSize} ${colors.accentLight} rounded-full hidden sm:block`}
        />
      </div>

      {/* Main Image Container */}
      <div
        className={`absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-2xl transition-all duration-300 hover:scale-105 bg-stone-800 ${
          glow ? "shadow-amber-500/50" : ""
        }`}
      >
        {/* Meadow & Sky Background - simplified on mobile */}
        {meadow && (
          <div className="absolute inset-0">
            {/* Sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-500" />

            {/* Clouds - fewer on mobile */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-2 sm:top-5 left-0 w-16 sm:w-32 h-8 sm:h-16 bg-white/40 rounded-full blur-sm sm:blur-md animate-float-slow hidden sm:block" />
              <div className="absolute top-3 sm:top-12 right-2 sm:right-10 w-12 sm:w-24 h-6 sm:h-12 bg-white/30 rounded-full blur-sm sm:blur-md animate-float-medium" />
              <div className="absolute top-4 sm:top-20 left-10 sm:left-20 w-20 sm:w-40 h-10 sm:h-20 bg-white/20 rounded-full blur-md sm:blur-lg animate-float-fast hidden sm:block" />
            </div>

            {/* Sun glow - smaller on mobile */}
            <div className="absolute top-2 sm:top-5 right-2 sm:right-5 w-8 sm:w-16 h-8 sm:h-16 bg-yellow-300/30 rounded-full blur-md sm:blur-xl animate-pulse-glow" />

            {/* Rolling hills background */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 sm:h-1/2">
              <div className="absolute bottom-0 left-0 w-full h-10 sm:h-20 bg-emerald-600 rounded-t-[50px] sm:rounded-t-[100px] shadow-inner" />
              <div className="absolute bottom-0 left-0 w-3/4 h-8 sm:h-16 bg-emerald-500 rounded-r-[50px] sm:rounded-r-[100px] -ml-5 sm:-ml-10" />
              <div className="absolute bottom-0 right-0 w-2/3 h-7 sm:h-14 bg-green-600 rounded-l-[50px] sm:rounded-l-[100px] -mr-5 sm:-mr-10" />
            </div>

            {/* Grass blades - fewer on mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-8 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 w-0.5 sm:w-1 bg-emerald-400/40 rounded-full"
                  style={{
                    left: `${i * 12}%`,
                    height: `${4 + Math.random() * 6}px`,
                    width: "1px",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Dark overlay for non-meadow backgrounds */}
        {!meadow && (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900" />
        )}

        {/* Animated gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent transition-all duration-700 ${
            glow ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Fade-in animation for the image */}
        <div className="absolute inset-0 animate-fade-in p-1 sm:p-3">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 80px, (max-width: 768px) 120px, 160px"
            className="object-contain mix-blend-normal"
            priority
          />
        </div>

        {/* Optional children */}
        {children && (
          <div className="absolute inset-0 pointer-events-none">{children}</div>
        )}
      </div>
    </div>
  );
}