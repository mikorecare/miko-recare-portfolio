"use client";

export default function DownloadCV() {
  // CV download handler
  const handleDownloadCV = () => {
    const cvUrl = "/resume/Miko Recare CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Miko_Recare_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative z-10 py-16 px-8 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 border-t border-amber-700/30 w-full">
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Decorative corner icons - NOW INSIDE THE RELATIVE CONTAINER */}
        <span className="absolute top-1 left-1 text-amber-700/40 text-xs">
          ❧
        </span>
        <span className="absolute top-1 right-1 text-amber-700/40 text-xs">
          ❧
        </span>
        <span className="absolute bottom-1 left-1 text-amber-700/40 text-xs">
          ❦
        </span>
        <span className="absolute bottom-1 right-1 text-amber-700/40 text-xs">
          ❦
        </span>

        {/* Decorative header */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-px bg-amber-700/40"></div>
          <Icon name="scroll" className="w-4 h-4 text-amber-700/40" />
          <div className="w-12 h-px bg-amber-700/40"></div>
        </div>

        {/* Medieval title */}
        <h2 className="font-masonic text-2xl md:text-3xl text-amber-400 tracking-wider mb-3">
          THE SCRIBE'S TOME
        </h2>
        <p className="font-masonic text-stone-400 text-sm mb-6">
          Unroll the parchment of deeds and craft
        </p>

        {/* Decorative line */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-700/50"></div>
          <span className="text-amber-700/40 text-xs">✦ ✦ ✦</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-700/50"></div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadCV}
          className="transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="Download CV"
        >
          <img
            src="/buttons/download-cv.png"
            alt="Download CV"
            className="h-auto w-auto max-w-[220px] md:max-w-[260px] cursor-pointer"
          />
        </button>

        {/* Bottom inscription */}
        <div className="mt-8 text-center">
          <p className="font-masonic text-stone-500 text-[10px] tracking-wider">
            ~ Let it be known that this scribe hath mastered the code arts ~
          </p>
        </div>
      </div>
    </div>
  );
}

// Simple icon component for decorative elements
function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    scroll: (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 4H20V20H4V4Z" stroke="currentColor" fill="none" />
        <path d="M8 8H16" stroke="currentColor" strokeLinecap="round" />
        <path d="M8 12H16" stroke="currentColor" strokeLinecap="round" />
        <path d="M8 16H13" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  };
  return icons[name] || null;
}
