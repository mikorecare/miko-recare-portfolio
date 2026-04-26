"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { characters } from "./data";
import MedievalPortrait from "@/components/ui/medieval-portrait";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textGlow, setTextGlow] = useState(false);
  const selectedChar = characters[currentIndex];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % characters.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Glow effect on character change
  useEffect(() => {
    setTextGlow(true);
    setTimeout(() => setTextGlow(false), 300);
  }, [currentIndex]);

  return (
    <div className="flex flex-col justify-center items-center text-center h-full w-full p-2 sm:p-6">
      {/* Portrait */}
      <div className="flex items-center justify-center">
        <MedievalPortrait
          src={selectedChar?.image || "/profile/king.png"}
          alt={selectedChar?.name || "King"}
          size="xs"
          borderColor="amber"
          glow={textGlow}
          meadow={true}
        />
      </div>
      
      <div className="w-8 sm:w-24 h-px bg-amber-700/30 my-1 sm:my-4"></div>
      
      <h1 className="font-masonic text-[10px] sm:text-2xl text-amber-800 tracking-wider">
        {selectedChar?.name}
      </h1>
      
      <p className="font-masonic text-[7px] sm:text-sm text-amber-700 tracking-wide mt-0.5 sm:mt-1">
        {selectedChar?.title}
      </p>
      
      <p className="font-masonic text-[6px] sm:text-xs text-amber-600/70 tracking-wide mt-0.5 sm:mt-1">
        {selectedChar?.subtitle}
      </p>
      
      <div className="w-8 sm:w-24 h-px bg-amber-700/30 my-1 sm:my-4"></div>
      
      {/* Mini pics */}
      <div className="flex flex-wrap justify-center items-center gap-0.5 sm:gap-3">
        {characters.map((char, index) => (
          <div
            key={char.id}
            className={`relative w-5 sm:w-8 h-5 sm:h-8 rounded-full border overflow-hidden ${
              currentIndex === index
                ? "border-amber-600 ring-0.5 sm:ring-1 ring-amber-400/50"
                : "border-amber-600/40"
            }`}
            title={char.name}
          >
            <Image
              src={char.image}
              alt={char.name}
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      
      <div className="flex gap-0.5 text-[4px] sm:text-[6px] text-amber-700/20 mt-1 sm:mt-4">
        <span>ᚠ</span>
        <span>ᚢ</span>
        <span>ᚦ</span>
        <span>ᚨ</span>
        <span>ᚱ</span>
        <span>ᚷ</span>
      </div>
    </div>
  );
}