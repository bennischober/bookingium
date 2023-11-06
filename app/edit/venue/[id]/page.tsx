import { authOrRedirect } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { IVenue } from "@/models/venue";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Update Venue data",
};

export default async function Page({ params }: { params: { id: string } }) {
    const session = await authOrRedirect();

    const venue = await serverSideFetch<IVenue>(`/api/venue/${params.id}`, {
        userid: session.userid,
    });

    const companies = await serverSideFetch<ICompany[]>("/api/company", {
        userid: session.userid,
    });

    const persons = await serverSideFetch<IPerson[]>("/api/person", {
        userid: session.userid,
    });

    return(
        <FormContainer>

        </FormContainer>
    );
}