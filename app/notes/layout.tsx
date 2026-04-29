"use client";

import { ReactNode } from "react";

interface ArmorerNotesLayoutProps {
  children: ReactNode;
}

export default function ArmorerNotesLayout({
  children,
}: ArmorerNotesLayoutProps) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('/bg-notes.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />

      {/* CHANGE FROM absolute TO fixed */}
      <div className="fixed inset-0 pointer-events-none bg-black/50" />

      {/* Left dark overlay - stronger fade */}
      <div
        className="fixed top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)",
        }}
      />

      {/* Right dark overlay - stronger fade */}
      <div
        className="fixed top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)",
        }}
      />

      {/* Top dark overlay */}
      <div
        className="fixed top-0 left-0 w-full h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Bottom dark overlay - CHANGE FROM absolute TO fixed */}
      <div
        className="fixed bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Center spotlight effect - keeps the middle brighter */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 min-h-screen">
        {/* Decorative Header */}
        <div className="text-center pt-12 pb-4">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-16 h-px bg-amber-700/60"></div>
            <span className="text-amber-700/70 text-xl">⚒️</span>
            <div className="w-16 h-px bg-amber-700/60"></div>
          </div>
          <h1 className="font-masonic text-4xl md:text-5xl text-amber-300 tracking-wider drop-shadow-lg">
            THE ARMORER'S NOTES
          </h1>
          <p className="font-masonic text-stone-300 text-sm mt-3 tracking-wide drop-shadow-md">
            A craftsman's reflection on the tools and techniques behind the
            codex
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="text-amber-600/60 text-xs">⬩</span>
            <span className="text-amber-600/60 text-xs">⬩</span>
            <span className="text-amber-600/60 text-xs">⬩</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-5xl mx-auto px-6 pb-16">{children}</div>

        {/* Decorative Footer */}
        <div className="text-center py-8">
          <div className="flex justify-center gap-3 text-amber-600/40 text-sm">
            <span>✦</span>
            <span>❧</span>
            <span>✦</span>
            <span>❦</span>
            <span>✦</span>
          </div>
          <p className="font-masonic text-stone-500 text-[10px] mt-4 tracking-wider">
            ~ Forged in the fires of curiosity and refined through iteration ~
          </p>
        </div>
      </div>
    </div>
  );
}
