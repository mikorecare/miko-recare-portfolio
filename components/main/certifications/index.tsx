"use client";

import { certifications } from "./data";
import CertificationCard from "./certification-card";

interface CertificationsProps {
  page?: number;
  itemsPerPage?: number;
}

export const Certifications = ({
  page = 1,
  itemsPerPage = 3,
}: CertificationsProps) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCerts = certifications.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col justify-center h-full w-full p-1 sm:p-6 overflow-y-auto">
      <p className="font-masonic text-[5px] sm:text-sm text-stone-600 text-center">
        ✧ SACRED SCROLLS ✧
      </p>

      <div className="w-4 sm:w-24 h-px bg-amber-700/30 my-0.5 sm:my-4 mx-auto"></div>

      <div className="space-y-1 sm:space-y-2 my-0.5 sm:my-2">
        {paginatedCerts.map((cert, index) => (
          <CertificationCard key={index} cert={cert} index={index} />
        ))}
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
};
