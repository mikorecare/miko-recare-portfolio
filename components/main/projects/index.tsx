"use client";

import { useState } from "react";
import { projects as allProjects } from "./data";

interface ProjectsProps {
  projects?: typeof allProjects;
  page?: number;
  itemsPerPage?: number;
}

export default function Projects({
  projects: customProjects,
  page = 1,
  itemsPerPage = 5,
}: ProjectsProps) {
  const projectsToShow = customProjects || allProjects;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = projectsToShow.slice(startIndex, endIndex);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // State to track current screenshot index for each project
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState<{
    [key: number]: number;
  }>({});

  const getCurrentIndex = (projectIndex: number) => {
    return currentScreenshotIndex[projectIndex] || 0;
  };

  const nextScreenshot = (projectIndex: number, total: number) => {
    setCurrentScreenshotIndex((prev) => ({
      ...prev,
      [projectIndex]: (getCurrentIndex(projectIndex) + 1) % total,
    }));
  };

  const prevScreenshot = (projectIndex: number, total: number) => {
    setCurrentScreenshotIndex((prev) => ({
      ...prev,
      [projectIndex]: (getCurrentIndex(projectIndex) - 1 + total) % total,
    }));
  };

  return (
    <>
      <div className="flex flex-col justify-start h-full w-full p-1 sm:p-4 overflow-y-auto">
        <p className="font-masonic text-[4px] md:text-sm text-stone-600 text-center">
          ✧ LEGENDARY QUESTS ✧
        </p>

        <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-1 md:my-3 mx-auto"></div>

        <div className="space-y-[0.5] sm:space-y-1 md:space-y-2 my-0.5 sm:my-2">
          {paginatedProjects.map((project, i) => {
            const currentIndex = getCurrentIndex(i);
            const hasScreenshots =
              project.screenshots && project.screenshots.length > 0;
            const currentScreenshot = hasScreenshots
              ? project.screenshots[currentIndex]
              : null;
            const totalScreenshots = hasScreenshots
              ? project.screenshots.length
              : 0;
            const isMobile = project.isMobile || false;

            return (
              <div
                key={i}
                className="bg-amber-100/60 rounded border border-amber-700/30 overflow-hidden transition-all duration-300 hover:shadow-md hover:bg-amber-100/80"
              >
                {/* Header */}
                <div className="p-[2px] sm:p-2 md:p-3">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <h3 className="font-masonic text-amber-800 text-[3px] sm:text-[8px] md:text-xs font-bold tracking-wider">
                      {project.name}
                    </h3>
                    {project.links && project.links.length > 0 && (
                      <div className="flex gap-1 sm:gap-2">
                        {project.links.map((link, linkIdx) => (
                          <a
                            key={linkIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-georgia text-amber-500 hover:text-amber-300 text-[6px] sm:text-[9px] md:text-[11px] tracking-wider whitespace-nowrap transition-all duration-200 inline-block font-semibold animate-pulse"
                            style={{
                              textShadow: "0 0 8px rgba(245, 158, 11, 0.8)",
                            }}
                          >
                            ✦ [{link.name}] →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-1.5 sm:p-3 pt-0 border-t border-amber-700/20 space-y-1 sm:space-y-2">
                  <p className="font-georgia text-amber-700/80 text-[4px] sm:text-xs tracking-wider">
                    {project.description}
                  </p>

                  {/* Crystal Vision Container - changes based on isMobile flag */}
                  {hasScreenshots && currentScreenshot && (
                    <div className="mt-2">
                      <p className="font-masonic text-amber-700 text-[3px] sm:text-[8px] tracking-wider mb-1">
                        ✧ CRYSTAL VISIONS ✧ ({currentIndex + 1} /{" "}
                        {totalScreenshots})
                      </p>

                      <div className="relative group flex justify-center flex-col">
                        {/* Magical Crystal Ball / Scroll Container */}
                        <div
                          className="relative cursor-pointer"
                          onClick={() => setSelectedImage(currentScreenshot)}
                        >
                          {/* Magical Glow Effects */}
                          <div className="absolute -inset-1 bg-amber-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600/30 to-purple-600/30 rounded-lg blur-md"></div>

                          {/* Ancient Scroll / Crystal Container - conditional sizing */}
                          <div
                            className={`relative bg-gradient-to-br from-amber-900/90 to-amber-800/90 rounded-lg p-1 
                              border border-amber-500/50 shadow-xl
                              before:content-[''] before:absolute before:inset-0 before:rounded-lg 
                              before:bg-gradient-to-tr before:from-amber-400/10 before:to-purple-400/10
                              ${isMobile ? 'max-w-[150px] mx-auto' : 'w-full'}`}
                          >
                            {/* Decorative Runes */}
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-1 text-amber-400/60 text-[6px] sm:text-[8px] whitespace-nowrap">
                              <span>✦</span>
                              <span>ᚠ</span>
                              <span>ᚢ</span>
                              <span>ᚦ</span>
                              <span>✦</span>
                            </div>

                            {/* Image Container - Mobile vs Desktop styling */}
                            <div
                              className={`relative bg-stone-900/95 rounded-md overflow-y-auto overflow-x-hidden 
                                border border-amber-600/40
                                ${isMobile ? 'aspect-[9/19] max-h-[500px]' : ''}`}
                              style={!isMobile ? { maxHeight: "200px" } : {}}
                            >
                              {/* Corner Decorations */}
                              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500/60 rounded-tl-md z-10"></div>
                              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500/60 rounded-tr-md z-10"></div>
                              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500/60 rounded-bl-md z-10"></div>
                              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500/60 rounded-br-md z-10"></div>

                              {/* Mobile Phone Bezel for mobile apps */}
                              {isMobile && (
                                <>
                                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-800 rounded-b-md z-20"></div>
                                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rounded-full z-20"></div>
                                </>
                              )}

                              <img
                                src={currentScreenshot}
                                alt={`${project.name} screenshot ${currentIndex + 1}`}
                                className={`w-full object-cover object-top transition-all duration-500
                                  ${isMobile ? 'rounded-sm' : ''}`}
                                loading="lazy"
                              />

                              {/* Mobile Home Indicator */}
                              {isMobile && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-gray-600 rounded-full z-20"></div>
                              )}
                            </div>

                            {/* Ancient Rune Footer */}
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 text-amber-400/60 text-[6px] sm:text-[8px] whitespace-nowrap">
                              <span>ᚱ</span>
                              <span>ᚷ</span>
                              <span>✦</span>
                              <span>ᚨ</span>
                              <span>ᛗ</span>
                            </div>
                          </div>
                        </div>

                        {/* Navigation Arrows - Styled as Ancient Runes */}
                        {totalScreenshots > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevScreenshot(i, totalScreenshots);
                              }}
                              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2
                                bg-amber-900/80 hover:bg-amber-800 text-amber-300 rounded-full 
                                opacity-0 group-hover:opacity-100 transition-all duration-300
                                w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center
                                text-sm sm:text-base font-bold border border-amber-500/50
                                hover:shadow-lg hover:shadow-amber-500/20
                                backdrop-blur-sm"
                              title="Previous vision"
                            >
                              ◀
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextScreenshot(i, totalScreenshots);
                              }}
                              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2
                                bg-amber-900/80 hover:bg-amber-800 text-amber-300 rounded-full 
                                opacity-0 group-hover:opacity-100 transition-all duration-300
                                w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center
                                text-sm sm:text-base font-bold border border-amber-500/50
                                hover:shadow-lg hover:shadow-amber-500/20
                                backdrop-blur-sm"
                              title="Next vision"
                            >
                              ▶
                            </button>

                            {/* Magical Crystal Dots */}
                            <div className="flex justify-center gap-2 mt-3">
                              {project.screenshots.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentScreenshotIndex((prev) => ({
                                      ...prev,
                                      [i]: idx,
                                    }));
                                  }}
                                  className={`transition-all duration-300 transform hover:scale-125
                                    ${
                                      currentIndex === idx
                                        ? "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-500 shadow-lg shadow-amber-500/50 rounded-full"
                                        : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600/50 hover:bg-amber-500/70 rounded-full"
                                    }`}
                                  title={`View vision ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {project.highlights && project.highlights.length > 0 && (
                    <div>
                      <p className="font-masonic text-amber-700 text-[3px] sm:text-[8px] tracking-wider">
                        ✦ HIGHLIGHTS:
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-0.5">
                        {project.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="font-georgia text-amber-700 text-[3px] sm:text-[10px] tracking-wider"
                          >
                            ✦ {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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

      {/* Lightbox Modal for Full Image View */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] overflow-auto">
            <img
              src={selectedImage}
              alt="Full size screenshot"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-all duration-200 text-xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}