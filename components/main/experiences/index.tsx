"use client";

import Icon from "@/components/icons";
import { experiences as allExperiences } from "./data";

interface ExperienceProps {
  experiences?: typeof allExperiences;
  page?: number;
  itemsPerPage?: number;
}

export default function Experience({
  experiences: customExperiences,
  page = 1,
  itemsPerPage = 3,
}: ExperienceProps) {
  const experiencesToShow = customExperiences || allExperiences;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExperiences = experiencesToShow.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col justify-start h-full w-full p-1 sm:p-6 overflow-y-auto">
      <p className="font-masonic text-[5px] sm:text-sm text-stone-600 text-center">
        ✧ THE JOURNEY ✧
      </p>

      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-4 mx-auto"></div>

      <div className="space-y-2 sm:space-y-3 my-0.5 sm:my-2">
        {paginatedExperiences.map((exp, i) => (
          <div
            key={i}
            className="bg-amber-100/60 rounded border border-amber-700/30 overflow-hidden"
          >
            {/* Header - Company and Period */}
            <div className="p-2 sm:p-3 bg-amber-200/30 border-b border-amber-700/20">
              <div className="flex justify-between items-start flex-wrap gap-1">
                <h2 className="font-masonic text-amber-800 text-[6px] sm:text-xs md:text-sm font-bold tracking-wider">
                  {exp.title}
                </h2>
                <span className="font-masonic text-stone-500 text-[4px] sm:text-[6px] md:text-xs bg-amber-200/50 px-1 sm:px-2 py-0.5 rounded whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
              <p className="font-masonic text-amber-700 text-[5px] sm:text-[8px] md:text-xs font-semibold mt-0.5">
                {exp.role}
              </p>
            </div>

            {/* Content */}
            <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
              {exp.location && (
                <p className="font-masonic text-stone-500 text-[5px] sm:text-[8px] flex items-center gap-1">
                  <Icon name="map" className="w-2 h-2 sm:w-3 sm:h-3" />{" "}
                  {exp.location}
                </p>
              )}

              <p className="font-masonic text-stone-600 text-[6px] sm:text-[9px] leading-relaxed">
                {exp.description}
              </p>

              {exp.projects && exp.projects.length > 0 && (
                <div>
                  <p className="font-masonic text-amber-700 text-[5px] sm:text-[8px] tracking-wider font-semibold">
                    Key Quests:
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exp.projects.map((project, idx) => (
                      <span
                        key={idx}
                        className="font-masonic text-stone-600 text-[4px] sm:text-[7px] border border-amber-700/30 px-1 sm:px-1.5 py-0.5 rounded-full bg-amber-100/70"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="group relative inline-flex items-center gap-0.5 sm:gap-1
                   px-1 sm:px-2 py-0.5 sm:py-1 rounded-md
                   bg-gradient-to-br from-amber-100 to-amber-50
                   dark:from-amber-200/80 dark:to-amber-100/60
                   border border-amber-600/40 hover:border-amber-600/80
                   shadow-sm hover:shadow-md
                   transition-all duration-200 hover:-translate-y-0.5
                   font-masonic text-[4px] sm:text-[6px] tracking-wider"
                    >
                      {/* Skill text */}
                      <span className="text-amber-900 dark:text-amber-950 font-semibold">
                        {skill}
                      </span>

                      {/* Hover glow effect */}
                      <span
                        className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 
                         bg-amber-400/20 blur-sm transition-opacity duration-300 pointer-events-none"
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-0.5 text-[3px] sm:text-[6px] text-amber-700/20 mt-2 sm:mt-4 justify-center">
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
