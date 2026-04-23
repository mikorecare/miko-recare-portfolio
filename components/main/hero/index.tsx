"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { characters } from "./data";
import MedievalPortrait from "@/components/ui/medieval-portrait";
import MedievalButton from "@/components/ui/medieval-button";

interface HeroProps {
  onCharacterChange: (characterId: string) => void;
  autoRotateIndex: number;
  onAutoRotateIndexChange: (index: number) => void;
}

export default function Hero({
  onCharacterChange,
  autoRotateIndex,
  onAutoRotateIndexChange,
}: HeroProps) {
  const [swordSwing, setSwordSwing] = useState(false);
  const [magicParticles, setMagicParticles] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [textGlow, setTextGlow] = useState(false);
  const particleIdRef = { current: 0 };

  const currentIndex = autoRotateIndex;
  const selectedChar = characters[currentIndex];

  useEffect(() => {
    setSwordSwing(true);
    setTimeout(() => setSwordSwing(false), 500);

    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 150,
        id: particleIdRef.current++,
      });
    }
    setMagicParticles(newParticles);
    setTimeout(() => setMagicParticles([]), 1000);

    setTextGlow(true);
    setTimeout(() => setTextGlow(false), 300);
  }, [currentIndex]);

  const handleCharacterClick = (charId: string, index: number) => {
    onCharacterChange(charId);
    onAutoRotateIndexChange(index);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      {/* Auto-rotate indicator - Top right corner */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse" />
        <span className="font-masonic text-amber-400 text-[10px] sm:text-xs tracking-wider">
          Auto-Rotating
        </span>
      </div>

      {/* Progress bar - Moved to top, below indicator */}
      <div className="absolute top-14 sm:top-16 right-4 w-32 sm:w-40 md:w-48 h-1 bg-amber-500/30 rounded-full overflow-hidden z-30">
        <div className="h-full bg-amber-500 rounded-full animate-progress-5s" />
      </div>

      {/* Sword Swing Effect */}
      {swordSwing && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
            <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-amber-500 via-orange-500 to-transparent animate-sword-swing" />
            <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-amber-500 via-orange-500 to-transparent animate-sword-swing-delayed" />
          </div>
        </div>
      )}

      {/* Magic Particles */}
      {magicParticles.slice(0, 8).map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: `calc(50% + ${particle.x * 0.7}px)`,
            top: `calc(50% + ${particle.y * 0.7}px)`,
            animation: "float-up 1s ease-out forwards",
          }}
        >
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
        </div>
      ))}

      {/* Floating magical dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-amber-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 z-10">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12">
          {/* Picture */}
          <div className="w-full flex justify-center">
            <MedievalPortrait
              src={selectedChar?.image || "/profile/king.png"}
              alt={selectedChar?.name || "King"}
              size="lg"
              borderColor="amber"
              glow={textGlow}
              meadow={true}
            />
          </div>

          {/* Text Content */}
          <div className="w-full text-center">
            <div className="relative mb-3 sm:mb-4 md:mb-6">
              <h1
                className={`font-masonic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 tracking-wider transition-all duration-300 ${
                  textGlow
                    ? "text-amber-300 drop-shadow-[0_0_15px_rgba(255,191,0,0.8)] scale-105"
                    : "text-amber-500"
                }`}
              >
                MIKO RECARE
              </h1>
            </div>

            <p
              className={`font-masonic text-amber-400 text-sm sm:text-base md:text-lg mb-1 tracking-wide transition-all duration-300 ${
                textGlow
                  ? "text-amber-300 drop-shadow-[0_0_10px_rgba(255,191,0,0.6)]"
                  : ""
              }`}
            >
              {selectedChar?.title}
            </p>
            <p className="font-masonic text-xs sm:text-sm md:text-base text-amber-300/70 mb-6 sm:mb-8 md:mb-10 tracking-wide px-2">
              {selectedChar?.subtitle}
            </p>

            {/* Character Selection Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-full px-2">
              {characters.map((char, index) => (
                <button
                  key={char.id}
                  onClick={() => handleCharacterClick(char.id, index)}
                  className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 overflow-hidden transition-all duration-300 flex-shrink-0 ${
                    currentIndex === index
                      ? "border-amber-500 scale-110 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50"
                      : "border-amber-500/30 hover:border-amber-500/70 hover:scale-105"
                  }`}
                  title={char.name}
                >
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 px-4 pb-8">
              <MedievalButton href="#about" variant="outline" size="md">
                ENTER THE KEEP
              </MedievalButton>
              <MedievalButton href="#projects" variant="primary" size="md">
                VIEW QUESTS
              </MedievalButton>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Moved further down with more bottom spacing */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-30"
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-amber-400 rounded-full flex justify-center relative">
          <div className="w-1 h-2 bg-amber-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}