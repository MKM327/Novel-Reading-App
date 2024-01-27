import { PUBLIC_API } from "@/lib/exports";
export interface Novel {
    id: number;
    title: string;
    description: string;
    pub_date: Date;
    likes: number,
    dislikes: number,
}
export interface Chapter {
    id: number;
    title: string;
    content: string;
    pub_date: string;
    read_count: number;
}
export async function fetchNovel(novel: string) {
    try {
        let response = await PUBLIC_API.get<Novel>(`novels/${novel}`)
        if (response.status !== 200) {
            throw new Error("Failed to fetch novel");
        }
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to fetch novel");
    }
}
export async function fetchChapters(novel: string) {
    try {
        let response = await PUBLIC_API.get<Chapter[]>(`novels/${novel}/chapters`)
        if (response.status !== 200) {
            throw new Error("Failed to fetch chapters");
        }
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to fetch chapters");
    }
}