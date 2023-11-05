import { auth } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import VenueComponent from "./component";

export const metadata: Metadata = {
    title: "Create a new Person",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const sesssion = await auth();
    if (!sesssion) return null;

    const persons = await serverSideFetch<IPerson[]>("/api/person", {
        userid: sesssion.userid,
    });

    const companies = await serverSideFetch<ICompany[]>("/api/company", {
        userid: sesssion.userid,
    });

    return (
        <FormContainer>
            <VenueComponent
                session={sesssion}
                persons={persons}
                companies={companies}
            />
        </FormContainer>
    );
}
