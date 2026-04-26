"use client";

import Icon from "@/components/icons";

export default function BackCover() {
  return (
    <div className="relative flex flex-col justify-center items-center text-center h-full w-full bg-gradient-to-br from-amber-950 via-amber-900 to-stone-950 p-2 sm:p-8 shadow-inner overflow-hidden">
      {/* Outer embossed edge - scaled for mobile */}
      <div className="absolute inset-1 sm:inset-2 border border-amber-600/20 sm:border-2 rounded-sm shadow-inner pointer-events-none"></div>

      {/* Inner decorative border - hidden on mobile */}
      <div className="absolute inset-2 sm:inset-5 border border-amber-500/30 rounded-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] pointer-events-none hidden sm:block"></div>

      {/* Deep inner shadow overlay */}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] sm:shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] pointer-events-none"></div>

      {/* Corner ornaments - smaller on mobile */}
      <div className="absolute top-2 sm:top-6 left-2 sm:left-6 w-3 sm:w-8 h-3 sm:h-8 border-t border-l sm:border-t-2 sm:border-l-2 border-amber-500/40 rounded-tl-md sm:rounded-tl-lg shadow-sm sm:shadow-md"></div>
      <div className="absolute top-2 sm:top-6 right-2 sm:right-6 w-3 sm:w-8 h-3 sm:h-8 border-t border-r sm:border-t-2 sm:border-r-2 border-amber-500/40 rounded-tr-md sm:rounded-tr-lg shadow-sm sm:shadow-md"></div>
      <div className="absolute bottom-2 sm:bottom-6 left-2 sm:left-6 w-3 sm:w-8 h-3 sm:h-8 border-b border-l sm:border-b-2 sm:border-l-2 border-amber-500/40 rounded-bl-md sm:rounded-bl-lg shadow-sm sm:shadow-md"></div>
      <div className="absolute bottom-2 sm:bottom-6 right-2 sm:right-6 w-3 sm:w-8 h-3 sm:h-8 border-b border-r sm:border-b-2 sm:border-r-2 border-amber-500/40 rounded-br-md sm:rounded-br-lg shadow-sm sm:shadow-md"></div>

      {/* Subtle radial glow behind crown - smaller on mobile */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-20 sm:w-40 h-20 sm:h-40 bg-amber-500/5 rounded-full blur-xl sm:blur-2xl"></div>
      </div>

      <Icon
        name="crown"
        className="w-8 sm:w-16 h-8 sm:h-16 text-amber-500/40 mb-2 sm:mb-6 drop-shadow-sm sm:drop-shadow-lg relative z-10"
      />

      <p className="font-masonic text-xl sm:text-4xl text-amber-500/40 italic mb-1 sm:mb-4 tracking-wider drop-shadow-sm sm:drop-shadow-md relative z-10">
        Finis
      </p>

      <div className="w-12 sm:w-24 h-px bg-amber-500/20 my-1 sm:my-4 relative z-10"></div>

      <p className="font-masonic text-[6px] sm:text-sm text-amber-500/30 max-w-[120px] sm:max-w-xs leading-relaxed relative z-10">
        Return to the beginning to reread the ancient texts
      </p>

      {/* Bottom rune decoration - smaller on mobile */}
      <div className="absolute bottom-2 sm:bottom-8 left-0 right-0 flex justify-center gap-1 sm:gap-2 text-amber-500/20 text-[5px] sm:text-xs relative z-10">
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