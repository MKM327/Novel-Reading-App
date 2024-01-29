import serverAPI, { PUBLIC_API } from "@/lib/exports";
import { Novel } from "./fetchNovel";

export async function fetchAllNovels(): Promise<Novel[] | null> {
    const response = await PUBLIC_API.get<Novel[]>("novels/");
    if (response.status === 200) {
        return response.data
    }
    return null
}