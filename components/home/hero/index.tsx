"use client";

import { bio } from "@/components/main/about/data";
import { motion } from "framer-motion";
import Image from "next/image";
import StackIcon from "tech-stack-icons";
import LinkedInLogo from "./linked-in-logo";

interface HomeHeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

const HomeHeroSection = ({ onExplore, onContact }: HomeHeroSectionProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 w-full h-[100vh] relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-stone-900/80 to-stone-800/80" />

    {/* 3-Column Grid Layout */}
    <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-3">
      {/* Column 1 - Left: Name */}
      <div className="flex items-center justify-start pl-8 md:pl-12 lg:pl-20">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-montserrat text-5xl lg:text-[90px] font-bold text-white">
            Miko Recare
          </h1>
          <p className="font-poppins text-xl md:text-2xl text-cyan-400 tracking-wider mt-2 font-bold">
            Full-Stack Developer
          </p>
        </motion.div>
      </div>

      {/* Column 2 - Middle: Image at bottom */}
      <div className="flex flex-col justify-end items-center pt-6">
        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onExplore}
              className="group relative px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 bg-black/30 backdrop-blur-sm border border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              <span className="relative z-10 font-poppins text-sm font-semibold tracking-wider text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                ✦ EXPLORE ✦
              </span>
            </button>

            <button
              onClick={onContact}
              className="group relative px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 bg-black/30 backdrop-blur-sm border border-gray-500/50 hover:border-cyan-500/50"
            >
              <span className="relative z-10 font-poppins text-sm font-semibold tracking-wider text-gray-300 group-hover:text-white transition-colors duration-300">
                ✉ CONTACT
              </span>
            </button>
          </div>

          {/* LinkedIn and GitHub Links */}
          <div className="flex gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/miko-recare/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 bg-black/20 backdrop-blur-sm border border-gray-500/30 hover:border-cyan-500/50 hover:bg-black/40"
            >
              <span className="text-base"><LinkedInLogo /></span>
              <span className="font-poppins text-xs text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                LinkedIn
              </span>
            </a>

            <a
              href="https://github.com/mikorecare"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 bg-black/20 backdrop-blur-sm border border-gray-500/30 hover:border-cyan-500/50 hover:bg-black/40"
            >
              <span className="text-base "><StackIcon name="github" style={{width: "12px", height:"12px"}}/></span>
              <span className="font-poppins text-xs text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                GitHub
              </span>
            </a>
          </div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative w-48 h-48 md:w-64 md:h-64 lg:w-128 lg:h-128"
        >
          {/* Aura/Glow effect behind the image */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/30 via-cyan-400/10 to-transparent blur-2xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl" />

          <Image
            src="/home/pic.png"
            alt="Miko Recare - Looking far away"
            fill
            className="object-contain drop-shadow-2xl"
            priority
            sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
          />
        </motion.div>
      </div>

      {/* Column 3 - Right: Bio and Buttons */}
      <div className="flex items-center justify-end pr-8 md:pr-12 lg:pr-20">
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-right max-w-md"
        >
          {/* Experience badge */}
          <div className="inline-block mb-4 px-3 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <span className="font-poppins text-[10px] md:text-xs text-cyan-400 tracking-wider">
              ✦ 4+ YEARS OF EXPERIENCE ✦
            </span>
          </div>

          {/* Bio */}
          <div className="space-y-2 mb-6">
            {bio.map((line, index) => (
              <p
                key={index}
                className="font-poppins text-gray-300 text-sm md:text-base leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

export default HomeHeroSection;
