import { config } from "@/app/api/auth/[...nextauth]/auth";
import axios from "axios";
import { getServerSession } from "next-auth";

export const PUBLIC_API = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
})
export default async function serverAPI() {
    const session = await getServerSession(config);
    return axios.create({
        baseURL: "http://localhost:8000/api/v1/",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + session?.access,
        }
    });
}