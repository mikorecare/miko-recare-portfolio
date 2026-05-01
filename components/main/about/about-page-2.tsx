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
    <div className="flex flex-col justify-start h-full w-full p-1 sm:p-4">
      <p className="font-masonic text-[4px] md:text-sm text-stone-600 text-center">
        ✧ THE ARSENAL ✧
      </p>

      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-4 mx-auto"></div>

      <div className="space-y-2 sm:space-y-3 my-0.5 sm:my-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-amber-100/60 rounded border border-amber-700/30 overflow-hidden"
          >
            {/* Header */}
            <div className="p-1 md:p-2 bg-amber-200/30 border-b border-amber-700/20">
              <div className="flex items-center gap-0.5 sm:gap-2">
                <Icon
                  name={section.icon}
                  className="w-2 h-2 sm:w-3 sm:h-3 text-amber-700"
                />
                <span className="font-masonic text-amber-800 text-[4px] sm:text-[4px] md:text-xs font-bold tracking-wider">
                  {section.title}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-1 md:p-2">
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {section.items.map((item, idx) => (
                  <span
                    key={item}
                    className="group relative inline-flex items-center gap-0.5 sm:gap-1
                      px-0.5 py-0.5 md:px-1 md:py-1 rounded-md
                      bg-gradient-to-br from-amber-100 to-amber-50
                      dark:from-amber-200/80 dark:to-amber-100/60
                      border border-amber-600/40 hover:border-amber-600/80
                      shadow-sm hover:shadow-md
                      transition-all duration-200 hover:-translate-y-0.5
                      font-poppins text-[5px] md:text-[9px] tracking-wider"
                  >
                    <span className="text-amber-900 dark:text-amber-950 font-semibold">
                      {item}
                    </span>
                    {idx < section.items.length - 1 && (
                      <span className="sm:hidden text-amber-700/50">,</span>
                    )}

                    {/* Hover glow effect */}
                    <span
                      className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 
                        bg-amber-400/20 blur-sm transition-opacity duration-300 pointer-events-none"
                    />
                  </span>
                ))}
              </div>
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
