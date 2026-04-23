"use client";

import { ReactNode } from "react";

interface MedievalButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  primary: {
    bg: "bg-amber-700/80 hover:bg-amber-600/80",
    text: "text-amber-100",
    border: "border-amber-500",
  },
  secondary: {
    bg: "bg-stone-700/80 hover:bg-stone-600/80",
    text: "text-amber-300",
    border: "border-amber-500/60",
  },
  outline: {
    bg: "bg-transparent hover:bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500",
  },
};

export default function MedievalButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "lg",
  className = "",
}: MedievalButtonProps) {
  const styles = variantStyles[variant];

  // Explicit padding values
  const paddingStyles = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-10 py-4",
  };

  const padding = paddingStyles[size];

  const buttonContent = (
    <>
      {/* Outer ornamental frame */}
      <div className="absolute -inset-0.5 rounded-lg pointer-events-none">
        {/* Main border */}
        <div
          className={`absolute inset-0 rounded-lg border-2 ${styles.border}`}
        />

        {/* Inner border */}
        <div
          className={`absolute inset-1 rounded-md border ${styles.border}/50`}
        />

        {/* Corner ornaments - Top Left */}
        <div className="absolute -top-1 -left-1 w-4 h-4">
          <div
            className={`absolute inset-0 border-t-2 border-l-2 ${styles.border} rounded-tl-md`}
          />
          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-amber-500 rounded-full" />
        </div>

        {/* Corner ornaments - Top Right */}
        <div className="absolute -top-1 -right-1 w-4 h-4">
          <div
            className={`absolute inset-0 border-t-2 border-r-2 ${styles.border} rounded-tr-md`}
          />
          <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-amber-500 rounded-full" />
        </div>

        {/* Corner ornaments - Bottom Left */}
        <div className="absolute -bottom-1 -left-1 w-4 h-4">
          <div
            className={`absolute inset-0 border-b-2 border-l-2 ${styles.border} rounded-bl-md`}
          />
          <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-amber-500 rounded-full" />
        </div>

        {/* Corner ornaments - Bottom Right */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4">
          <div
            className={`absolute inset-0 border-b-2 border-r-2 ${styles.border} rounded-br-md`}
          />
          <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-amber-500 rounded-full" />
        </div>

        {/* Decorative side diamonds */}
        <div className="absolute top-1/2 -left-1.5 w-3 h-3 -translate-y-1/2 rotate-45 bg-amber-600/60 border border-amber-400/40" />
        <div className="absolute top-1/2 -right-1.5 w-3 h-3 -translate-y-1/2 rotate-45 bg-amber-600/60 border border-amber-400/40" />

        {/* Decorative dots */}
        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full" />
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full" />
      </div>

      {/* Button background */}
      <div
        className={`absolute inset-0 rounded-lg ${styles.bg} backdrop-blur-sm`}
      />

      {/* Content */}
      <span
        className={`relative z-10 font-masonic tracking-wider ${styles.text} ${padding} font-bold`}
      >
        {children}
      </span>
    </>
  );

  const buttonClassName = `relative inline-block transition-all duration-300 hover:scale-105 py-4 ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClassName}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClassName}>
      {buttonContent}
    </button>
  );
}
