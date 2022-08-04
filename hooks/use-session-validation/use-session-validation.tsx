import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import { SessionProps } from "../../types";
import { useClientCheck } from "../use-client-check/use-client-check";

/**
 * This hook handles the session validation. If the session is invalid (user is not logged in), it redirects to the login page.
 * @param session Next-Auth session (optional)
 * @param router Next-Router (optional)
 * @param toPath Next-Router pathname (optional; fallback is "/auth/login")
 * @param query Next-Router query (optional)
 */
export function useSessionValidation(
    session?: SessionProps["session"],
    router?: NextRouter,
    toPath?: string,
    query?: { [key: string]: string }
) {
    // break, if not on client!
    if(!useClientCheck()) return;

    const r = router ?? useRouter();
    const p = toPath ?? "/auth/login";

    // session is given as parameter
    if (session && session.status === "unathorized") {
        r.push({
            pathname: p,
            query,
        });
        return;
    }

    // session not given as parameter
    const { data: data, status } = useSession();
    // only use status/data?.session !
    if (status === "unauthenticated" || data?.session === "unathorized") {
        r.push({
            pathname: p,
            query,
        });
        return;
    }
}
