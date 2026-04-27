"use client";

export default function ControlsBar() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-amber-600/50 shadow-lg">
      <div className="flex items-center gap-3 text-amber-400 text-xs font-masonic">
        <span className="text-amber-300">⚔️</span>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-black/80 border border-amber-600 rounded text-amber-300 text-[10px] font-masonic">
            WASD
          </kbd>
          <span className="text-amber-400/70 text-[10px]">Move</span>
        </div>
        <span className="text-amber-600">|</span>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-black/80 border border-amber-600 rounded text-amber-300 text-[10px] font-masonic">
            Mouse
          </kbd>
          <span className="text-amber-400/70 text-[10px]">Look</span>
        </div>
        <span className="text-amber-600">|</span>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-black/80 border border-amber-600 rounded text-amber-300 text-[10px] font-masonic">
            F/E/R/T/G/C
          </kbd>
          <span className="text-amber-400/70 text-[10px]">Interact</span>
        </div>
        <span className="text-amber-600">|</span>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-black/80 border border-amber-600 rounded text-amber-300 text-[10px] font-masonic">
            V
          </kbd>
          <span className="text-amber-400/70 text-[10px]">Free Cam</span>
        </div>
        <span className="text-amber-300">⚔️</span>
      </div>
    </div>
  );
}
