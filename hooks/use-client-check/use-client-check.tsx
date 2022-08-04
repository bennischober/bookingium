
/**
 * This hook checks, if the code is running in a client-side environment or on server-side.
 * @returns {boolean} true, if code is executed on client
 */
export function useClientCheck() : boolean {
    return typeof window !== "undefined";
}