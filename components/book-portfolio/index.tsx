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
      const imagesToPreload = [
        // Essential profile images (current character + a few)
        "/profile/king.png",
        "/profile/wizard.png",
        "/profile/archer.png",

        // Essential buttons
        "/buttons/enter-the-keep.png",
        "/buttons/explore-the-village.png",
        "/buttons/view-quest.png",

        // First few animated frames
        "/animated/talking-frame-1.png",
        "/animated/talking-frame-2.png",
        "/animated/talking-frame-3.png",
        "/animated/talking-frame-4.png",
        "/animated/talking-frame-5.png",

        // Background
        "/scroll.png",
      ];

      let loaded = 0;

      const preloadPromises = imagesToPreload.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded++;
            setLoadingProgress(
              Math.floor((loaded / imagesToPreload.length) * 100),
            );
            resolve(true);
          };
          img.onerror = () => {
            loaded++;
            setLoadingProgress(
              Math.floor((loaded / imagesToPreload.length) * 100),
            );
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
        className="min-h-screen bg-[#1a1410] flex items-center justify-center"
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
    <div className="min-h-screen">
      {/* Book Section - Centered */}
      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl px-8">
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

            <div className="demoPage page-content right-page overflow-hidden">
              <Experience />
              <div className="page-number">folio 4</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Quote />
              <div className="page-number">folio 5</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Projects />
              <div className="page-number">folio 6</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <Certifications />
              <div className="page-number">folio 7</div>
            </div>

            <div className="demoPage page-content right-page overflow-hidden">
              <Awards />
              <div className="page-number">folio 8</div>
            </div>

            <div className="demoPage page-content left-page overflow-hidden">
              <SummonDeveloper />
              <div className="page-number">folio 9</div>
            </div>

            <div className="demoPage back-cover right-page overflow-hidden">
              <BackCover />
            </div>
          </HTMLFlipBook>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevPage}
              className="px-5 py-2 bg-black/50 border border-amber-600 text-amber-400 rounded-lg text-sm font-masonic tracking-wider hover:bg-amber-600/20 transition-colors"
            >
              ◀ Previous
            </button>
            <button
              onClick={nextPage}
              className="px-5 py-2 bg-black/50 border border-amber-600 text-amber-400 rounded-lg text-sm font-masonic tracking-wider hover:bg-amber-600/20 transition-colors"
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
