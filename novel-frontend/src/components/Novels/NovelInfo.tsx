import { Novel } from "@/services/fetchNovel";
import Image from "next/image";
interface NovelInfoProps {
  novel: Novel;
}
export default function NovelInfo({ novel }: NovelInfoProps) {
  const { title, description, likes, dislikes } = novel;
  return (
    <section className="flex gap-5 bg-gray-950 p-5">
      <div className="flex justify-center w-full gap-5">
        <div>
          <Image
            src={
              "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={400}
            height={500}
            alt="test"
            priority
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 text-5xl">
            <h1>{title}</h1>
          </div>
          <div className="flex gap-5">
            <span>likes {likes}</span>
            <span>dislikes {dislikes}</span>
          </div>
          <p className="text-xs">{description}</p>
          <div>
            <button className="bg-blue-700 p-3 rounded-lg font-bold">
              CONTINUE READING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
