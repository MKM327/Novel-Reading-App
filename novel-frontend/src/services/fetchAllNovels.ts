import serverAPI from "@/lib/exports";
import { Novel } from "./fetchNovel";

export async function fetchAllNovels(): Promise<Novel[] | null> {
    const api = await serverAPI();
    const response = await api.get<Novel[]>("novels/");
    if (response.status === 200) {
        return response.data
    }
    return null
}