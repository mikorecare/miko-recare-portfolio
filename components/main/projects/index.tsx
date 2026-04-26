"use client";

import { useState } from "react";
import { projects } from "./data";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col justify-center h-full w-full p-1 sm:p-4 overflow-y-auto">
      <p className="font-masonic text-[5px] sm:text-xs md:text-sm text-stone-600 text-center pt-1 sm:pt-20 md:pt-20">
        ✧ LEGENDARY QUESTS ✧
      </p>
      
      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-1 md:my-3 mx-auto"></div>
      
      <div className="space-y-[0.5] sm:space-y-1 md:space-y-2 my-0.5 sm:my-2">
        {projects.map((project, i) => (
          <div
            key={i}
            className="bg-amber-100/60 rounded border border-amber-700/30 overflow-hidden transition-all duration-300 hover:shadow-md"
            onMouseEnter={() => setExpandedId(i)}
            onMouseLeave={() => setExpandedId(null)}
          >
            {/* Header - Always visible */}
            <div className="p-[2px] sm:p-2 md:p-3">
              <h3 className="font-masonic text-amber-800 text-[3px] sm:text-[8px] md:text-xs font-bold tracking-wider">
                {project.name}
              </h3>
            </div>

            {/* Expanded content - animated */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedId === i ? "max-h-48 sm:max-h-64 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-1.5 sm:p-3 pt-0 border-t border-amber-700/20 space-y-1 sm:space-y-2">
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <p className="font-masonic text-amber-700 text-[6px] sm:text-xs tracking-wider">
                      Highlights:
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-0.5">
                      {project.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="font-masonic text-amber-700/60 text-[6px] sm:text-[10px] tracking-wider"
                        >
                          ✦ {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="font-masonic text-amber-700 text-[6px] sm:text-xs tracking-wider">
                    Tech Stack:
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-0.5">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-masonic text-amber-700/50 text-[6px] sm:text-[10px] tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-0.5 text-[3px] sm:text-[6px] text-amber-700/20 mt-1 sm:mt-4 justify-center">
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