"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeHeroSection from "@/components/home/hero";
import InteractiveSection from "@/components/home/interactive-section";

export default function Home() {
  const [showHero, setShowHero] = useState(true);

  return (
    <div className="relative w-full h-full">
      {/* InteractiveSection - background layer */}
      <div className="fixed inset-0 z-0">
        <InteractiveSection onBack={() => setShowHero(true)} />
      </div>

      {/* HeroSection - overlay layer */}
      <AnimatePresence>
        {showHero && (
          <motion.div
            key="hero"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(4px)",
              transition: { duration: 0.5, ease: "easeOut" },
            }}
            className="fixed inset-0 z-50"
          >
            <HomeHeroSection
              onExplore={() => setShowHero(false)}
              onContact={() =>
                (window.location.href = "mailto:mikorecare@gmail.com")
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
