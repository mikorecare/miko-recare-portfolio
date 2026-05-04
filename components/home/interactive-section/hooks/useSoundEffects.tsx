// hooks/useSoundEffects.ts
import { useRef, useEffect } from "react";

export const useSoundEffects = () => {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const onSoundRef = useRef<HTMLAudioElement | null>(null);
  const offSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSoundRef.current = new Audio("/home/mp3/hover.mp3");
    onSoundRef.current = new Audio("/home/mp3/on.mp3");
    offSoundRef.current = new Audio("/home/mp3/off.mp3");

    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = 0.5;
    }
    if (onSoundRef.current) {
      onSoundRef.current.volume = 0.6;
    }
    if (offSoundRef.current) {
      offSoundRef.current.volume = 0.6;
    }

    return () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.pause();
        hoverSoundRef.current = null;
      }
      if (onSoundRef.current) {
        onSoundRef.current.pause();
        onSoundRef.current = null;
      }
      if (offSoundRef.current) {
        offSoundRef.current.pause();
        offSoundRef.current = null;
      }
    };
  }, []);

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(() => {});
    }
  };

  const playOnSound = () => {
    if (onSoundRef.current) {
      onSoundRef.current.currentTime = 0;
      onSoundRef.current.play().catch(() => {});
    }
  };

  const playOffSound = () => {
    if (offSoundRef.current) {
      offSoundRef.current.currentTime = 0;
      offSoundRef.current.play().catch(() => {});
    }
  };

  return { playHoverSound, playOnSound, playOffSound };
};
