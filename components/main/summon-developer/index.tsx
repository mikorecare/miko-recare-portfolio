"use client";

export default function SummonDeveloper() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-full w-full p-1 sm:p-4">
      <div className="mb-0.5 sm:mb-3">
        <div className="inline-flex items-center gap-0.5 sm:gap-2">
          <div className="w-3 sm:w-8 h-px bg-amber-700/40"></div>
          <span className="text-amber-700/40 text-[4px] sm:text-[10px]">✧</span>
          <div className="w-3 sm:w-8 h-px bg-amber-700/40"></div>
        </div>
      </div>

      <h2 className="font-masonic text-[6px] sm:text-xl text-amber-800 tracking-wider mb-0.5 sm:mb-2">
        ✧ SUMMON THE DEVELOPER ✧
      </h2>

      <div className="w-4 sm:w-16 h-px bg-amber-700/30 mx-auto my-0.5 sm:mb-4"></div>

      <p className="font-masonic text-stone-600 text-[5px] sm:text-xs mb-2 sm:mb-6 max-w-[100px] sm:max-w-xs text-center">
        Ready to embark on a quest? Let's forge something legendary together.
      </p>

      <div className="flex flex-wrap justify-center gap-1 sm:gap-3 mb-2 sm:mb-6">
        <a
          href="mailto:miko.recare@example.com"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="px-1.5 sm:px-4 py-0.5 sm:py-2 border border-amber-700/50 rounded text-amber-700 text-[5px] sm:text-[10px] font-masonic tracking-wider hover:bg-amber-700/10 transition-colors"
        >
          Send Raven
        </a>
        <a
          href="https://github.com/mikorecare"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="px-1.5 sm:px-4 py-0.5 sm:py-2 border border-amber-700/50 rounded text-amber-700 text-[5px] sm:text-[10px] font-masonic tracking-wider hover:bg-amber-700/10 transition-colors"
        >
          GitHub Forge
        </a>
        <a
          href="https://www.linkedin.com/in/miko-recare/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="px-1.5 sm:px-4 py-0.5 sm:py-2 border border-amber-700/50 rounded text-amber-700 text-[5px] sm:text-[10px] font-masonic tracking-wider hover:bg-amber-700/10 transition-colors"
        >
          LinkedIn Hall
        </a>
      </div>

      <p className="font-masonic text-stone-400 text-[4px] sm:text-[7px]">
        © MMXXVI Miko Recare - All Rights Reserved
      </p>

      <div className="flex gap-0.5 text-[3px] sm:text-[6px] text-amber-700/20 mt-1 sm:mt-4 justify-center">
        <span>ᚠ</span>
        <span>ᚢ</span>
        <span>ᚦ</span>
        <span>✦</span>
        <span>ᚨ</span>
        <span>ᚱ</span>
        <span>ᚷ</span>
      </div>
    </div>
  );
}
