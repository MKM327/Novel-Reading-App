import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
interface User {
    id: number,
    username: string,
}
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User,
        access: string,
        refresh: string,
        error?: string,
        access
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessTokenExpires: number
        user: User,
        access: string,
        refresh: string,
        error?: string,
    }
}