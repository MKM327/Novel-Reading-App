import NovelInfo from "@/components/Novels/NovelInfo";
import NovelOverview from "@/components/Novels/NovelOverview";
import { fetchNovel, fetchChapters } from "@/services/fetchNovel";
interface NovelPageProps {
  params: {
    novel: string;
  };
}
export default async function Page({ params }: NovelPageProps) {
  const { novel } = params;
  let novelData = await fetchNovel(novel);
  let chapters = await fetchChapters(novel);
  return (
    <main className="bg-black h-full">
      <NovelInfo novel={novelData} />
      <NovelOverview chapters={chapters} novelName={novel} />
    </main>
  );
}
