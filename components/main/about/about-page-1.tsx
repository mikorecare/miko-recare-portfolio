"use client";

import Icon from "@/components/icons";
import { location, bio } from "./data";

export default function AboutPage1() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-full w-full p-2 sm:p-6">
      <p className="font-masonic text-[7px] sm:text-sm text-stone-600 italic">
        ✧ The Scribe's Tale ✧
      </p>
      
      <div className="w-8 sm:w-24 h-px bg-amber-700/30 my-1 sm:my-4"></div>
      
      <div className="space-y-1 sm:space-y-3 my-1 sm:my-2">
        {bio.map((paragraph, idx) => (
          <p
            key={idx}
            className="font-masonic text-stone-700 leading-tight text-[6px] sm:text-xs italic"
          >
            {paragraph}
          </p>
        ))}
      </div>
      
      {location && (
        <>
          <div className="w-8 sm:w-24 h-px bg-amber-700/30 my-1 sm:my-4"></div>
          <p className="font-masonic text-amber-700 text-[6px] sm:text-xs flex items-center justify-center gap-1">
            <Icon name="map" className="w-1.5 h-1.5 sm:w-3 sm:h-3" />
            <span>{location}</span>
          </p>
        </>
      )}
      
      <div className="flex gap-0.5 text-[4px] sm:text-[6px] text-amber-700/20 mt-1 sm:mt-4">
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