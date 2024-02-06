import { Novel } from "@/services/fetchNovel";
import Image from "next/image";
import Link from "next/link";

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
      <div className="max-h-48  flex-1">
        <Link href={`/novels/${novel.title}`} className="text-xl">
          {novel.title}
        </Link>
        <div className="text-sm line-clamp-3">
          <span className="text-xs">{novel.description}</span>
        </div>
        <div className="flex gap-3">
          <div className="text-sm bg-zinc-900 p-1 rounded-md flex-wrap">
            Genre one{" "}
          </div>
          <div className="text-sm bg-zinc-900 p-1 rounded-md flex-wrap">
            Genra two
          </div>
        </div>
      </div>
    </div>
  );
}
