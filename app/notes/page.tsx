"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ArmorerNotesPage() {
  const [currentFrame, setCurrentFrame] = useState(8);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Scroll opening animation (frames 8 down to 1)
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsAnimating(false);
            setShowContent(true);
            return 1;
          }
          return prev - 1;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center perspective-1000">
      {/* Magical glow effects - only shown after animation */}
      {showContent && (
        <>
          {/* Center glow - radial shine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,215,0,0.25) 0%, rgba(255,215,0,0.1) 30%, transparent 70%)",
            }}
          />

          {/* Orbital light rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96 rounded-full border border-amber-500/20 pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-[450px] h-[450px] rounded-full border border-amber-400/10 pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Sparkle particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 80],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
              className="absolute w-1 h-1 bg-amber-300 rounded-full pointer-events-none"
              style={{
                left: `calc(50% + ${(Math.random() - 0.5) * 200}px)`,
                top: `calc(50% + ${(Math.random() - 0.5) * 200}px)`,
                boxShadow: "0 0 4px 2px rgba(255,215,0,0.6)",
              }}
            />
          ))}
        </>
      )}

      {/* Scroll with floating and 3D rotation toward viewer */}
      <motion.div
        animate={
          showContent
            ? {
                y: [0, -8, 0, -4, 0],
                rotateX: [0, -15, -8, -12, 0], // Tilts forward toward viewer
                rotateY: [0, 5, -3, 2, 0], // Slight side tilt
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Inner glow behind scroll */}
        {showContent && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 -z-10 rounded-full blur-2xl bg-amber-500/30"
            style={{
              filter: "blur(20px)",
            }}
          />
        )}

        {/* Scroll Image */}
        <div className="w-64 h-80 sm:w-80 sm:h-96 max-w-[80vw] max-h-[50vh] relative">
          <img
            src={`/scrolls/scroll-${currentFrame}.webp`}
            alt="Scroll"
            className="w-full h-full object-contain relative z-10"
          />

          {/* Shine overlay on the scroll */}
          {showContent && (
            <motion.div
              animate={{
                x: ["-150%", "150%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
            />
          )}
        </div>
      </motion.div>

      {/* Content fades in after magic settles */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-0 left-0 right-0 text-center pb-8"
          >
            <p className="font-masonic text-amber-400/80 text-sm tracking-wider animate-pulse">
              ✧ The ancient wisdom reveals itself... ✧
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
