"use client";

import { useEffect, useState, useRef } from "react";

interface DialogBoxProps {
  monster: { name: string; dialog: string } | null;
  onClose: () => void;
}

export default function DialogBox({ monster, onClose }: DialogBoxProps) {
  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Split long dialog into pages
  const splitIntoPages = (text: string): string[] => {
    const maxChars = 250;
    const words = text.split(" ");
    const pages: string[] = [];
    let currentPage = "";

    for (const word of words) {
      if ((currentPage + " " + word).length <= maxChars) {
        currentPage += (currentPage ? " " : "") + word;
      } else {
        if (currentPage) pages.push(currentPage);
        currentPage = word;
      }
    }
    if (currentPage) pages.push(currentPage);

    return pages;
  };

  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    if (monster) {
      setVisible(true);
      setCurrentPage(0);
      const newPages = splitIntoPages(monster.dialog);
      setPages(newPages);
      setIsTyping(true);
      setDisplayText("");
    }
  }, [monster]);

  // Typing animation effect
  useEffect(() => {
    if (isTyping && pages[currentPage]) {
      let index = 0;
      setDisplayText("");

      const typeInterval = setInterval(() => {
        if (index <= pages[currentPage].length) {
          setDisplayText(pages[currentPage].substring(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 25);

      return () => clearInterval(typeInterval);
    }
  }, [isTyping, currentPage, pages]);

  const handleNext = () => {
    if (isTyping) {
      setIsTyping(false);
      setDisplayText(pages[currentPage]);
    } else if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setIsTyping(true);
      setDisplayText("");
    } else {
      setVisible(false);
      onClose();
    }
  };

  const handleClose = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setVisible(false);
    onClose();
  };

  if (!monster || !visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Dark overlay background */}
      <div
        className="absolute inset-0 bg-black/50 pointer-events-auto"
        onClick={handleClose}
      />

      {/* Dialog Container */}
      <div className="pointer-events-auto animate-slide-up w-full max-w-5xl mx-4">
        {/* Character Name Header */}
        <div className="flex items-center gap-4 mb-3 ml-6">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-4xl shadow-lg ring-2 ring-cyan-300">
            👾
          </div>
          <div className="bg-black/80 backdrop-blur-md rounded-full px-6 py-3 border-2 border-cyan-500/50">
            <h3 className="font-reactor7 text-cyan-400 text-3xl tracking-wider">
              {monster.name}
            </h3>
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="relative">
          {/* Speech bubble arrow */}
          <div className="absolute left-12 -top-4 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[20px] border-b-black/90 backdrop-blur-md" />

          {/* Main Dialog Box */}
          <div className="bg-black/90 backdrop-blur-md rounded-2xl p-8 border-2 border-cyan-500 shadow-2xl">
            {/* Dialog Text - MUCH LARGER FONT */}
            <div className="min-h-[200px]">
              <p className="font-reactor7 text-cyan-100 text-2xl leading-relaxed tracking-wide">
                {displayText}
                {isTyping && (
                  <span className="inline-block w-3 h-7 bg-cyan-400 ml-1 animate-pulse" />
                )}
              </p>
            </div>

            {/* Page Indicator */}
            {pages.length > 1 && (
              <div className="mt-4 text-center">
                <span className="font-reactor7 text-base text-gray-400">
                  [{currentPage + 1} / {pages.length}]
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handleClose}
                className="font-reactor7 text-gray-400 hover:text-white text-lg transition-colors px-4 py-2 rounded-lg hover:bg-white/10 tracking-wider"
              >
                [CLOSE]
              </button>

              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-reactor7 text-lg px-8 py-3 rounded-full transition-all duration-200 shadow-lg flex items-center gap-2 tracking-wider"
              >
                {isTyping
                  ? "[SKIP]"
                  : currentPage === pages.length - 1
                    ? "[EXIT]"
                    : "[NEXT]"}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Instruction Hint */}
        <div className="text-center mt-4 text-gray-400 font-reactor7 text-base tracking-wider">
          [PRESS SPACE OR CLICK BUTTON TO CONTINUE]
        </div>
      </div>
    </div>
  );
}
