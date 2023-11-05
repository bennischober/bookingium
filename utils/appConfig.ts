export const getAppName = (): string => {
    if (typeof window !== "undefined") {
        return process.env.NEXT_PUBLIC_APP_NAME ?? "";
    }
    return process.env.APP_NAME ?? "";
}
