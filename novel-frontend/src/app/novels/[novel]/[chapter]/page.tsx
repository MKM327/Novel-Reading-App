import { PUBLIC_API, serverAPI } from "@/lib/exports";
import axios from "axios";

export default async function Page({ params }) {
  const { data } = await PUBLIC_API.get(
    `/novels/${params.novel}/${params.chapter}`
  );
  return (
    <div>
      <h1 className="text-2xl">{data.title}</h1>
      <h1>{data.content}</h1>
    </div>
  );
}
