import { auth } from "@/auth";
import { getAppName } from "@/utils/appConfig";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import RegisterPageComponent from "./component";

export const metadata: Metadata = {
    title: "Register | " + getAppName(),
};

export default async function Page() {
    const session = await auth();
    if (session) {
        redirect("/user/dashboard");
    }

    return <RegisterPageComponent />;
}
