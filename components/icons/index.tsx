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

  scroll: "/icons/scroll.png",
  crown: "/icons/crown.png",
  flask: "/icons/flask.png", 
  crystal: "/icons/crystal.png",
  book: "/icons/book.png",
  sword: "/icons/sword.png",
  bow: "/icons/bow.png",
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
