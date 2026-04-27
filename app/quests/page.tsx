"use client";

import dynamic from "next/dynamic";
import MedievalSidebar from "./medieval-sidebar";

const DungeonExplorer = dynamic(() => import("@/components/quests/"), {
  ssr: false,
});

export default function QuestsPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Game Area - 80% width */}
      <div className="absolute inset-0 w-[80%]">
        <DungeonExplorer />
      </div>

      {/* Medieval Sidebar */}
      <MedievalSidebar />
    </div>
  );
}
