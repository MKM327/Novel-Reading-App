import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { PUBLIC_API } from "@/lib/exports"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { get } from "http"
interface jwtCallback {
    token: JWT
    user: any
    account: any
    trigger?: "signIn" | "signUp" | "update" | undefined

}
export const config = {
    secret: process.env.NEXAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const response = await PUBLIC_API.post("auth/login/", credentials);
                    if (response.status === 200) {
                        return response.data
                    }
                }
                catch (error) {
                    // console.log(error)
                }
                return null
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 5 * 60,
        updateAge: 5 * 60
    },
    callbacks: {
        async jwt({ token, user, account, trigger }: jwtCallback) {
            if (user && account) {
                return {
                    ...user,
                    accessTokenExpires: Date.now() + 60 * 5 * 1000,
                }
            }
            return token;
            // if (Date.now() < token.accessTokenExpires) {
            //     return token
            // }
            // return getWithRefreshToken(token);
        },
        async session({ session, token, user }) {
            if (token) {
                session.user = token.user
                session.access = token.access
                session.refresh = token.refresh
                session.error = token.error
            }
            return session
        },
    },

} satisfies NextAuthOptions

async function getWithRefreshToken(token: JWT) {
    try {
        const response = await PUBLIC_API.post<{ access: string }>("auth/token/refresh/",
            { refresh: token.refresh })
        if (response.status === 200) {
            const data = {
                ...token,
                access: response.data.access,
                accessTokenExpires: Date.now() + 60 * 5 * 1000,
            }
            return data
        }
    }
    catch (error) {
        console.log(error)
    }
    return {
        ...token,
        error: "RefreshTokenError"
    }
}
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, config)
}