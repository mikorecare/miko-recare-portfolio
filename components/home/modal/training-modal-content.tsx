"use client";

import { certifications } from "@/components/main/certifications/data";

export const TrainingsModalContent = () => {
  return (
    <div className="space-y-4">
      {certifications.map((cert, idx) => (
        <div
          key={idx}
          className="p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-all duration-200"
        >
          {/* Header */}
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <div>
              <h3 className="font-montserrat font-bold text-sm text-cyan-400">
                {cert.title}
              </h3>
              <p className="font-poppins text-xs text-gray-400">
                {cert.platform}
              </p>
            </div>
            <span className="font-poppins text-[10px] text-gray-500">
              {cert.issuedDate}
            </span>
          </div>

          {/* Skills */}
          {cert.skills && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {cert.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="font-poppins text-[9px] text-gray-400 bg-gray-800/70 px-2 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Credential Link */}
          {cert.credentialUrl && (
            <div className="mt-3">
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-cyan-400/70 hover:text-cyan-400 transition-colors"
              >
                View Credential
                <span className="text-[10px]">→</span>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
