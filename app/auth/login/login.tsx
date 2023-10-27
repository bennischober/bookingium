"use server";

import { signIn } from "../../../auth";

export const serverLogin = async (email: string, password: string) => {
    const result = await signIn("credentials", {
        username: email,
        password: password,
        redirectTo: "/",
    });

    console.log(result);

    return result;
}
