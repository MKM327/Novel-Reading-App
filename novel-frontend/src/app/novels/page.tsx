import { getServerSession } from "next-auth";
import { auth } from "../api/auth/[...nextauth]/auth";
import { fetchAllNovels } from "@/services/fetchAllNovels";
import NovelCard from "@/components/Novels/NovelCard";

export default async function Page() {
  const novels = await fetchAllNovels();
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-5">
      {novels?.map((novel) => {
        return <NovelCard novel={novel} key={novel.id} />;
      })}
    </div>
  );
}
