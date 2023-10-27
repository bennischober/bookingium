// authChecker.ts
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from "next-auth/react";

export const withAuth = (getServerSidePropsFunc?: GetServerSideProps) => {
    return async (ctx: GetServerSidePropsContext) => {
        const session = await getSession({ req: ctx.req });

        // If no session found, redirect to login
        if (!session) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        // If a getServerSidePropsFunc function was passed then run it and return its result
        if (getServerSidePropsFunc) {
            return getServerSidePropsFunc(ctx);
        }

        // Else return the session in props
        return {
            props: { session }
        }
    }
};
