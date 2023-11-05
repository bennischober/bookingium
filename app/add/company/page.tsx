import { auth } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { IPerson } from "@/models/person";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import CompanyComponent from "./component";

export const metadata: Metadata = {
    title: "Create a new Company",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await auth();
    if (!session) return null;

    const persons = await serverSideFetch<IPerson[]>("/api/person", {
        userid: session.userid,
    });

    return (
        <FormContainer>
            <CompanyComponent session={session} persons={persons} />
        </FormContainer>
    );
}
