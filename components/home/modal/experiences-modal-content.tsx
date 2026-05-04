"use client";

import { experiences } from "@/components/main/experiences/data";

export const ExperiencesModalContent = () => {
  return (
    <div className="space-y-5">
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="relative pl-4 pb-5 last:pb-0 border-l-2 border-cyan-500/30 last:border-l-transparent"
        >
          {/* Timeline dot */}
          <div className="absolute left-[-9px] top-0 w-4 h-4 bg-cyan-500/20 border border-cyan-500 rounded-full" />

          {/* Header */}
          <div className="mb-2">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h3 className="font-montserrat font-bold text-base text-cyan-400">
                  {exp.title}
                </h3>
                <p className="font-poppins text-sm text-gray-300">{exp.role}</p>
              </div>
              <span className="font-poppins text-[10px] text-gray-500 whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            {exp.location && (
              <p className="font-poppins text-[10px] text-gray-500 mt-1">
                {exp.location}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="font-poppins text-xs text-gray-400 leading-relaxed mb-3">
            {exp.description}
          </p>

          {/* Projects */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {exp.projects.map((project, pIdx) => (
                <span
                  key={pIdx}
                  className="font-poppins text-[9px] text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded"
                >
                  {project}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
