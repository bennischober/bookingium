import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import { SessionProps } from "../../types";
import { useClientCheck } from "../use-client-check/use-client-check";

// session validation cache
const SVC = {
    session: null,
    status: "unauthorized",
    runs: 0,
};

const SVC_CONFIG = {
    // think of a better solution than max_runs!
    max_runs: 10,
};

/**
 * This hook handles the session validation. If the session is invalid (user is not logged in), it redirects to the login page.
 * @param session Next-Auth session (optional)
 * @param router Next-Router (optional)
 * @param toPath Next-Router pathname (optional; fallback is "/auth/login")
 * @param query Next-Router query (optional)
 */
export function useCachedSessionValidation(
    session?: SessionProps["session"],
    router?: NextRouter,
    toPath?: string,
    query?: { [key: string]: string }
) {
    // break, if not on client!
    // move break before useSession()?
    // this could also be used as a server-side validation function?!
    if (!useClientCheck()) return;

    // if cached data exists, dont validate session.
    // only revalidate after a specific amount of runs
    handleValidationCached();

    const r = router ?? useRouter();
    const p = toPath ?? "/auth/login";

    // set cache
    if(session) setCache(session, session.status);

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

    // set cache for client side authentication 
    setCache(data, status);

    // only use status/data?.session !
    if (status === "unauthenticated" || data?.status === "unauthenticated") {
        r.push({
            pathname: p,
            query,
        });
        return;
    }
}

// passes the validation, if the cache is valid
const handleValidationCached = () => {
    // if runs reached MAX_RUNS, revalidate and return false
    if (SVC.runs >= SVC_CONFIG.max_runs) revalidate();

    if (SVC.status === "authenticated" || SVC.status === "authorized") {
        SVC.runs++;
        console.log("serving cached data", SVC);
        return true;
    }
    return false;
};

// sets the cache data
const setCache = (data: any, status: string, runs?: number) => {
    SVC.session = data;
    SVC.status = status;
    SVC.runs = runs ?? SVC.runs;
}

// resets cache
const revalidate = () => {
    setCache(null, "unauthorized", 0);
    console.log("revalidate cache", SVC);
    return false;
};
