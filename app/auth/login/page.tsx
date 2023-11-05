import { Metadata } from "next";
import LoginPageComponent from "./component";
import { getAppName } from "@/utils/appConfig";

export const metadata: Metadata = {
    title: "Login | " + getAppName(),
    description: "Login to your account",
};

export default function LoginPage() {
    return (
        <>
            <LoginPageComponent />
        </>
    );
}
