"use client";

import Icon from "@/components/icons";
import {
  mainStacks,
  cloudAndDevOps,
  stylingAndDesign,
  softSkills,
} from "./data";

export default function AboutPage2() {
  const sections = [
    {
      title: "PRIMARY",
      icon: "sword" as const,
      items: mainStacks,
    },
    {
      title: "CLOUD",
      icon: "tower" as const,
      items: cloudAndDevOps,
    },
    {
      title: "DESIGN",
      icon: "axe" as const,
      items: stylingAndDesign,
    },
    {
      title: "VIRTUES",
      icon: "shield" as const,
      items: softSkills,
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full w-full p-1 sm:p-6">
      <p className="font-masonic text-[5px] sm:text-sm text-stone-600 text-center">
        ✧ THE ARSENAL ✧
      </p>

      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-4 mx-auto"></div>

      <div className="space-y-1 sm:space-y-3 my-0.5 sm:my-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="relative rounded-md bg-gradient-to-br from-amber-100/80 via-amber-50/60 to-stone-100/80 
                       dark:from-amber-900/30 dark:via-stone-800/40 dark:to-stone-900/30
                       border-l-2 border-amber-700/40 shadow-sm
                       hover:shadow-md hover:border-amber-600/60 transition-all duration-300"
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700/5 via-transparent to-amber-700/5 rounded-md pointer-events-none" />

            {/* Content */}
            <div className="flex flex-col sm:flex-row items-start gap-0.5 sm:gap-3 p-1 sm:p-2">
              {/* Left - Label */}
              <div className="flex items-center gap-0.5 sm:w-24 sm:flex-shrink-0">
                <Icon
                  name={section.icon}
                  className="w-1.5 h-1.5 sm:w-3 sm:h-3 text-amber-700"
                />
                <span className="font-masonic text-amber-800 text-[4px] sm:text-[10px] font-bold tracking-wide">
                  {section.title}
                </span>
              </div>

              {/* Right - Stacks */}
              {/* Right - Stacks */}
              <div className="flex-1 flex flex-wrap gap-0.5 sm:gap-1">
                {section.items.map((item, idx) => (
                  <span
                    key={item}
                    className="group/item relative font-masonic text-amber-900 text-[3px] sm:text-[6px] md:text-[7px]
                 bg-amber-100/50 dark:bg-amber-900/30 px-0.5 sm:px-1.5 py-0.5 rounded-sm
                 hover:bg-amber-200/70 dark:hover:bg-amber-800/50 transition-all duration-200
                 border border-amber-700/20 hover:border-amber-700/50"
                  >
                    {item}
                    {idx < section.items.length - 1 && (
                      <span className="sm:hidden">,</span>
                    )}
                  </span>
                ))}
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
