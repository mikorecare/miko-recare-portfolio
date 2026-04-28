"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import Hero from "@/components/main/hero";
import Experience from "@/components/main/experiences";
import Projects from "@/components/main/projects";
import { Certifications } from "@/components/main/certifications";
import { Awards } from "@/components/main/awards";
import Cover from "@/components/main/cover/cover";
import InsideCover from "@/components/main/cover/inside-cover";
import TableOfContents from "@/components/main/cover/table-of-contents";
import AboutPage1 from "@/components/main/about/about-page-1";
import AboutPage2 from "@/components/main/about/about-page-2";
import BackCover from "@/components/main/cover/back-cover";
import Quote from "../main/quote";
import SummonDeveloper from "../main/summon-developer";

export default function BookPortfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const loadAssets = async () => {
      // Generate all open-arms frames (1-8)
      const openArmsFrames = Array.from(
        { length: 8 },
        (_, i) => `/animated/talking-open-arms-${i + 1}.png`,
      );

      // Generate all raising-finger frames (1-8)
      const raisingFingerFrames = Array.from(
        { length: 8 },
        (_, i) => `/animated/talking-raising-finger-${i + 1}.png`,
      );

      const imagesToPreload = [
        // Profile images
        "/profile/king.png",
        "/profile/wizard.png",
        "/profile/archer.png",

        // Buttons
        "/buttons/enter-the-keep.png",
        "/buttons/explore-the-village.png",
        "/buttons/view-quest.png",

        // Background
        "/scroll.png",

        // All animated frames (both sets)
        ...openArmsFrames,
        ...raisingFingerFrames,
      ];

      let loaded = 0;
      const totalImages = imagesToPreload.length;

      const preloadPromises = imagesToPreload.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded++;
            setLoadingProgress(Math.floor((loaded / totalImages) * 100));
            resolve(true);
          };
          img.onerror = () => {
            loaded++;
            setLoadingProgress(Math.floor((loaded / totalImages) * 100));
            resolve(false);
          };
        });
      });

      await Promise.all(preloadPromises);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    loadAssets();
  }, []);

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#1a1410] flex items-center justify-center relative z-50"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-amber-700 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-amber-600 text-xl font-masonic mb-2">
            Opening The Ancient Codex...
          </p>
          <div className="w-48 h-1 bg-stone-700 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-amber-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-amber-600/60 text-xs font-masonic mt-2">
            {loadingProgress}% complete
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative z-20">
      {/* Book Section - Centered with side buttons */}
      <div className="h-screen flex items-center justify-center relative px-4">
        {/* Left Button - Positioned on the left side of the book */}
        {/* Left Button - Positioned on the left side of the book (desktop) / below (mobile) */}
        <button
          onClick={prevPage}
          className="fixed z-30 group flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border-2 border-amber-600/60 text-amber-400 transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent
    lg:left-[calc(50%-520px)] lg:top-1/2 lg:-translate-y-1/2
    bottom-6 left-1/2 -translate-x-[110%]"
        >
          <span className="text-lg group-hover:animate-pulse">◀</span>
          <div className="absolute inset-0 rounded-full bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-300 blur-xl" />
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-2xl" />
          </div>
        </button>

        {/* Right Button - Positioned on the right side of the book (desktop) / below (mobile) */}
        <button
          onClick={nextPage}
          className="fixed z-30 group flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border-2 border-amber-600/60 text-amber-400 transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent
    lg:right-[calc(50%-520px)] lg:top-1/2 lg:-translate-y-1/2
    bottom-6 right-1/2 translate-x-[110%]"
        >
          <span className="text-lg group-hover:animate-pulse">▶</span>
          <div className="absolute inset-0 rounded-full bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-300 blur-xl" />
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-2xl" />
          </div>
        </button>

        {/* Book Container */}
        <div className="w-full max-w-5xl px-8 relative z-10">
          <HTMLFlipBook
            ref={flipBookRef}
            width={900}
            height={1200}
            drawShadow={true}
            showCover={true}
            size="stretch"
            className="mx-auto"
            maxShadowOpacity={1}
            style={{ width: "100%", height: "auto" }}
            useMouseEvents={false}
          >
            <div className="demoPage cover right-page overflow-hidden">
              <Cover />
            </div>

            <div className="demoPage inside-cover left-page overflow-hidden">
              <InsideCover />
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <TableOfContents />
              <div className="page-number">folio i</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Hero />
              <div className="page-number">folio 1</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <AboutPage1 />
              <div className="page-number">folio 2</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <AboutPage2 />
              <div className="page-number">folio 3</div>
            </div>

            {/* Page 1 - 1 item */}
            <div className="demoPage page-content right-page overflow-hidden">
              <Experience page={1} itemsPerPage={1} />
              <div className="page-number">folio 4a</div>
            </div>

            {/* Page 2 - 1 item */}
            <div className="demoPage page-content left-page overflow-hidden">
              <Experience page={2} itemsPerPage={1} />
              <div className="page-number">folio 4b</div>
            </div>

            {/* Page 3 - 1 item */}
            <div className="demoPage page-content right-page overflow-hidden">
              <Experience page={3} itemsPerPage={1} />
              <div className="page-number">folio 4c</div>
            </div>

            {/* Page 4 - remaining items */}
            <div className="demoPage page-content left-page overflow-hidden">
              <Experience page={4} itemsPerPage={1} />
              <div className="page-number">folio 4d</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Experience page={5} itemsPerPage={1} />
              <div className="page-number">folio 4e</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Quote />
              <div className="page-number">folio 5</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Projects page={1} itemsPerPage={1} />
              <div className="page-number">folio 6a</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Projects page={2} itemsPerPage={1} />
              <div className="page-number">folio 6b</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Projects page={3} itemsPerPage={1} />
              <div className="page-number">folio 6c</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Projects page={4} itemsPerPage={1} />
              <div className="page-number">folio 6d</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Projects page={5} itemsPerPage={1} />
              <div className="page-number">folio 6e</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Projects page={6} itemsPerPage={1} />
              <div className="page-number">folio 6f</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Projects page={7} itemsPerPage={1} />
              <div className="page-number">folio 6g</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Projects page={8} itemsPerPage={1} />
              <div className="page-number">folio 6h</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Projects page={9} itemsPerPage={1} />
              <div className="page-number">folio 6i</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Projects page={10} itemsPerPage={1} />
              <div className="page-number">folio 6j</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Certifications page={1} itemsPerPage={3} />
              <div className="page-number">folio 7a</div>
            </div>

            {/* Page 2 - Next 3 certifications */}
            <div className="demoPage page-content left-page overflow-hidden">
              <Certifications page={2} itemsPerPage={3} />
              <div className="page-number">folio 7b</div>
            </div>

            {/* Page 3 - Remaining certifications */}
            <div className="demoPage page-content right-page overflow-hidden">
              <Certifications page={3} itemsPerPage={3} />
              <div className="page-number">folio 7c</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Awards />
              <div className="page-number">folio 8</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <SummonDeveloper />
              <div className="page-number">folio 9</div>
            </div>

            <div className="demoPage back-cover left-page overflow-hidden">
              <BackCover />
            </div>
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}
