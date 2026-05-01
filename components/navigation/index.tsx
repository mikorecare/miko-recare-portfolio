"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavigationHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show on medieval-village page? Or keep it?
  if (pathname === "/medieval-village") return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-2 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-center items-center gap-4 md:gap-6 flex-wrap">
        <Link
          href="/"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="/buttons/enter-the-keep.png"
            alt="Enter the Keep"
            width={140}
            height={60}
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        <Link
          href="/quests"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="/buttons/view-quest.png"
            alt="View Quests"
            width={140}
            height={60}
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* TODO*/}
        {/* <Link
          href="/medieval-village"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="/buttons/explore-the-village.png"
            alt="Explore the Village"
            width={160}
            height={60}
            className="h-8 md:h-10 w-auto"
          />
        </Link> */}
      </div>
    </nav>
  );
}