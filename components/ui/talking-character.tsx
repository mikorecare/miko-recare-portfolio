"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface TalkingCharacterProps {
  onComplete?: () => void;
  autoStart?: boolean;
}

const frames = [
  {
    frame: 1,
    text: "Hmm... I've been thinking about something lately.",
    emotion: "thinking",
    endFrame: 5,
  },
  {
    frame: 2,
    text: "The rise of AI in programming... it's everywhere now.",
    emotion: "thinking",
    endFrame: 5,
  },
  {
    frame: 3,
    text: "Should I be worried? Traditional vs AI...",
    emotion: "thinking",
    endFrame: 5,
  },
  {
    frame: 4,
    text: "Will AI replace developers? This affects all of us.",
    emotion: "thinking",
    endFrame: 5,
  },
  {
    frame: 5,
    text: "I've seen both sides - the old way and the new.",
    emotion: "thinking",
    endFrame: 5,
  },
  {
    frame: 6,
    text: "But then I realized... why choose one?",
    emotion: "thinking",
    endFrame: 5,
  },
  {
    frame: 7,
    text: "Conflicting data: Traditional coding vs AI assistance.",
    emotion: "thinking",
    endFrame: 5,
  },
  {
    frame: 8,
    text: "At first, I was frustrated. Felt overwhelmed.",
    emotion: "thinking-sigh",
    endFrame: 8,
  },
  {
    frame: 9,
    text: "So I took a step back. Did a systematic review.",
    emotion: "thinking",
    endFrame: 5,
  },
  {
    frame: 10,
    text: "What if I don't fight AI, but embrace it?",
    emotion: "doing-thing",
    endFrame: 10,
  },
  {
    frame: 11,
    text: "I started testing - using AI as a tool, not a replacement.",
    emotion: "thinking-deep",
    endFrame: 11,
  },
  {
    frame: 12,
    text: "Learned to prompt, to guide, to collaborate with AI.",
    emotion: "analyzing",
    endFrame: 12,
  },
  {
    frame: 13,
    text: "Now I write code faster, debug smarter.",
    emotion: "realization",
    endFrame: 13,
  },
  {
    frame: 14,
    text: "I'm still the architect. AI is my assistant.",
    emotion: "showing-solution",
    endFrame: 14,
  },
  {
    frame: 15,
    text: "The plan is clear: Adapt, learn, grow together.",
    emotion: "acceptance",
    endFrame: 15,
  },
  {
    frame: 16,
    text: "Now I'm a hybrid programmer! Traditional + AI. Best of both worlds! ✨",
    emotion: "happy",
    endFrame: 16,
  },
];

// Available frames for each emotion
const emotionFrames: Record<string, number[]> = {
  thinking: [1, 2, 3, 4, 5, 6, 7, 9],
  "thinking-sigh": [8],
  "doing-thing": [10],
  "thinking-deep": [11],
  analyzing: [12],
  realization: [13],
  "showing-solution": [14],
  acceptance: [15],
  happy: [16],
};

export default function TalkingCharacter({
  onComplete,
  autoStart = true,
}: TalkingCharacterProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const frameRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentImageFrame, setCurrentImageFrame] = useState(1);

  const currentFrame = frames[frameIndex];
  const availableFrames = emotionFrames[currentFrame?.emotion] || [1];
  const targetEndFrame = currentFrame?.endFrame || 1;

  // Randomize image during typing
  useEffect(() => {
    if (isTyping && availableFrames.length > 1) {
      imageIntervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * availableFrames.length);
        setCurrentImageFrame(availableFrames[randomIndex]);
      }, 120);
    } else if (!isTyping && currentFrame) {
      // When typing stops, set to the target end frame for this dialogue
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = null;
      }
      setCurrentImageFrame(targetEndFrame);
    }

    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
    };
  }, [isTyping, availableFrames, targetEndFrame, currentFrame]);

  // Typing effect
  useEffect(() => {
    if (!isPlaying || !currentFrame) return;

    // Set initial frame before typing
    const initialFrame =
      availableFrames[Math.floor(Math.random() * availableFrames.length)];
    setCurrentImageFrame(initialFrame);

    setIsTyping(true);
    setDisplayText("");
    let charIndex = 0;
    const fullText = currentFrame.text;

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
  }, [frameIndex, isPlaying, currentFrame]);

  // Auto-advance frames
  useEffect(() => {
    if (!isPlaying) return;

    const advanceFrame = () => {
      if (frameIndex < frames.length - 1) {
        setFrameIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        if (onComplete) onComplete();
      }
    };

    if (!isTyping && displayText === currentFrame?.text) {
      frameRef.current = setTimeout(advanceFrame, 2500);
    }

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [isTyping, displayText, currentFrame, frameIndex, isPlaying, onComplete]);

  const handleClick = () => {
    if (isTyping) {
      // Skip typing - instantly show full text and end on correct frame
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (imageIntervalRef.current) clearInterval(imageIntervalRef.current);
      setIsTyping(false);
      setDisplayText(currentFrame?.text || "");
      setCurrentImageFrame(targetEndFrame);
    } else if (!isPlaying && frameIndex < frames.length - 1) {
      setIsPlaying(true);
    } else if (frameIndex === frames.length - 1 && !isPlaying) {
      setShowBubble(false);
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setFrameIndex(0);
    setDisplayText("");
    setIsPlaying(true);
    setShowBubble(true);
    setCurrentImageFrame(1);
  };

  if (!showBubble && frameIndex === frames.length - 1) return null;

  const currentFrameNumber = frameIndex + 1;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Speech Bubble */}
      {showBubble && (
        <div
          className="relative max-w-sm sm:max-w-md md:max-w-lg bg-black/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl border-2 border-cyan-500 animate-fade-in-up cursor-pointer"
          onClick={handleClick}
        >
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-black/90 rotate-45 border-r-2 border-b-2 border-cyan-500" />

          <div className="absolute -top-3 left-3 bg-cyan-600 text-white text-[11px] font-reactor7 px-2 py-0.5 rounded-full tracking-wider">
            [{currentFrameNumber}/{frames.length}]
          </div>

          <div className="min-h-[120px] pr-2">
            <p className="font-reactor7 text-cyan-100 text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
              {displayText}
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
              )}
            </p>
          </div>

          {isTyping && (
            <div className="absolute bottom-2 right-3">
              <span className="text-[10px] text-cyan-500 font-reactor7 animate-pulse tracking-wider">
                writing...
              </span>
            </div>
          )}

          {!isTyping && isPlaying && frameIndex < frames.length - 1 && (
            <div className="text-right mt-3">
              <span className="text-[11px] text-cyan-500 font-reactor7 animate-pulse tracking-wider">
                [click to continue] →
              </span>
            </div>
          )}

          {!isPlaying && frameIndex === frames.length - 1 && (
            <div className="text-center mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="text-sm font-reactor7 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2 rounded-full hover:from-cyan-700 hover:to-blue-700 transition tracking-wider"
              >
                [close]
              </button>
            </div>
          )}
        </div>
      )}

      {/* Character Avatar */}
      <div
        className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${!showBubble ? "opacity-70 hover:opacity-100" : ""}`}
        onClick={handleClick}
      >
        {isPlaying && isTyping && (
          <div className="absolute -inset-1 rounded-full bg-cyan-500/30 animate-pulse" />
        )}

        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden shadow-xl bg-transparent">
          <Image
            src={`/animated/talking-frame-${currentImageFrame}.png`}
            alt="Talking character"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />

          {isPlaying && isTyping && (
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
          )}

          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full">
            <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>

        {!showBubble && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-600 rounded-full text-white text-[10px] font-reactor7 flex items-center justify-center hover:bg-cyan-700 transition"
          >
            ↻
          </button>
        )}
      </div>
    </div>
  );
}
