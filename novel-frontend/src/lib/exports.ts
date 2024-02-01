import { config } from "@/app/api/auth/[...nextauth]/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
export const BASE_URL = "http://localhost:8000/api/v1/";
export const PUBLIC_API = axios.create({
    baseURL: BASE_URL,
})
export async function serverAPI() {
    const session = await getServerSession(config);
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + session?.access,
        }
    });
}
export function useGetClientAPI() {
    const session = useSession();
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + session?.data?.access,
        }
    });
}