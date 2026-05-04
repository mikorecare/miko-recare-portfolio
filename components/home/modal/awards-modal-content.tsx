"use client";

import { useState } from "react";
import Image from "next/image";
import { awards } from "@/components/main/awards/data";

export const AwardsModalContent = () => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const award = awards[0]; // Get the first award

  return (
    <div className="space-y-5">
      {/* Award Header */}
      <div className="text-center">
        <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-3">
          <span className="font-poppins text-[10px] text-cyan-400 tracking-wider">
            ✦ {award.year} ✦
          </span>
        </div>
        <h3 className="font-montserrat text-xl md:text-2xl font-bold text-cyan-400">
          {award.title}
        </h3>
        <p className="font-poppins text-sm text-gray-400 mt-1">
          {award.organization} • {award.role}
        </p>
      </div>

      {/* Certificate Image */}
      {award.certificateImage && (
        <div className="flex justify-center">
          <div
            className="relative w-full max-w-md cursor-pointer group"
            onClick={() => setIsImageZoomed(true)}
          >
            <div
              className="relative aspect-[4/3] rounded-lg overflow-hidden border border-cyan-500/30 
                            shadow-lg transition-all duration-300 group-hover:shadow-cyan-500/20 group-hover:scale-[1.02]"
            >
              <Image
                src={award.certificateImage}
                alt={award.title}
                fill
                className="object-contain"
              />
            </div>
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 
                            flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <span className="text-white text-xs bg-black/70 px-3 py-1 rounded-full">
                🔍 Click to zoom
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
        <p className="font-poppins text-sm text-gray-300 leading-relaxed">
          {award.description}
        </p>
      </div>

      {/* Quote */}
      {award.quote && (
        <div className="border-l-2 border-cyan-500/50 pl-4 py-2">
          <p className="font-poppins text-xs text-gray-400 italic">
            "{award.quote}"
          </p>
        </div>
      )}

      {/* Certificate Link */}
      {award.certificateUrl && (
        <div className="flex justify-center pt-2">
          <a
            href={award.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-gray-800/50 border border-cyan-500/50 
                       rounded-lg hover:bg-gray-800 transition-all duration-200 group"
          >
            <span className="font-poppins text-sm text-gray-300 group-hover:text-cyan-400 transition-colors">
              View Certificate
            </span>
            <span className="text-cyan-400 text-xs group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>
      )}

      {/* Image Zoom Modal */}
      {isImageZoomed && award.certificateImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={award.certificateImage}
              alt={award.title}
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
