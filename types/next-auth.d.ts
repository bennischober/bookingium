import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context.
     * 
     * Added the following to the session:
     * 
     * session.id = token.id;
     * session.status = token.status;
     * session.userid = token.userid;
     */
    interface Session {
        id: string;
        status: string;
        userid: string;
        user: {
        } & DefaultSession["user"]
    }
}