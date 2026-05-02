"use client";

import BookPortfolio from "@/components/book-portfolio";
import DownloadCV from "@/components/download-cv";
import NavigationHeader from "@/components/navigation";
import QASection from "@/components/qa-section";

export default function Home() {
  return (
    <main className="relative">
      <NavigationHeader />
      {/* Book Section - Full viewport height */}
      <div
        className="relative z-10 pt-1 sm:pt-15 md:pt-20"
        style={{
          backgroundImage: `url('/book-portfolio-bg.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark base overlay - dims the entire background */}
        <div className="absolute inset-0 pointer-events-none bg-black/50" />

        {/* Left dark overlay - stronger fade */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)",
          }}
        />

        {/* Right dark overlay - stronger fade */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)",
          }}
        />

        {/* Top dark overlay */}
        <div
          className="absolute top-0 left-0 w-full h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          }}
        />

        {/* Bottom dark overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          }}
        />

        {/* Center spotlight effect - keeps the middle brighter */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        <BookPortfolio />
      </div>

      {/* Decorative separator between book and QA */}
      <div className="relative z-10">
        <div className="absolute left-0 right-0 -mt-8 flex justify-center">
          <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 px-4 py-2 rounded-full border border-amber-700/30 shadow-lg">
            <span className="text-amber-700/60 text-xs font-masonic tracking-wider">
              ✧ ✦ ✧
            </span>
          </div>
        </div>
      </div>

      {/* Q&A Section */}
      <div className="relative z-10 pt-8">
        <QASection />
      </div>

      {/* Download CV Button - Below Q&A Section */}
      <div className="relative z-31 flex justify-center">
        <DownloadCV />
      </div>

      <footer className="mt-16 pt-6 pb-4 border-t-2 border-amber-700/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-3 text-amber-600/40 text-xs">
            <span className="font-masonic">✦</span>
            <span className="font-masonic">✧</span>
            <span className="font-masonic">✦</span>
          </div>
          <p className="text-amber-500/50 font-masonic text-[11px] tracking-wide">
            Forged in code · Honored by the realm
          </p>
          <p className="text-amber-600/30 font-masonic text-[9px] mt-2">
            © Miko Recare {new Date().getFullYear()} · All relics reserved
          </p>
        </div>
      </footer>
    </main>
  );
}
