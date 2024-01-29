"use client";

import { Chapter as IChapter } from "@/services/fetchNovel";
import NovelNavigation from "./NovelNavigation";
import { useState } from "react";
import Chapter from "./Chapter";
import { SelectedTab } from "./types";
interface NovelOverviewProps {
  chapters: IChapter[];
  novelName: string;
}

export default function NovelOverview({
  chapters,
  novelName,
}: NovelOverviewProps) {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("chapters");
  return (
    <section className="w-full bg-zinc-950 p-3">
      <div className="w-4/5 m-auto">
        <NovelNavigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "chapters" && (
          <div className="flex flex-col gap-3 mt-5">
            {chapters.map((chapter, index) => (
              <Chapter key={index} chapter={chapter} novelName={novelName} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
