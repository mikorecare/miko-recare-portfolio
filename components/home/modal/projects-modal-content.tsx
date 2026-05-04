"use client";

import { projects } from "@/components/main/projects/data";
import { useState } from "react";

export const ProjectsModalContent = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const project = projects[selectedProject];
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const totalScreenshots = hasScreenshots ? project.screenshots.length : 0;

  const nextProject = () => {
    setSelectedProject((prev) => (prev + 1) % projects.length);
    setCurrentScreenshot(0);
  };

  const prevProject = () => {
    setSelectedProject(
      (prev) => (prev - 1 + projects.length) % projects.length,
    );
    setCurrentScreenshot(0);
  };

  const nextScreenshot = () => {
    if (totalScreenshots > 0) {
      setCurrentScreenshot((prev) => (prev + 1) % totalScreenshots);
    }
  };

  const prevScreenshot = () => {
    if (totalScreenshots > 0) {
      setCurrentScreenshot(
        (prev) => (prev - 1 + totalScreenshots) % totalScreenshots,
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Column - Screenshot Viewer */}
      <div className="flex-1">
        {hasScreenshots && project.screenshots[currentScreenshot] ? (
          <div className="relative">
            {/* Screenshot Container */}
            <div
              className={`relative bg-gray-900 rounded-lg overflow-y-auto border border-gray-700 cursor-pointer
                ${project.isMobile ? "max-w-[100px] mx-auto" : "max-w-[280px]"}`}
              style={{ maxHeight: "400px" }}
              onClick={() => setIsImageZoomed(true)}
            >
              {project.isMobile && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-gray-800 rounded-b-md z-10" />
              )}
              <div
                className={`${project.isMobile ? "aspect-[9/19]" : ""} overflow-y-auto`}
              >
                <img
                  src={project.screenshots[currentScreenshot]}
                  alt={`${project.name} screenshot`}
                  className="w-full object-cover object-top"
                />
              </div>
              {project.isMobile && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gray-600 rounded-full z-10" />
              )}
            </div>

            {/* Screenshot Navigation Arrows */}
            {totalScreenshots > 1 && (
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={prevScreenshot}
                  className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <span className="text-cyan-400 text-sm">◀</span>
                </button>
                <span className="font-poppins text-[10px] text-gray-500">
                  {currentScreenshot + 1} / {totalScreenshots}
                </span>
                <button
                  onClick={nextScreenshot}
                  className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <span className="text-cyan-400 text-sm">▶</span>
                </button>
              </div>
            )}

            {/* Dots indicator */}
            {totalScreenshots > 1 && (
              <div className="flex justify-center gap-1.5 mt-2">
                {project.screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentScreenshot(idx)}
                    className={`h-1 rounded-full transition-all duration-200
                      ${
                        currentScreenshot === idx
                          ? "w-3 bg-cyan-500"
                          : "w-1 bg-gray-600 hover:bg-gray-500"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 h-64 flex items-center justify-center">
            <span className="font-poppins text-sm text-gray-500">
              No screenshots available
            </span>
          </div>
        )}
      </div>

      {/* Right Column - Project Info */}
      <div className="flex-1 space-y-4">
        {/* Project Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevProject}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className="text-cyan-400 text-sm">◀ Previous</span>
          </button>
          <span className="font-poppins text-xs text-gray-500">
            {selectedProject + 1} / {projects.length}
          </span>
          <button
            onClick={nextProject}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className="text-cyan-400 text-sm">Next ▶</span>
          </button>
        </div>

        {/* Project Title */}
        <h3 className="font-montserrat font-bold text-lg text-cyan-400">
          {project.name}
        </h3>

        {/* Description */}
        <p className="font-poppins text-sm text-gray-300 leading-relaxed">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div>
            <h4 className="font-montserrat text-xs font-semibold text-cyan-400 mb-2">
              Highlights
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="font-poppins text-[10px] text-gray-400 bg-gray-800/50 px-2 py-1 rounded"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div>
            <h4 className="font-montserrat text-xs font-semibold text-cyan-400 mb-2">
              Links
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-poppins text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors"
                >
                  {link.name} →
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {isImageZoomed &&
        hasScreenshots &&
        project.screenshots[currentScreenshot] && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setIsImageZoomed(false)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] overflow-auto">
              <img
                src={project.screenshots[currentScreenshot]}
                alt={project.name}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button
                onClick={() => setIsImageZoomed(false)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-8 h-8 
                         flex items-center justify-center hover:bg-black/70 transition-all duration-200"
              >
                ✕
              </button>
            </div>
          </div>
        )}
    </div>
  );
};
