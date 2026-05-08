"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeHeroSection from "@/components/home/hero";
import InteractiveSection from "@/components/home/interactive-section";

export default function Home() {
  const [showHero, setShowHero] = useState(true);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/home/mp3/bg.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (shouldPlayMusic && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Play failed:", err);
      });
    } else if (!shouldPlayMusic && audioRef.current) {
      audioRef.current.pause();
    }
  }, [shouldPlayMusic]);

  const handleExplore = () => {
    setShowHero(false);
    setShouldPlayMusic(true);
  };

  const handleBack = () => {
    setShowHero(true);
    setShouldPlayMusic(false);
  };

  return (
    <div className="relative w-full h-full">
      <div className="fixed inset-0 z-0">
        <InteractiveSection onBack={handleBack} />
      </div>

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
              onExplore={handleExplore}
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
