"use client";

import Image from "next/image";

interface IconProps {
  name: keyof typeof iconPaths;
  className?: string;
}

const iconPaths = {
  "cross-swords": "/icons/cross-swords.png",
  castle: "/icons/castle.png",
  blacksmith: "/icons/blacksmith.png",
  "heraldic-crest": "/icons/heraldic-crest.png",
  map: "/icons/map.png",
  shield: "/icons/shield.png",
  quill: "/icons/quill.png",
  tower: "/icons/tower.png",
  helmet: "/icons/helmet.png",
  compass: "/icons/compass.png",
  axe: "/icons/axe.png",

  scroll: "/icons/scroll.png", // For experience, storytelling, codex
  crown: "/icons/crown.png", // For leadership, achievements
  flask: "/icons/flask.png", // For alchemy, experimentation (Alchemist character)
  crystal: "/icons/crystal.png", // For magic, wizardry (Wizard character)
  book: "/icons/book.png", // For learning, documentation, tutorials
  sword: "/icons/sword.png", // For combat, competition, challenges
  bow: "/icons/bow.png", // For precision, archery (Archer character)
};

export default function Icon({ name, className = "" }: IconProps) {
  return (
    <Image
      src={iconPaths[name]}
      alt={name.replace(/-/g, " ")}
      width={20}
      height={20}
      className={`object-contain ${className}`}
    />
  );
}
