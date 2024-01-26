import { authOrRedirect } from "@/auth";
import { Metadata } from "next";
import { DashboardComponent } from "./component";
import { serverSideFetch } from "@/utils/appHandles";
import { IUser } from "@/models/user";
import { IWorkplace } from "@/models/workplace";
import { FormContainer } from "@/components/Layout/FormContainer";

export const metadata: Metadata = {
    title: "Edit your personal data",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await authOrRedirect();

    const user = await serverSideFetch<IUser>("/api/user", {
        userid: session?.userid,
    });

    const workplace = await serverSideFetch<IWorkplace>("/api/user/workplace", {
        userid: session?.userid,
    });

    return (
        <FormContainer>
            <DashboardComponent
                session={session}
                user={user}
                workplace={workplace}
            />
        </FormContainer>
    );
}
