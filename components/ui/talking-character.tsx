"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimationSet,
  getFramePath,
  getFramesForAnimation,
} from "./qa-modal/data";

interface TalkingCharacterProps {
  message: string;
  animationSet?: AnimationSet;
  typingSpeed?: number;
  idleFrame?: number;
  onFinished?: () => void;
}

export default function TalkingCharacter({
  message,
  animationSet = "open-arms",
  typingSpeed = 45,
  idleFrame = 8,
  onFinished,
}: TalkingCharacterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTalking, setIsTalking] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);

  // typing effect
  useEffect(() => {
    if (!message) return;

    setDisplayText("");
    setIsTalking(true);

    let index = 0;

    const typingInterval = setInterval(() => {
      if (index <= message.length) {
        setDisplayText(message.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTalking(false);
        onFinished?.();
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [message, typingSpeed, onFinished]);

  // talking animation
  useEffect(() => {
    if (!isTalking) {
      setCurrentFrame(idleFrame);
      return;
    }

    const animationInterval = setInterval(() => {
      setCurrentFrame((prev) => prev + 1);
    }, 120);

    return () => clearInterval(animationInterval);
  }, [isTalking, idleFrame]);

  const imagePath = isTalking
    ? getFramesForAnimation(animationSet, currentFrame)
    : getFramePath(animationSet, idleFrame);

  return (
    <div className="flex flex-col items-end">
      {/* Text bubble - fixed width, minimum height */}
      <div className="w-72 min-h-[70px] mb-2">
        <div className="font-reactor7 text-cyan-100 text-md leading-relaxed bg-black/50 rounded-lg p-2">
          {displayText}
          {isTalking && (
            <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
          )}
        </div>
      </div>

      {/* Character - fixed position, won't move */}
      <div className="relative w-30 h-30 flex-shrink-0">
        <Image
          src={imagePath}
          alt="Talking character"
          fill
          className="object-contain"
          sizes="80px"
          priority
        />
        {isTalking && (
          <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping" />
        )}
      </div>
    </div>
  );
}
