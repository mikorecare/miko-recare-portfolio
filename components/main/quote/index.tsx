"use client";

export default function Quote() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-full w-full p-1 sm:p-6">
      <div className="mb-0.5 sm:mb-4">
        <div className="inline-flex items-center gap-0.5 sm:gap-2">
          <div className="w-3 sm:w-12 h-px bg-amber-700/40"></div>
          <span className="text-amber-700/40 text-[4px] sm:text-xs">✧</span>
          <div className="w-3 sm:w-12 h-px bg-amber-700/40"></div>
        </div>
      </div>

      <div className="mb-0.5 sm:mb-3">
        <span className="font-serif text-lg sm:text-7xl text-amber-800/40 font-bold">
          ❝
        </span>
      </div>

      <p className="font-masonic text-stone-700 italic text-center text-[6px] sm:text-base leading-tight sm:leading-relaxed max-w-[120px] sm:max-w-sm">
        The journey of a thousand miles begins with a single step
      </p>

      <div className="w-4 sm:w-16 h-px bg-amber-700/30 my-0.5 sm:my-4"></div>

      <p className="font-masonic text-amber-700/60 text-[5px] sm:text-xs tracking-wider">
        — Ancient Coding Proverb —
      </p>

      <div className="mt-0.5 sm:mt-4">
        <div className="inline-flex items-center gap-0.5 sm:gap-2">
          <div className="w-2 sm:w-8 h-px bg-amber-700/30"></div>
          <span className="text-amber-700/30 text-[4px] sm:text-[8px]">
            ✦ ᛟ ✦
          </span>
          <div className="w-2 sm:w-8 h-px bg-amber-700/30"></div>
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
}
