import { Chapter } from "@/services/fetchNovel";
import Link from "next/link";
interface ChapterProps {
  chapter: Chapter;
  novelName: string;
}
export default function Chapter({ chapter, novelName }: ChapterProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <span className="text-xl">{chapter.title}</span>
        <span className="text-gray-400">{chapter.pub_date}</span>
      </div>
      <div className="flex gap-2">
        <Link
          className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center justify-center"
          href={`/novels/${novelName}/${chapter.title}`}
        >
          Read
        </Link>
      </div>
    </div>
  );
}
