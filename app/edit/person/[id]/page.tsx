import { authOrRedirect } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { IPerson } from "@/models/person";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import SpecificPersonComponent from "./component";

export const metadata: Metadata = {
    title: "Update Person data",
};

export default async function Page({ params }: { params: { id: string } }) {
    const session = await authOrRedirect();

    const person = await serverSideFetch<IPerson>(`/api/person/${params.id}`, {
        userid: session.userid,
    });

    return (
        <FormContainer>
            <SpecificPersonComponent session={session} person={person} />
        </FormContainer>
    );
}
