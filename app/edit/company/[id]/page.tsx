import { authOrRedirect } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import SpecificCompanyComponent from "./component";

export const metadata: Metadata = {
    title: "Update Company data",
};

export default async function Page({ params }: { params: { id: string } }) {
    const session = await authOrRedirect();

    const company = await serverSideFetch<ICompany>(
        `/api/company/${params.id}`,
        {
            userid: session.userid,
        }
    );

    const persons = await serverSideFetch<IPerson[]>("/api/person", {
        userid: session.userid,
    });

    return (
        <FormContainer>
            <SpecificCompanyComponent
                session={session}
                company={company}
                persons={persons}
            />
        </FormContainer>
    );
}
