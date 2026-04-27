"use client";

import Image from "next/image";

export default function MedievalSidebar() {
  return (
    <div className="absolute right-0 top-0 w-[20%] h-full bg-gradient-to-b from-amber-950/95 via-amber-900/95 to-stone-900/95 backdrop-blur-sm border-l-4 border-amber-600 shadow-2xl overflow-y-auto">
      {/* Decorative top border */}
      <div className="relative pt-6 pb-2">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <div className="text-center">
          <h1 className="font-masonic text-amber-400 text-3xl tracking-wider drop-shadow-lg">
            Greetings,
          </h1>
          <h2 className="font-masonic text-amber-300 text-2xl tracking-wide mt-1">
            Brave Adventurer!
          </h2>
        </div>
        <div className="mt-3 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>
      </div>

      {/* Decorative divider with crossed swords */}
      <div className="flex justify-center my-4">
        <div className="relative w-12 h-12">
          <Image
            src="/icons/cross-swords.png"
            alt="Crossed Swords"
            width={48}
            height={48}
            className="opacity-80"
          />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="px-4 py-2">
        <p className="font-serif text-amber-200/90 text-sm leading-relaxed text-center italic">
          "Hark, traveler! Thou hast entered mine realm of code and courage."
        </p>
      </div>

      {/* Decorative divider */}
      <div className="flex justify-center my-3">
        <div className="w-24 h-px bg-amber-500/50" />
      </div>

      {/* Mystical Portals */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="relative w-6 h-6">
            <Image
              src="/icons/crystal.png"
              alt="Crystal"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
          <h3 className="font-masonic text-amber-400 text-sm tracking-wider">
            The Twin Portals
          </h3>
          <div className="relative w-6 h-6">
            <Image
              src="/icons/crystal.png"
              alt="Crystal"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
        </div>
        <p className="font-serif text-amber-200/80 text-xs leading-relaxed text-center">
          Behind thy very starting point stand two ancient portals, shimmering
          with otherworldly energies. Each leads to a different realm beyond
          these lands.
        </p>
      </div>

      {/* Portal Details */}
      <div className="px-4 py-2 space-y-3">
        {/* Start Portal */}
        <div className="bg-black/30 rounded-lg p-2 border border-green-500/30">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="relative w-5 h-5">
              <Image
                src="/icons/castle.png"
                alt="Castle"
                width={20}
                height={20}
                className="opacity-80"
              />
            </div>
            <span className="font-masonic text-green-400 text-xs tracking-wider">
              The Emerald Gate
            </span>
            <div className="relative w-5 h-5">
              <Image
                src="/icons/helmet.png"
                alt="Helmet"
                width={20}
                height={20}
                className="opacity-80"
              />
            </div>
          </div>
          <p className="font-serif text-green-300/70 text-[10px] text-center">
            Returneth to the Keep — thy journey's beginning
          </p>
        </div>

        {/* End Portal */}
        <div className="bg-black/30 rounded-lg p-2 border border-orange-500/30">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="relative w-5 h-5">
              <Image
                src="/icons/tower.png"
                alt="Tower"
                width={20}
                height={20}
                className="opacity-80"
              />
            </div>
            <span className="font-masonic text-orange-400 text-xs tracking-wider">
              The Golden Gate
            </span>
            <div className="relative w-5 h-5">
              <Image
                src="/icons/blacksmith.png"
                alt="Blacksmith"
                width={20}
                height={20}
                className="opacity-80"
              />
            </div>
          </div>
          <p className="font-serif text-orange-300/70 text-[10px] text-center">
            Venture forth to the Medieval Village — a new quest awaits
          </p>
        </div>
      </div>

      <p className="font-serif text-amber-200/60 text-[10px] text-center px-4 italic">
        Step close to a portal and press any action key to journey forth
      </p>

      {/* Decorative divider */}
      <div className="flex justify-center my-3">
        <div className="w-24 h-px bg-amber-500/50" />
      </div>

      {/* About the Friends */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="relative w-6 h-6">
            <Image
              src="/icons/crystal.png"
              alt="Crystal"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
          <h3 className="font-masonic text-amber-400 text-sm tracking-wider">
            Mine Companions
          </h3>
          <div className="relative w-6 h-6">
            <Image
              src="/icons/scroll.png"
              alt="Scroll"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
        </div>
        <p className="font-serif text-amber-200/80 text-xs leading-relaxed text-center">
          The creatures thou seest wandering these lands are not mere monsters,
          but my trusted companions! They are playful and may jest with thee.
          Speak with them, and they shall reveal tales of my journey through the
          realms of code.
        </p>
      </div>

      {/* Decorative divider */}
      <div className="flex justify-center my-3">
        <div className="w-24 h-px bg-amber-500/50" />
      </div>

      {/* Sacred Signs */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="relative w-6 h-6">
            <Image
              src="/icons/book.png"
              alt="Book"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
          <h3 className="font-masonic text-amber-400 text-sm tracking-wider">
            Sacred Signs
          </h3>
          <div className="relative w-6 h-6">
            <Image
              src="/icons/quill.png"
              alt="Quill"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
        </div>
        <p className="font-serif text-amber-200/80 text-xs leading-relaxed text-center">
          Scattered throughout this realm are sacred signs bearing the sigils of
          mine arsenal. Approach them and press any action key to uncover the
          wisdom within.
        </p>
      </div>

      {/* Decorative divider */}
      <div className="flex justify-center my-3">
        <div className="w-24 h-px bg-amber-500/50" />
      </div>

      {/* Action Keys Guide */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="relative w-6 h-6">
            <Image
              src="/icons/sword.png"
              alt="Sword"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
          <h3 className="font-masonic text-amber-400 text-sm tracking-wider">
            Sacred Actions
          </h3>
          <div className="relative w-6 h-6">
            <Image
              src="/icons/shield.png"
              alt="Shield"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          <kbd className="px-3 py-1.5 bg-black/60 border border-amber-600 rounded text-amber-300 font-masonic text-sm">
            F
          </kbd>
          <kbd className="px-3 py-1.5 bg-black/60 border border-amber-600 rounded text-amber-300 font-masonic text-sm">
            E
          </kbd>
          <kbd className="px-3 py-1.5 bg-black/60 border border-amber-600 rounded text-amber-300 font-masonic text-sm">
            R
          </kbd>
          <kbd className="px-3 py-1.5 bg-black/60 border border-amber-600 rounded text-amber-300 font-masonic text-sm">
            T
          </kbd>
          <kbd className="px-3 py-1.5 bg-black/60 border border-amber-600 rounded text-amber-300 font-masonic text-sm">
            G
          </kbd>
          <kbd className="px-3 py-1.5 bg-black/60 border border-amber-600 rounded text-amber-300 font-masonic text-sm">
            C
          </kbd>
        </div>
        <p className="font-serif text-amber-200/70 text-xs text-center mt-3">
          Press any of these sacred keys to speak with companions,
          <br />
          read sacred signs, or journey through portals
        </p>
      </div>

      {/* Decorative divider */}
      <div className="flex justify-center my-3">
        <div className="w-24 h-px bg-amber-500/50" />
      </div>

      {/* Free Camera Reminder */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="relative w-6 h-6">
            <Image
              src="/icons/compass.png"
              alt="Compass"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
          <h3 className="font-masonic text-amber-400 text-sm tracking-wider">
            The All-Seeing Eye
          </h3>
          <div className="relative w-6 h-6">
            <Image
              src="/icons/map.png"
              alt="Map"
              width={24}
              height={24}
              className="opacity-80"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <kbd className="px-4 py-1.5 bg-black/60 border border-amber-600 rounded text-amber-300 font-masonic text-sm">
            V
          </kbd>
        </div>
        <p className="font-serif text-amber-200/70 text-xs text-center mt-3">
          Press <span className="text-amber-400 font-bold">V</span> to free thy
          camera and behold the realm in its full glory
        </p>
      </div>

      {/* Decorative divider */}
      <div className="flex justify-center my-3">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </div>

      {/* Heraldic Footer */}
      <div className="px-4 py-4 text-center">
        <div className="flex justify-center gap-3 mb-3">
          <div className="relative w-5 h-5">
            <Image
              src="/icons/heraldic-crest.png"
              alt="Heraldic Crest"
              width={20}
              height={20}
              className="opacity-60"
            />
          </div>
          <div className="relative w-5 h-5">
            <Image
              src="/icons/crown.png"
              alt="Crown"
              width={20}
              height={20}
              className="opacity-60"
            />
          </div>
          <div className="relative w-5 h-5">
            <Image
              src="/icons/flask.png"
              alt="Flask"
              width={20}
              height={20}
              className="opacity-60"
            />
          </div>
        </div>
        <div className="text-amber-600/50 text-[10px] font-serif italic">
          "May thy code be strong and thy spirit unbroken"
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
    </div>
  );
}
