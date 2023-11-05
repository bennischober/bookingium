import { auth } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import BandComponent from "./component";

export const metadata: Metadata = {
    title: "Create a new Band",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await auth();
    if (!session) return null;

    const persons = await serverSideFetch<IPerson[]>("/api/person", {
        userid: session.userid,
    });

    const companies = await serverSideFetch<ICompany[]>("/api/company", {
        userid: session.userid,
    });

    return (
        <FormContainer>
            <BandComponent
                session={session}
                persons={persons}
                companies={companies}
            />
        </FormContainer>
    );
}
