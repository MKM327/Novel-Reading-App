import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { API } from "@/lib/exports"
import CredentialsProvider from "next-auth/providers/credentials"

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
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
                    const response = await API.post("auth/login/", credentials);
                    if (response.status === 200) {
                        return response.data
                    }
                }
                catch (error) {
                    console.log(error)
                }
                return null
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user, profile }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token, user }) {
            session = token.user
            return session
        },
    }
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, config)
}