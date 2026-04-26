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
          <div key={section.title} className="flex flex-col sm:flex-row items-start gap-0.5 sm:gap-3">
            {/* Left - Label */}
            <div className="flex items-center gap-0.5 sm:w-24 sm:flex-shrink-0">
              <Icon name={section.icon} className="w-1.5 h-1.5 sm:w-3 sm:h-3 text-amber-700" />
              <span className="font-masonic text-amber-800 text-[4px] sm:text-[10px] font-bold tracking-wide">
                {section.title}
              </span>
            </div>

            {/* Right - Stacks */}
            <div className="flex-1 flex flex-wrap gap-0.5 sm:gap-1.5">
              {section.items.map((item) => (
                <span
                  key={item}
                  className="font-masonic text-amber-900 text-[3px] sm:text-[6px] md:text-xs"
                >
                  {item}
                  <span className="sm:hidden">,</span>
                </span>
              ))}
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