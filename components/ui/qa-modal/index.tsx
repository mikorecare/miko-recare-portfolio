"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { qaDatabase, emotionFrames } from "./data";

interface QAModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
}

export default function QAModal({ isOpen, onClose, question }: QAModalProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const frameRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentImageFrame, setCurrentImageFrame] = useState(1);

  // Direct match using the question string as is
  const qa = qaDatabase[question] || qaDatabase["default"];

  const currentFrameData = qa.frames[frameIndex];
  const availableFrames = emotionFrames[currentFrameData?.emotion] || [1];
  const targetEndFrame = currentFrameData?.endFrame || 1;

  // Reset when modal opens with new question
  useEffect(() => {
    if (isOpen) {
      setFrameIndex(0);
      setDisplayText("");
      setIsPlaying(true);
      setCurrentImageFrame(1);
    }
  }, [isOpen, question]);

  // Randomize image during typing
  useEffect(() => {
    if (isTyping && availableFrames.length > 1) {
      imageIntervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * availableFrames.length);
        setCurrentImageFrame(availableFrames[randomIndex]);
      }, 120);
    } else if (!isTyping && currentFrameData) {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = null;
      }
      setCurrentImageFrame(targetEndFrame);
    }

    return () => {
      if (imageIntervalRef.current) clearInterval(imageIntervalRef.current);
    };
  }, [isTyping, availableFrames, targetEndFrame, currentFrameData]);

  // Typing effect
  useEffect(() => {
    if (!isPlaying || !currentFrameData) return;

    const initialFrame =
      availableFrames[Math.floor(Math.random() * availableFrames.length)];
    setCurrentImageFrame(initialFrame);

    setIsTyping(true);
    setDisplayText("");
    let charIndex = 0;
    const fullText = currentFrameData.text;

    typingIntervalRef.current = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayText(fullText.substring(0, charIndex));
        charIndex++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);
      }
    }, 45);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [frameIndex, isPlaying, currentFrameData]);

  // Auto-advance frames
  useEffect(() => {
    if (!isPlaying) return;

    const advanceFrame = () => {
      if (frameIndex < qa.frames.length - 1) {
        setFrameIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    if (!isTyping && displayText === currentFrameData?.text) {
      frameRef.current = setTimeout(advanceFrame, 2000);
    }

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [
    isTyping,
    displayText,
    currentFrameData,
    frameIndex,
    isPlaying,
    qa.frames.length,
  ]);

  const handleClick = () => {
    if (isTyping) {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (imageIntervalRef.current) clearInterval(imageIntervalRef.current);
      setIsTyping(false);
      setDisplayText(currentFrameData?.text || "");
      setCurrentImageFrame(targetEndFrame);
    } else if (!isPlaying && frameIndex < qa.frames.length - 1) {
      setIsPlaying(true);
    } else if (!isPlaying && frameIndex === qa.frames.length - 1) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentFrameNumber = frameIndex + 1;
  const totalFrames = qa.frames.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-2xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-cyan-400 hover:text-cyan-300 font-reactor7 text-base transition"
        >
          [close]
        </button>

        <div
          className="relative bg-black/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-cyan-500 cursor-pointer"
          onClick={handleClick}
        >
          <div className="absolute -top-3 left-3 bg-cyan-600 text-white text-xs font-reactor7 px-2 py-0.5 rounded-full tracking-wider">
            [{currentFrameNumber}/{totalFrames}]
          </div>

          <div className="min-h-[160px] pr-2 mb-6">
            <p className="font-reactor7 text-cyan-100 text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide">
              {displayText}
              {isTyping && (
                <span className="inline-block w-2 h-5 bg-cyan-400 ml-1 animate-pulse" />
              )}
            </p>
          </div>

          {isTyping && (
            <div className="absolute bottom-4 right-4">
              <span className="text-xs text-cyan-500 font-reactor7 animate-pulse tracking-wider">
                writing...
              </span>
            </div>
          )}

          {!isTyping && isPlaying && frameIndex < totalFrames - 1 && (
            <div className="text-right mt-4">
              <span className="text-sm text-cyan-500 font-reactor7 animate-pulse tracking-wider">
                [click to continue] →
              </span>
            </div>
          )}

          {!isPlaying && frameIndex === totalFrames - 1 && (
            <div className="text-center mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="text-base font-reactor7 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-cyan-700 hover:to-blue-700 transition tracking-wider"
              >
                [close]
              </button>
            </div>
          )}

          <div className="absolute -bottom-12 -right-6 w-20 h-20 sm:w-24 sm:h-24">
            <div className="relative w-full h-full overflow-hidden shadow-xl bg-transparent">
              <Image
                src={`/animated/talking-frame-${currentImageFrame}.png`}
                alt="Talking character"
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
              {isTyping && (
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full">
                <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
