"use client";

export default function TableOfContents() {
  const items = [
    { page: "i", title: "TABLE OF CONTENTS", folio: "folio i" },
    { page: "1", title: "THE KING (HERO SECTION)", folio: "folio 1" },
    { page: "2", title: "THE SCRIBE'S TALE (ABOUT 1)", folio: "folio 2" },
    { page: "3", title: "THE ARSENAL (ABOUT 2)", folio: "folio 3" },
    { page: "4a-4e", title: "THE JOURNEY (EXPERIENCE)", folio: "folio 4a-4e" },
    { page: "5", title: "ANCIENT CODING PROVERB", folio: "folio 5" },
    {
      page: "6a-6k",
      title: "LEGENDARY QUESTS (PROJECTS)",
      folio: "folio 6a-6k",
    },
    { page: "7a-7c", title: "SACRED SCROLLS OF MASTERY", folio: "folio 7a-7c" },
    { page: "8", title: "HALL OF CHAMPIONS (AWARDS)", folio: "folio 8" },
    { page: "9", title: "SUMMON THE DEVELOPER", folio: "folio 9" },
    { page: "-", title: "BACK COVER", folio: "back cover" },
  ];

  return (
    <div className="flex flex-col justify-center h-full w-full p-2 sm:p-6">
      <p className="font-masonic text-[8px] sm:text-sm text-stone-600 italic text-center">
        ✧ TABLE OF CONTENTS ✧
      </p>

      <div className="w-12 sm:w-24 h-px bg-amber-700/30 my-1 sm:my-4 mx-auto"></div>

      <div className="space-y-0.5 sm:space-y-1 my-1 sm:my-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 sm:gap-2 text-[7px] sm:text-xs text-stone-700"
          >
            <span className="text-amber-700 w-10 sm:w-14 text-[7px] sm:text-xs font-bold text-right">
              {item.page}
            </span>
            <span className="flex-1 text-left font-masonic tracking-wide">
              {item.title}
            </span>
            <span className="text-amber-700/40 text-[5px] sm:text-[7px] font-masonic">
              {item.folio}
            </span>
          </div>
        ))}
      </div>

      <div className="w-12 sm:w-24 h-px bg-amber-700/30 my-1 sm:my-4 mx-auto"></div>

      <div className="flex gap-0.5 sm:gap-1 text-[5px] sm:text-[8px] text-amber-700/20 mt-1 sm:mt-2 justify-center">
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
