"use server";

import { signIn } from "@/auth";
import { signOut } from "@/auth";

export const serverLogout = async () => {
    const result = await signOut({
        redirectTo: "/auth/login",
    });

    return result;
}

export const serverLogin = async (email: string, password: string) => {
    const result = await signIn("credentials", {
        username: email,
        password: password,
        redirectTo: "/",
    });

    return result;
}
