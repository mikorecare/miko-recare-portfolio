"use client";

import { useState } from "react";
import { certifications } from "./data";
import CertificationCard from "./certification-card";

export const Certifications = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Show only first 3 on mobile, first 5 on tablet, all on desktop
  const getVisibleCerts = () => {
    if (showAll) return certifications;
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return certifications.slice(0, 3);
      if (window.innerWidth < 768) return certifications.slice(0, 5);
    }
    return certifications;
  };

  const visibleCerts = getVisibleCerts();
  const hasMore = certifications.length > visibleCerts.length;

  return (
    <div className="flex flex-col justify-center h-full w-full p-1 sm:p-6">
      <p className="font-masonic text-[5px] sm:text-sm text-stone-600 text-center">
        ✧ SACRED SCROLLS ✧
      </p>
      
      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-4 mx-auto"></div>
      
      <div className="space-y-1 sm:space-y-2 my-0.5 sm:my-2">
        {visibleCerts.map((cert, index) => (
          <CertificationCard
            key={index}
            cert={cert}
            index={index}
            isHovered={hoveredId === index}
            onHover={() => setHoveredId(index)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>

      {/* Show More / Show Less button */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="font-masonic text-[5px] sm:text-[8px] text-amber-700 hover:text-amber-800 mt-1 sm:mt-2 underline"
        >
          {showAll ? "− Show less" : `+ Show ${certifications.length - visibleCerts.length} more`}
        </button>
      )}
      
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