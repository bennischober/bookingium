"use server";

import { signIn } from "@/auth";
import { signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export const serverLogout = async () => {
    await signOut({
        redirectTo: "/auth/login",
    });
};

export const serverLogin = async (email: string, password: string) => {
    try {
        await signIn("credentials", {
            username: email,
            password: password,
            redirectTo: "/",
        });
        return true;
    } catch (error) {
        // currently, this always throws an error, because next cannot redirect,
        // but next-auth can redirect.  thus, if a redirect error is thrown,
        // we can redirect to the home page
        if (isRedirectError(error)) {
            redirect("/");
        }
        // otherwise an AccessDenied error is thrown by next-auth
        // here, we can handle the error
        return false;
    }
};
