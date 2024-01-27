import { getServerSession } from "next-auth";
import { auth } from "../api/auth/[...nextauth]/auth";
import { fetchAllNovels } from "@/services/fetchAllNovels";

export default async function Page() {
  const novels = await fetchAllNovels();
  console.log(novels);
  return novels?.map((novel) => <div key={novel.id}>{novel.title}</div>);
}
