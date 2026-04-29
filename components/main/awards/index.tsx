"use client";

import { useState } from "react";
import Icon from "@/components/icons";
import { awards } from "./data";

export const Awards = () => {
  const [isHovered, setIsHovered] = useState(false);
  const award = awards[0];

  return (
    <div className="flex flex-col justify-center h-full w-full p-1 sm:p-6">
      <p className="font-masonic text-[5px] sm:text-sm text-stone-600 text-center">
        ✧ HALL OF CHAMPIONS ✧
      </p>
      
      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-4 mx-auto"></div>
      
      {/* Award Card */}
      <div className="bg-amber-100/60 border border-amber-700/30 rounded overflow-hidden my-0.5 sm:my-2">
        {/* Certificate Image */}
        <div className="relative bg-amber-900/20 p-2 sm:p-6 flex justify-center border-b border-amber-700/30">
          <div className="relative w-full max-w-[150px] sm:max-w-md">
            <div className="absolute -inset-2 sm:-inset-4 bg-amber-500/10 rounded-xl sm:rounded-2xl blur-xl"></div>
            <div className="relative transform transition-transform duration-300 hover:scale-105">
              <img
                src={award.certificateImage}
                alt={award.title}
                className="w-full rounded shadow-lg border border-amber-500/30"
              />
              {/* Year badge */}
              <div className="absolute -top-1 -right-1 sm:-top-3 sm:-right-3">
                <div className="bg-amber-600 text-amber-100 text-[4px] sm:text-[8px] md:text-xs font-masonic font-bold px-1 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
                  {award.year}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Award Details */}
        <div className="p-1.5 sm:p-4 space-y-1 sm:space-y-3">
          <h3 className="font-masonic text-[4px] sm:text-[8px] md:text-xs text-amber-800 font-bold tracking-wider text-center">
            {award.title}
          </h3>

          <div className="flex items-center justify-center gap-1 sm:gap-3 text-[4px] sm:text-[6px] md:text-[8px] text-amber-700">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Icon name="quill" className="w-1.5 h-1.5 sm:w-3 sm:h-3" />
              <span className="font-masonic">{award.organization}</span>
            </div>
            <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-amber-700/30 rounded-full"></div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Icon name="helmet" className="w-1.5 h-1.5 sm:w-3 sm:h-3" />
              <span className="font-masonic">{award.role}</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-masonic text-stone-700 text-[4px] sm:text-[6px] md:text-[7px] leading-tight sm:leading-relaxed text-center">
            {award.description.length > 100 ? award.description.substring(0, 100) + "..." : award.description}
          </p>

          {/* View Certificate Button */}
          {award.certificateUrl && (
            <div className="flex justify-center pt-0.5">
              <a
                href={award.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-0.5 sm:gap-2 px-1.5 sm:px-2 md:px-2 py-0.5 sm:py-1 bg-amber-200/50 border border-amber-700/40 rounded hover:bg-amber-200/70 transition-colors"
              >
                <Icon name="scroll" className="w-1.5 h-1.5 sm:w-3 sm:h-3 text-amber-700" />
                <span className="font-masonic text-amber-800 text-[5px] sm:text-[10px] tracking-wider">
                  View Certificate
                </span>
              </a>
            </div>
          )}
        </div>
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
};