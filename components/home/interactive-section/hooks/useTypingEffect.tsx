import { useState, useRef, useEffect } from "react";

export const useTypingEffect = () => {
  const [typingText, setTypingText] = useState<{ [key: string]: string }>({});
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});
  const typingTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    typingSoundRef.current = new Audio("/home/mp3/typing.mp3");
    if (typingSoundRef.current) {
      typingSoundRef.current.volume = 0.3;
      typingSoundRef.current.loop = true;
    }
    return () => {
      if (typingSoundRef.current) {
        typingSoundRef.current.pause();
        typingSoundRef.current = null;
      }
    };
  }, []);

  const startTyping = (id: string, fullText: string) => {
    if (typingTimeouts.current[id]) clearTimeout(typingTimeouts.current[id]);

    if (typingSoundRef.current) {
      typingSoundRef.current.currentTime = 0;
      typingSoundRef.current.play().catch(() => {});
    }

    setIsTyping((prev) => ({ ...prev, [id]: true }));
    setTypingText((prev) => ({ ...prev, [id]: "" }));

    let index = 0;
    const typeChar = () => {
      if (index < fullText.length) {
        setTypingText((prev) => ({
          ...prev,
          [id]: fullText.slice(0, index + 1),
        }));
        index++;
        typingTimeouts.current[id] = setTimeout(typeChar, 50);
      } else {
        setIsTyping((prev) => ({ ...prev, [id]: false }));
        if (typingSoundRef.current) {
          typingSoundRef.current.pause();
          typingSoundRef.current.currentTime = 0;
        }
      }
    };
    typeChar();
  };

  const stopTyping = (id: string) => {
    if (typingTimeouts.current[id]) clearTimeout(typingTimeouts.current[id]);
    setIsTyping((prev) => ({ ...prev, [id]: false }));
    setTypingText((prev) => ({ ...prev, [id]: "" }));
    if (typingSoundRef.current) {
      typingSoundRef.current.pause();
      typingSoundRef.current.currentTime = 0;
    }
  };

  return { typingText, isTyping, startTyping, stopTyping };
};
