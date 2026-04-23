"use client";

import { projects } from "./data";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="border-l-4 border-amber-500 pl-6 mb-12">
        <h2 className="font-masonic text-4xl md:text-5xl text-amber-400 tracking-wider">
          Legendary Quests
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group bg-stone-800/30 border border-amber-500/20 rounded-lg p-6 hover:border-amber-500/50 hover:bg-stone-800/50 transition-all duration-300"
          >
            <h3 className="font-masonic text-amber-400 text-xl mb-2 tracking-wider">
              {project.name}
            </h3>
            <p className="font-masonic text-stone-400 text-sm mb-3 leading-relaxed">
              {project.description}
            </p>

            {project.highlights && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="font-masonic text-amber-500/60 text-xs tracking-wider"
                    >
                      ✦ {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t,i) => (
                <span
                  key={`${t}-${i}`}
                  className="font-masonic text-amber-500/70 text-xs tracking-wider"
                >
                  [{t}]
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
