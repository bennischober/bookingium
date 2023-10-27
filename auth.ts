import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ref: https://authjs.dev/guides/upgrade-to-v5?authentication-method=server-component#authenticating-server-side
export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [CredentialsProvider]
});
