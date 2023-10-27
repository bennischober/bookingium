import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAPIBaseUrl } from "./utils/apiHandler";
import type { NextAuthConfig } from "next-auth";

// ref: https://authjs.dev/guides/upgrade-to-v5?authentication-method=server-component#authenticating-server-side
export const config = {
    providers: [CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: { label: "Username", type: "email", placeholder: "username" },
            password: { label: "Password", type: "password", placeholder: "password" }
        },
        async authorize(credentials) {
            try {
                const fetchUri = getAPIBaseUrl() + "api/user/login";

                const res = await fetch(fetchUri, {
                    method: "post",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const user = await res.json();

                // status 200 => user exists
                if (res.status === 200) {
                    return {
                        id: user.user._id,
                        name: user.user.name,
                        email: user.user.email,
                        userid: user.user._id,
                        status: "authorized"
                    }
                }
                return {
                    id: user._id,
                    name: user.name,
                    username: user.email,
                    userid: user._id,
                    status: "unauthorized"
                };
            } catch (err) {
                return {
                    id: 0,
                    name: "",
                    email: "",
                    userid: "",
                    status: "unauthorized"
                };
            }
        },
    })],
    callbacks: {
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.id = user.id;
                token.status = user.status;
                token.userid = user.userid;
            }
            return token;
        },
        session: ({ session, token }: any) => {
            if (token) {
                session.id = token.id;
                session.status = token.status;
                session.userid = token.userid;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages: {
        signIn: "/auth/login",
        signOut: '/auth/signout',
    }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
