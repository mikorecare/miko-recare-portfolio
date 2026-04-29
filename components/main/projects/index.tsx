"use client";

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

  return (
    <div className="flex flex-col justify-start h-full w-full p-1 sm:p-4 overflow-y-auto">
      <p className="font-masonic text-[5px] sm:text-xs md:text-sm text-stone-600 text-center pt-1 sm:pt-20 md:pt-20">
        ✧ LEGENDARY QUESTS ✧
      </p>

      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-1 md:my-3 mx-auto"></div>

      <div className="space-y-[0.5] sm:space-y-1 md:space-y-2 my-0.5 sm:my-2">
        {paginatedProjects.map((project, i) => (
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
                        className="font-masonic text-amber-500 hover:text-amber-300 text-[6px] sm:text-[9px] md:text-[11px] tracking-wider whitespace-nowrap transition-all duration-200 inline-block font-semibold animate-pulse"
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

            {/* Content - Always visible */}
            <div className="p-1.5 sm:p-3 pt-0 border-t border-amber-700/20 space-y-1 sm:space-y-2">
              <p className="font-masonic text-amber-700/80 text-[4px] sm:text-xs tracking-wider">
                {project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <p className="font-masonic text-amber-700 text-[3px] sm:text-xs tracking-wider">
                    Highlights:
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-0.5">
                    {project.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="font-masonic text-amber-700/60 text-[3px] sm:text-[10px] tracking-wider"
                      >
                        ✦ {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="font-masonic text-amber-800 dark:text-amber-600 text-[3px] sm:text-xs tracking-wider font-semibold mb-1">
                  ⚔ Tech Stack:
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-0.5">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="group relative inline-flex items-center gap-0.5
                   px-1 sm:px-2 py-0.5 rounded-md
                   bg-gradient-to-br from-amber-100 to-amber-50
                   dark:from-amber-200/80 dark:to-amber-100/60
                   border border-amber-600/40 hover:border-amber-600/80
                   shadow-sm hover:shadow-md
                   transition-all duration-200 hover:-translate-y-0.5
                   font-masonic text-[3px] sm:text-[10px] tracking-wider
                   text-amber-900 dark:text-amber-950 font-medium"
                    >
                      <span className="text-amber-700 text-[2px] sm:text-[6px]">
                        ✦
                      </span>
                      {t}
                    </span>
                  ))}
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
