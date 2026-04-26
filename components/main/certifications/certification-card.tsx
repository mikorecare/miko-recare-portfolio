"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/icons";

interface Certification {
  platform: string;
  title: string;
  issuedDate: string;
  credentialId: string | null;
  credentialUrl: string;
  skills: string[];
}

interface CertificationCardProps {
  cert: Certification;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const CertificationCard = ({
  cert,
  index,
  isHovered,
  onHover,
  onLeave,
}: CertificationCardProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showBelow = index < 3;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onHover();
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
      onLeave();
    }, 300);
  };

  const handlePopupMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPopup(true);
  };

  const handlePopupMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
      onLeave();
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Compact card - matches pattern text sizes */}
      <div className="bg-amber-100/60 border border-amber-700/30 rounded px-1 sm:px-2 py-0.5 sm:py-1 transition-all duration-300 hover:border-amber-700/50">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-amber-200/50 border border-amber-700/30 flex items-center justify-center flex-shrink-0">
            <Icon name="scroll" className="w-1.5 h-1.5 sm:w-3 sm:h-3 text-amber-700" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-masonic text-amber-800 text-[6px] sm:text-[10px] font-bold tracking-wider truncate">
              {cert.title}
            </h3>
            <p className="font-masonic text-amber-700 text-[4px] sm:text-[8px] tracking-wider">
              {cert.platform} • {cert.issuedDate}
            </p>
          </div>
          <Icon name="crystal" className="w-1 h-1 sm:w-2 sm:h-2 text-amber-700/30" />
        </div>
      </div>

      {/* Popup */}
      {(isHovered || showPopup) && (
        <div
          className="fixed z-[100] w-64 sm:w-80 bg-amber-100 border border-amber-700/50 rounded-lg shadow-xl p-2 sm:p-3"
          style={
            showBelow
              ? {
                  top: "auto",
                  bottom: "0",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-10px)",
                }
              : {
                  bottom: "auto",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%) translateY(10px)",
                }
          }
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <div className="absolute top-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-l border-t border-amber-700/30"></div>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-r border-b border-amber-700/30"></div>

          <h4 className="font-masonic text-amber-800 text-[8px] sm:text-xs font-bold mb-0.5 pr-4">
            {cert.title}
          </h4>

          <p className="font-masonic text-amber-700 text-[7px] sm:text-[9px] mb-1">
            {cert.platform} • {cert.issuedDate}
          </p>

          {cert.credentialId && (
            <p className="font-masonic text-stone-500 text-[6px] sm:text-[8px] mb-1">
              ID: {cert.credentialId}
            </p>
          )}

          <div className="mb-1">
            <p className="font-masonic text-amber-700 text-[6px] sm:text-[8px] tracking-wider mb-0.5">
              Skills:
            </p>
            <div className="flex flex-wrap gap-0.5">
              {cert.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="font-masonic text-amber-800/70 text-[5px] sm:text-[7px] bg-amber-200/50 px-1 py-0.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                window.open(cert.credentialUrl, "_blank");
              }}
              className="inline-flex items-center gap-0.5 text-[6px] sm:text-[8px] text-amber-700 hover:text-amber-800 transition-colors font-masonic"
            >
              <Icon name="scroll" className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
              <span>View</span>
            </a>
          )}

          {showBelow ? (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-100 border-l border-t border-amber-700/50 rotate-45"></div>
          ) : (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-100 border-r border-b border-amber-700/50 rotate-45"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificationCard;