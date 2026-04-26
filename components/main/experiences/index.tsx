"use client";

import { useState } from "react";
import Icon from "@/components/icons";
import { experiences } from "./data";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col justify-center h-full w-full p-1 sm:p-6">
      <p className="font-masonic text-[5px] sm:text-sm text-stone-600 text-center">
        ✧ THE JOURNEY ✧
      </p>
      
      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-4 mx-auto"></div>
      
      <div className="space-y-1 sm:space-y-2 my-0.5 sm:my-2">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="bg-amber-100/60 rounded border border-amber-700/30 overflow-hidden"
            onMouseEnter={() => setExpandedId(i)}
            onMouseLeave={() => setExpandedId(null)}
          >
            {/* Header - Always visible */}
            <div className="p-[2px] sm:p-2">
              <div className="flex justify-between items-center flex-wrap gap-0.5">
                <h3 className="font-masonic text-amber-800 text-[4px] sm:text-[8px] md:text-xs font-bold tracking-wider">
                  {exp.title}
                </h3>
                <span className="font-masonic text-stone-500 text-[3px] sm:text-[5px] md:text-xs bg-amber-200/50 px-0.5 sm:px-1.5 py-0.5 rounded">
                  {exp.period}
                </span>
              </div>
              <p className="font-masonic text-amber-700 text-[3px] sm:text-[5px] md:text-xs mt-0.5">
                {exp.role}
              </p>
            </div>

            {/* Expanded content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedId === i ? "max-h-48 sm:max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-1 sm:p-2 pt-0 border-t border-amber-700/20 space-y-0.5 sm:space-y-1.5">
                {exp.location && (
                  <p className="font-masonic text-stone-500 text-[5px] sm:text-[8px] flex items-center gap-0.5">
                    <Icon name="map" className="w-1.5 h-1.5 sm:w-2 sm:h-2" /> {exp.location}
                  </p>
                )}

                <p className="font-masonic text-stone-600 text-[5px] sm:text-[8px] leading-tight">
                  {exp.description.substring(0, 100)}...
                </p>

                {exp.projects && exp.projects.length > 0 && (
                  <div>
                    <p className="font-masonic text-amber-700 text-[5px] sm:text-[7px] tracking-wider">
                      Quests:
                    </p>
                    <div className="flex flex-wrap gap-0.5 mt-0.5">
                      {exp.projects.slice(0, 2).map((project, idx) => (
                        <span
                          key={idx}
                          className="font-masonic text-stone-500 text-[4px] sm:text-[7px] border border-amber-700/30 px-0.5 sm:px-1 rounded-full bg-amber-100/50"
                        >
                          {project}
                        </span>
                      ))}
                      {exp.projects.length > 2 && (
                        <span className="font-masonic text-amber-600 text-[4px] sm:text-[7px]">
                          +{exp.projects.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-0.5">
                    {exp.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="font-masonic text-amber-600/50 text-[4px] sm:text-[6px] tracking-wider">
                        ✦ {skill}
                      </span>
                    ))}
                    {exp.skills.length > 3 && (
                      <span className="font-masonic text-amber-600/50 text-[4px] sm:text-[6px]">
                        +{exp.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-0.5 text-[3px] sm:text-[6px] text-amber-700/20 mt-1 sm:mt-4 justify-center">
        <span>ᚠ</span><span>ᚢ</span><span>ᚦ</span><span>ᚨ</span><span>ᚱ</span><span>ᚷ</span>
      </div>
    </div>
  );
}