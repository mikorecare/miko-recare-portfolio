"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const FirstPersonCanvas = dynamic(
  () => import("@/components/first-person-canvas"),
  { ssr: false },
);

export default function FirstPersonContainer() {
  const [hasStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartExperience = () => {
    setIsStarted(true);
  };

  // Auto-request pointer lock when canvas mounts
  useEffect(() => {
    if (hasStarted && containerRef.current) {
      setTimeout(() => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
          canvas.click();
        }
      }, 100);
    }
  }, [hasStarted]);

  if (!hasStarted) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        {/* Video screen container */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          {/* Screen content - preview/start screen */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-black/90 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center h-full px-8">
              {/* TV static effect overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.2)_2px,rgba(0,0,0,0.2)_4px)]" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center max-w-2xl">
                {/* Animated scanline effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-full h-[2px] bg-white/20 animate-scanline" />
                </div>

                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl rotate-12 shadow-2xl flex items-center justify-center animate-pulse">
                    <span className="text-4xl">🎮</span>
                  </div>
                </div>

                <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-3">
                  3D First Person Experience
                </h2>

                <p className="font-inter text-gray-300 mb-6">
                  Step into an immersive 3D world with full first-person
                  controls
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-inter text-gray-300">
                    <span>WASD</span> <span>•</span> <span>Move</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-inter text-gray-300">
                    <span>🖱️</span> <span>•</span> <span>Look</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-inter text-gray-300">
                    <span>🔒</span> <span>•</span> <span>Click to lock</span>
                  </div>
                </div>

                <button
                  onClick={handleStartExperience}
                  className="inline-flex items-center gap-2 px-6 py-3 font-poppins font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <span>▶</span>
                  <span>Start Experience</span>
                </button>

                <div className="mt-4 text-xs font-inter text-gray-400">
                  ESC to unlock cursor
                </div>
              </div>
            </div>
          </div>

          {/* Fake screen bezel reflection */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10" />
          <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Active 3D view container - like a video screen */}
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
        {/* Screen reflection effect */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10 z-10" />
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-2xl z-10" />

        {/* Small red recording dot effect */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-20 pointer-events-none">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-white/70">LIVE</span>
        </div>

        {/* The 3D canvas - now constrained to this container */}
        <div ref={containerRef} className="absolute inset-0">
          <FirstPersonCanvas />
        </div>

        {/* Control hints overlay */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 font-inter text-[10px] text-white/70 z-20 pointer-events-none space-y-1">
          <div>🎮 WASD + Mouse</div>
          <div>🔫 1-9 or N/P to switch weapons</div>
          <div>🔒 Click to lock | ESC to unlock</div>
        </div>
        {/* Exit hint */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 font-inter text-[10px] text-white/50 z-20 pointer-events-none">
          ESC to unlock
        </div>
      </div>
    </div>
  );
}
