"use client";

import { motion } from "framer-motion";
import Icon from "../icons";

export default function DownloadCV() {
  // CV download handler
  const handleDownloadCV = () => {
    const cvUrl = "/resume/Miko Recare CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Miko_Recare_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative z-10 py-16 px-8 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 border-t border-amber-700/30 w-full overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Magical glow effects */}
        <>
          {/* Center glow - radial shine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 30%, transparent 70%)",
            }}
          />

          {/* Orbital light rings */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border-2 border-amber-500/20"
              style={{
                left: "50%",
                top: "60%",
                width: "320px",
                height: "320px",
                marginLeft: "-160px",
                marginTop: "-160px",
              }}
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-amber-400/10"
              style={{
                left: "50%",
                top: "60%",
                width: "380px",
                height: "380px",
                marginLeft: "-190px",
                marginTop: "-190px",
              }}
            />
          </div>
        </>

        {/* Decorative corner icons */}
        <span className="absolute top-1 left-1 text-amber-700/40 text-xs z-20">
          ❧
        </span>
        <span className="absolute top-1 right-1 text-amber-700/40 text-xs z-20">
          ❧
        </span>
        <span className="absolute bottom-1 left-1 text-amber-700/40 text-xs z-20">
          ❦
        </span>
        <span className="absolute bottom-1 right-1 text-amber-700/40 text-xs z-20">
          ❦
        </span>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 p-6 border-l-4 border-amber-700/50 bg-black/30 rounded-r-lg text-left"
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon name="cross-swords" />
            <span className="font-masonic text-amber-400 text-sm tracking-wider">
              THE SCRIBE'S DECLARATION
            </span>
            <Icon name="cross-swords" />
          </div>
          <p className="font-masonic text-stone-300 text-sm leading-relaxed">
            Hark, traveler! I am{" "}
            <span className="text-amber-400 font-bold">Miko Recare</span>, a
            seasoned digital artisan with{" "}
            <span className="text-amber-400 font-bold">
              four winters of professional forging
            </span>{" "}
            in the code arts. My arsenal spans the realms of{" "}
            <span className="text-amber-400">
              Next.js, React, Angular, NestJS, Node.js,
            </span>
            and the sacred databases{" "}
            <span className="text-amber-400">PostgreSQL and MongoDB</span>. I
            have walked the lands of{" "}
            <span className="text-amber-400">
              Highly Succeed, Zyllem, and Nuclear Brain
            </span>
            , crafting full-stack solutions, slaying bugs, and conjuring
            features from the ethereal mists of requirement. My quill is ever
            ready — let us forge thy vision into reality.
          </p>
          <div className="flex justify-end mt-3">
            <span className="text-amber-700/40 text-xs">
              ~ verily, the codex speaks truth ~
            </span>
          </div>
        </motion.div>

        {/* Scroll Container - Scroll itself is clickable */}
        <div className="flex justify-center items-center min-h-[20vh] mb-4">
          {/* Scroll with floating and 3D rotation - Clickable */}
          <motion.button
            onClick={handleDownloadCV}
            animate={{
              y: [0, -8, 0, -4, 0],
              rotateX: [0, -10, -5, -8, 0],
              rotateY: [0, 4, -2, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 cursor-pointer group"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Inner glow behind scroll */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.5, 0.2],
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

            {/* Scroll Image - The button itself */}
            <div className="relative w-64 h-80 sm:w-80 sm:h-96 max-w-[80vw] max-h-[50vh]">
              <img
                src="/scrolls/scroll-download.png"
                alt="Click to Download CV"
                className="w-full h-full object-contain relative z-10 transition-all duration-300 group-hover:brightness-110"
              />

              {/* Shine overlay on the scroll */}
              <motion.div
                animate={{
                  x: ["-150%", "150%"],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut",
                }}
                className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
              />
            </div>
          </motion.button>
        </div>

        {/* Text content below scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Decorative header */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-amber-700/40"></div>
            <Crown name="scroll" className="w-4 h-4 text-amber-700/40" />
            <div className="w-12 h-px bg-amber-700/40"></div>
          </div>

          {/* Medieval title */}
          <h2 className="font-masonic text-2xl md:text-3xl text-amber-400 tracking-wider mb-2">
            THE SCRIBE'S TOME
          </h2>
          <p className="font-masonic text-stone-400 text-sm">
            Click the ancient scroll to claim thy codex
          </p>

          {/* Bottom inscription */}
          <div className="mt-6 text-center">
            <p className="font-masonic text-stone-500 text-[10px] tracking-wider">
              ~ Let it be known that this scribe hath mastered the code arts ~
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Simple icon component for decorative elements
function Crown({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    scroll: (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 4H20V20H4V4Z" stroke="currentColor" fill="none" />
        <path d="M8 8H16" stroke="currentColor" strokeLinecap="round" />
        <path d="M8 12H16" stroke="currentColor" strokeLinecap="round" />
        <path d="M8 16H13" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  };
  return icons[name] || null;
}
