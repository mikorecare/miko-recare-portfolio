"use client";

import Icon from "@/components/icons";

export default function Cover() {
  return (
    <div className="relative flex flex-col justify-center items-center text-center h-full w-full bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 p-2 sm:p-6 md:p-8 shadow-inner overflow-hidden">
      {/* Aged/worn effect around edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)`,
        }}
      />

      {/* Outer embossed edge */}
      <div className="absolute rounded-xl inset-0.5 sm:inset-2 border border-amber-600/20 sm:border-2 shadow-inner pointer-events-none"></div>
      
      {/* Inner decorative border */}
      <div className="absolute inset-1 sm:inset-3 md:inset-5 border border-amber-500/20 sm:border shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] md:shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] pointer-events-none"></div>
      
      {/* Deep inner shadow overlay */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] md:shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] pointer-events-none"></div>

      {/* Corner decorations */}
      <div className="absolute top-0.5 sm:top-2 md:top-6 left-0.5 sm:left-2 md:left-6 w-2 sm:w-4 md:w-10 h-2 sm:h-4 md:h-10 border-t border-l sm:border-t-2 sm:border-l-2 md:border-t-2 md:border-l-2 border-amber-500/50 rounded-tl-sm md:rounded-tl-lg shadow-sm md:shadow-md"></div>
      <div className="absolute top-0.5 sm:top-2 md:top-6 right-0.5 sm:right-2 md:right-6 w-2 sm:w-4 md:w-10 h-2 sm:h-4 md:h-10 border-t border-r sm:border-t-2 sm:border-r-2 md:border-t-2 md:border-r-2 border-amber-500/50 rounded-tr-sm md:rounded-tr-lg shadow-sm md:shadow-md"></div>
      <div className="absolute bottom-0.5 sm:bottom-2 md:bottom-6 left-0.5 sm:left-2 md:left-6 w-2 sm:w-4 md:w-10 h-2 sm:h-4 md:h-10 border-b border-l sm:border-b-2 sm:border-l-2 md:border-b-2 md:border-l-2 border-amber-500/50 rounded-bl-sm md:rounded-bl-lg shadow-sm md:shadow-md"></div>
      <div className="absolute bottom-0.5 sm:bottom-2 md:bottom-6 right-0.5 sm:right-2 md:right-6 w-2 sm:w-4 md:w-10 h-2 sm:h-4 md:h-10 border-b border-r sm:border-b-2 sm:border-r-2 md:border-b-2 md:border-r-2 border-amber-500/50 rounded-br-sm md:rounded-br-lg shadow-sm md:shadow-md"></div>

      {/* Subtle radial glow behind crown */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-20 sm:w-32 md:w-56 h-20 sm:h-32 md:h-56 bg-amber-500/5 md:bg-amber-500/8 rounded-full blur-xl md:blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <div className="w-10 sm:w-16 md:w-28 h-10 sm:h-16 md:h-28 mx-auto border border-amber-400 sm:border-2 rounded-full flex items-center justify-center bg-amber-900/40 shadow-md md:shadow-lg ring-1 ring-amber-400/20 md:ring-amber-400/30 backdrop-blur-sm">
          <Icon name="crown" className="w-5 sm:w-8 md:w-14 h-5 sm:h-8 md:h-14 text-amber-400 drop-shadow-sm md:drop-shadow-md" />
        </div>

        <h1 className="font-masonic text-sm sm:text-2xl md:text-5xl mt-2 sm:mt-4 md:mt-8 mb-1 sm:mb-2 md:mb-3 tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #f0e6d2 0%, #e8c97a 30%, #d4a04a 50%, #e8c97a 70%, #f0e6d2 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 1px 1px rgba(0,0,0,0.3)',
            }}>
          THE CODEX
        </h1>

        <div className="w-10 sm:w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent mx-auto my-1 sm:my-3 md:my-5"></div>

        <p className="font-masonic text-[6px] sm:text-base md:text-xl mb-1 sm:mb-2 md:mb-3 tracking-wide"
           style={{
             background: 'linear-gradient(135deg, #e8c97a 0%, #c9aa5a 50%, #e8c97a 100%)',
             WebkitBackgroundClip: 'text',
             backgroundClip: 'text',
             color: 'transparent',
             textShadow: '0 0.5px 0.5px rgba(0,0,0,0.3)',
           }}>
          MIKO RECARE'S PORTFOLIO
        </p>

        <p className="font-masonic text-[5px] sm:text-[10px] md:text-sm text-amber-500/70 mt-1 sm:mt-3 md:mt-8">
          A CHRONICLE OF DIGITAL ARTISTRY
        </p>

        <div className="flex justify-center gap-0.5 sm:gap-2 md:gap-3 text-[4px] sm:text-[8px] md:text-xs text-amber-500/40 mt-1 sm:mt-3 md:mt-5">
          <span>ᚠ</span>
          <span>ᚢ</span>
          <span>ᚦ</span>
          <span className="text-amber-500/60">✦</span>
          <span>ᚨ</span>
          <span>ᚱ</span>
          <span>ᚷ</span>
        </div>

        <p className="font-masonic text-[3px] sm:text-[8px] md:text-sm text-amber-500/50 mt-1 sm:mt-2 md:mt-5">MMXXVI</p>
      </div>
      
      {/* Spine shadow effect */}
      <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-3 md:w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none rounded-l-xl"></div>
    </div>
  );
}