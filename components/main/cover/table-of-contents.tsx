"use client";

export default function TableOfContents() {
  const items = [
    "THE KING",
    "THE SCRIBE'S TALE",
    "THE ARSENAL",
    "THE JOURNEY",
    "ANCIENT CODING PROVERB",
    "LEGENDARY QUESTS",
    "SACRED SCROLLS OF MASTERY",
    "HALL OF CHAMPIONS",
    "SUMMON THE DEVELOPER",
    "BACK COVER",
  ];

  return (
    <div className="flex flex-col justify-center items-center text-center h-full w-full p-2 sm:p-6">
      <p className="font-masonic text-[8px] sm:text-sm text-stone-600 italic">
        ✧ TABLE OF CONTENTS ✧
      </p>
      
      <div className="w-12 sm:w-24 h-px bg-amber-700/30 my-1 sm:my-4"></div>
      
      <div className="space-y-0.5 sm:space-y-1 my-1 sm:my-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1 sm:gap-2 text-[7px] sm:text-xs text-stone-700">
            <span className="text-amber-700 w-4 sm:w-5 text-[7px] sm:text-xs font-bold">
              {(idx + 1).toString().padStart(2, "0")}
            </span>
            <span className="flex-1 text-left">{item}</span>
            <span className="text-amber-700/30 text-[5px] sm:text-[7px]">✦</span>
          </div>
        ))}
      </div>
      
      <div className="w-12 sm:w-24 h-px bg-amber-700/30 my-1 sm:my-4"></div>
      
      <p className="font-masonic text-[6px] sm:text-sm text-amber-600/50">
        folio i
      </p>
      
      <div className="flex gap-0.5 sm:gap-1 text-[5px] sm:text-[8px] text-amber-700/20 mt-1 sm:mt-2">
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