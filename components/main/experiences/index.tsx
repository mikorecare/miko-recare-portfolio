"use client";

import Icon from "@/components/icons";
import { experiences } from "./data";

export default function Experience() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto relative">
      {/* Scroll background image - higher opacity for visibility */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        style={{
          backgroundImage: "url('/scroll.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4, // Increased from 0.15 to 0.4
        }}
      />

      {/* Dark overlay to make text readable */}
      <div className="absolute inset-0 bg-stone-900/60 rounded-2xl pointer-events-none" />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <div className="border-l-4 border-amber-600/60 pl-6 mb-12">
          <h2 className="font-masonic text-4xl md:text-5xl text-amber-500/90 tracking-wider drop-shadow-md">
            Years of Service
          </h2>
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-600/60 rounded-full" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="relative group bg-stone-800/50 backdrop-blur-sm rounded-lg border border-amber-600/20 hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="relative p-6 z-10">
                <div className="flex flex-wrap justify-between items-start mb-3">
                  <h3 className="font-masonic text-amber-400 text-xl tracking-wider drop-shadow-sm">
                    {exp.title}
                  </h3>
                  <span className="font-masonic text-stone-400/80 text-sm bg-stone-900/30 px-2 py-0.5 rounded">
                    {exp.period}
                  </span>
                </div>

                <div className="flex flex-wrap justify-between items-start mb-2">
                  <p className="font-masonic text-amber-300/80 text-sm mb-1 tracking-wider">
                    {exp.role} {exp.type && `· ${exp.type}`}
                  </p>
                  {exp.location && (
                    <span className="font-masonic text-stone-500 text-xs flex items-center gap-1">
                      <Icon name="map" /> {exp.location}
                    </span>
                  )}
                </div>

                <p className="font-masonic text-stone-300/90 leading-relaxed text-sm mb-3">
                  {exp.description}
                </p>

                {exp.projects && exp.projects.length > 0 && (
                  <div className="mt-3 mb-2">
                    <p className="font-masonic text-amber-400/80 text-xs mb-2 tracking-wider flex items-center gap-2">
                      <span><Icon name="cross-swords" /></span> Notable Quests:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.projects.map((project, idx) => (
                        <span
                          key={idx}
                          className="font-masonic text-stone-400 text-xs border border-amber-600/30 px-2 py-0.5 rounded bg-stone-900/20"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="font-masonic text-amber-500/60 text-xs tracking-wider"
                        >
                          [{skill}]
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="relative mt-12 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-600/40" />
            <span className="font-masonic text-amber-500/40 text-xs tracking-wider">
              ✧ FINIS ✧
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-600/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
