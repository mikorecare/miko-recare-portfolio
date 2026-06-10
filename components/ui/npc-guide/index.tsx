"use client";

import { useEffect, useState } from "react";
import TalkingCharacter from "../talking-character";

const NPC_MESSAGES = [
  "Hi! Hover on the objects in the picture!",
  "Did you know? This room is interactive.",
  "Try clicking glowing zones to explore.",
  "Some objects react when you hover them...",
  "You can toggle music on/off by clicking the radio!",
  "If you prefer the night ambience, just hit the light switch"
];

export default function NPCGuide() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        let next = Math.floor(Math.random() * NPC_MESSAGES.length);

        if (next === prev) {
          next = (next + 1) % NPC_MESSAGES.length;
        }

        return next;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TalkingCharacter
      message={NPC_MESSAGES[messageIndex]}
      animationSet="open-arms"
    />
  );
}
