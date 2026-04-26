"use client";

import Image from "next/image";

export default function InsideCover() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-full w-full p-2 sm:p-6">
      <p className="font-masonic text-[8px] sm:text-sm text-stone-600 italic">
        "This Codex belongs to"
      </p>
      
      <div className="w-12 sm:w-24 h-12 sm:h-24 border border-amber-700/30 sm:border-2 rounded-full flex items-center justify-center my-1 sm:my-4 overflow-hidden shadow-sm sm:shadow-md">
        <Image
          src="/me.png"
          alt="Miko Recare"
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
      
      <p className="font-masonic text-xs sm:text-xl text-stone-800 font-bold">
        Miko Recare
      </p>
      
      <div className="w-8 sm:w-16 h-px bg-amber-700/30 my-1 sm:my-2"></div>
      
      <p className="font-masonic text-[7px] sm:text-xs text-stone-600 leading-tight sm:leading-normal max-w-[150px] sm:max-w-none">
        Digital Artisan <span className="text-amber-700/40">✦</span> Code Weaver <span className="text-amber-700/40">✦</span> AI Sage
      </p>
      
      <p className="font-masonic text-[7px] sm:text-sm text-amber-700/50 italic mt-1 sm:mt-4">
        Ex Libris
      </p>
      
      <div className="flex gap-0.5 sm:gap-1 text-[5px] sm:text-[8px] text-amber-700/20 mt-1 sm:mt-2">
        <span>ᚠ</span>
        <span>ᚢ</span>
        <span>ᚦ</span>
        <span className="hidden sm:inline">✦</span>
        <span>ᚨ</span>
        <span>ᚱ</span>
        <span>ᚷ</span>
      </div>
    </div>
  );
}