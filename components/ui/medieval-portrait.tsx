"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface MedievalPortraitProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  customSize?: { width: number; height: number };
  borderColor?: "amber" | "gold" | "silver" | "copper";
  glow?: boolean;
  meadow?: boolean;
  className?: string;
  children?: ReactNode;
}

const sizeClasses = {
  sm: "w-32 h-32 md:w-40 md:h-40",
  md: "w-40 h-40 md:w-48 md:h-48",
  lg: "w-48 h-48 md:w-56 md:h-56",
  xl: "w-56 h-56 md:w-64 md:h-64",
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
  size = "lg",
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

  return (
    <div className={`relative ${sizeClass} ${className}`} style={customStyle}>
      {/* Medieval Ornamental Border Frame */}
      <div className="absolute -inset-3 rounded-xl pointer-events-none z-20">
        {/* Outer decorative border */}
        <div
          className={`absolute inset-0 rounded-xl border-4 ${colors.main} shadow-lg`}
        />

        {/* Middle ornamental border */}
        <div
          className={`absolute inset-1 rounded-xl border-2 ${colors.secondary}`}
        />

        {/* Inner border */}
        <div className={`absolute inset-2 rounded-xl border ${colors.inner}`} />

        {/* Corner ornaments - Top Left */}
        <div className="absolute -top-2 -left-2 w-10 h-10">
          <div
            className={`absolute inset-0 border-t-4 border-l-4 ${colors.main} rounded-tl-xl`}
          />
          <div
            className={`absolute top-1 left-1 w-2 h-2 ${colors.accent} rounded-full`}
          />
          <div
            className={`absolute top-2 left-2 w-1 h-1 ${colors.accentLight} rounded-full`}
          />
        </div>

        {/* Corner ornaments - Top Right */}
        <div className="absolute -top-2 -right-2 w-10 h-10">
          <div
            className={`absolute inset-0 border-t-4 border-r-4 ${colors.main} rounded-tr-xl`}
          />
          <div
            className={`absolute top-1 right-1 w-2 h-2 ${colors.accent} rounded-full`}
          />
          <div
            className={`absolute top-2 right-2 w-1 h-1 ${colors.accentLight} rounded-full`}
          />
        </div>

        {/* Corner ornaments - Bottom Left */}
        <div className="absolute -bottom-2 -left-2 w-10 h-10">
          <div
            className={`absolute inset-0 border-b-4 border-l-4 ${colors.main} rounded-bl-xl`}
          />
          <div
            className={`absolute bottom-1 left-1 w-2 h-2 ${colors.accent} rounded-full`}
          />
          <div
            className={`absolute bottom-2 left-2 w-1 h-1 ${colors.accentLight} rounded-full`}
          />
        </div>

        {/* Corner ornaments - Bottom Right */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10">
          <div
            className={`absolute inset-0 border-b-4 border-r-4 ${colors.main} rounded-br-xl`}
          />
          <div
            className={`absolute bottom-1 right-1 w-2 h-2 ${colors.accent} rounded-full`}
          />
          <div
            className={`absolute bottom-2 right-2 w-1 h-1 ${colors.accentLight} rounded-full`}
          />
        </div>

        {/* Decorative side diamonds */}
        <div
          className={`absolute top-1/2 -left-3 w-5 h-5 -translate-y-1/2 rotate-45 ${colors.main} bg-black/40 border ${colors.inner}`}
        />
        <div
          className={`absolute top-1/2 -right-3 w-5 h-5 -translate-y-1/2 rotate-45 ${colors.main} bg-black/40 border ${colors.inner}`}
        />
        <div
          className={`absolute left-1/2 -top-3 w-5 h-5 -translate-x-1/2 rotate-45 ${colors.main} bg-black/40 border ${colors.inner}`}
        />
        <div
          className={`absolute left-1/2 -bottom-3 w-5 h-5 -translate-x-1/2 rotate-45 ${colors.main} bg-black/40 border ${colors.inner}`}
        />

        {/* Decorative dots on edges */}
        <div
          className={`absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 ${colors.accentLight} rounded-full`}
        />
        <div
          className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 ${colors.accentLight} rounded-full`}
        />
        <div
          className={`absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 ${colors.accentLight} rounded-full`}
        />
        <div
          className={`absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 ${colors.accentLight} rounded-full`}
        />
      </div>

      {/* Main Image Container */}
      <div
        className={`absolute inset-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 bg-stone-800 ${
          glow ? "shadow-amber-500/50" : ""
        }`}
      >
        {/* Meadow & Sky Background */}
        {meadow && (
          <div className="absolute inset-0">
            {/* Sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-500" />

            {/* Clouds */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-5 left-0 w-32 h-16 bg-white/40 rounded-full blur-md animate-float-slow" />
              <div className="absolute top-12 right-10 w-24 h-12 bg-white/30 rounded-full blur-md animate-float-medium" />
              <div className="absolute top-20 left-20 w-40 h-20 bg-white/20 rounded-full blur-lg animate-float-fast" />
              <div className="absolute top-8 right-32 w-28 h-14 bg-white/35 rounded-full blur-md animate-float-slow" />
            </div>

            {/* Sun glow */}
            <div className="absolute top-5 right-5 w-16 h-16 bg-yellow-300/30 rounded-full blur-xl animate-pulse-glow" />

            {/* Rolling hills background */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2">
              <div className="absolute bottom-0 left-0 w-full h-20 bg-emerald-600 rounded-t-[100px] shadow-inner" />
              <div className="absolute bottom-0 left-0 w-3/4 h-16 bg-emerald-500 rounded-r-[100px] -ml-10" />
              <div className="absolute bottom-0 right-0 w-2/3 h-14 bg-green-600 rounded-l-[100px] -mr-10" />
            </div>

            {/* Grass texture overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(
                     0deg,
                     transparent,
                     transparent 3px,
                     rgba(0,0,0,0.05) 3px,
                     rgba(0,0,0,0.05) 4px
                   )`,
              }}
            />

            {/* Small grass blades at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 w-1 bg-emerald-400/40 rounded-full"
                  style={{
                    left: `${i * 7}%`,
                    height: `${8 + Math.random() * 12}px`,
                    width: "2px",
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
        <div className="absolute inset-0 animate-fade-in p-3">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 256px, 384px"
            className="object-contain mix-blend-normal"
            priority
          />
        </div>

        {/* Optional children (e.g., badges, status indicators) */}
        {children && (
          <div className="absolute inset-0 pointer-events-none">{children}</div>
        )}
      </div>
    </div>
  );
}
