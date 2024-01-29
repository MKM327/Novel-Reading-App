import { Novel } from "@/services/fetchNovel";
import Image from "next/image";

interface NovelCardProps {
  novel: Novel;
}
export default function NovelCard({ novel }: NovelCardProps) {
  return (
    <div className="flex gap-2">
      <div className="relative h-full w-2/5">
        <Image
          src={
            "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          layout="fill"
          alt="Image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="max-h-48 text-ellipsis overflow-hidden flex-1">
        <h1 className="text-xl">{novel.title}</h1>
        <p className="text-sm">{novel.description}</p>
      </div>
    </div>
  );
}
