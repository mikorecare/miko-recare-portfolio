"use client";

import dynamic from "next/dynamic";

const DungeonExplorer = dynamic(() => import("@/components/quests/"), {
  ssr: false,
});

export default function QuestsPage() {
  return <DungeonExplorer />;
}