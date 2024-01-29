import { useState } from "react";
import { SelectedTab } from "./types";
interface NovelNavigationProps {
  selectedTab: string;
  setSelectedTab: (tab: SelectedTab) => void;
}
export default function NovelNavigation({
  selectedTab,
  setSelectedTab,
}: NovelNavigationProps) {
  const underlineClasses =
    "after:h-1 after:bottom-0 after:left-0 after:w-full after:bg-blue-600 after:absolute ";
  return (
    <ul className="flex gap-5 text-2xl">
      <li
        className={`relative p-2
         ${selectedTab === "chapters" && underlineClasses}`}
      >
        <button onClick={() => setSelectedTab("chapters")}>Chapters</button>
      </li>
      <li
        onClick={() => setSelectedTab("about")}
        className={`relative p-2 
        ${selectedTab === "about" && underlineClasses}`}
      >
        <button>About</button>
      </li>
    </ul>
  );
}
