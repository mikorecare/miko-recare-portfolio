"use client";

import Icon from "@/components/icons";
import {
  location,
  bio,
  mainStacks,
  cloudAndDevOps,
  stylingAndDesign,
  softSkills,
} from "./data";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="border-l-4 border-amber-500 pl-6 mb-12">
        <h2 className="font-masonic text-4xl md:text-5xl text-amber-400 tracking-wider">
          The Scribe's Tale
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Bio */}
        <div className="space-y-4">
          {bio.map((paragraph, idx) => (
            <p
              key={idx}
              className="font-masonic text-stone-300 leading-relaxed text-lg"
            >
              {paragraph}
            </p>
          ))}
          {location && (
            <p className="font-masonic text-amber-400/70 leading-relaxed text-base mt-4 flex items-center gap-1">
              <Icon name="map" /> {location}
            </p>
          )}
        </div>

        {/* Right Column - Arsenal & Skills */}
        <div className="space-y-6">
          {/* Main Arsenal */}
          <div className="bg-stone-800/50 border border-amber-500/30 rounded-lg p-6">
            <h3 className="font-masonic text-amber-400 text-xl mb-4 tracking-wider flex items-center gap-2">
              <Icon name="cross-swords" />
              Primary Arsenal
            </h3>
            <div className="flex flex-wrap gap-3">
              {mainStacks.map((tech) => (
                <span
                  key={tech}
                  className="font-masonic px-3 py-1 bg-stone-700/50 border border-amber-500/30 text-amber-300 text-sm rounded tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Cloud & DevOps */}
          <div className="bg-stone-800/30 border border-amber-500/20 rounded-lg p-6">
            <h3 className="font-masonic text-amber-400/80 text-lg mb-3 tracking-wider flex items-center gap-2">
              <Icon name="castle" />
              The Cloud Citadel
            </h3>
            <div className="flex flex-wrap gap-2">
              {cloudAndDevOps.map((tech) => (
                <span
                  key={tech}
                  className="font-masonic px-2 py-1 bg-stone-700/30 border border-amber-500/20 text-amber-300/70 text-xs rounded tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Styling & Design Libraries */}
          <div className="bg-stone-800/30 border border-amber-500/20 rounded-lg p-6">
            <h3 className="font-masonic text-amber-400/80 text-lg mb-3 tracking-wider flex items-center gap-2">
              <Icon name="blacksmith" />
              Artisan's Touch
            </h3>
            <div className="flex flex-wrap gap-2">
              {stylingAndDesign.map((tech) => (
                <span
                  key={tech}
                  className="font-masonic px-2 py-1 bg-stone-700/30 border border-amber-500/20 text-amber-300/70 text-xs rounded tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-stone-800/30 border border-amber-500/20 rounded-lg p-6">
            <h3 className="font-masonic text-amber-400/80 text-lg mb-3 tracking-wider flex items-center gap-2">
              <Icon name="heraldic-crest" />
              Noble Virtues
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="font-masonic px-2 py-1 bg-stone-700/30 border border-amber-500/20 text-amber-300/60 text-xs rounded tracking-wider"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
