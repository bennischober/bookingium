import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { VenueForm } from "../../../components/Forms/VenueForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { IVenue } from "../../../models/venue";
import { BandPageProps, SearchableIdProxyData } from "../../../types";
import { serverSideFetch } from "../../../utils/appHandles";

export default function AddVenuePage({
    session,
    companies,
    persons,
}: BandPageProps) {
    const handleSave = async (data: IVenue) => {
        const ret = await axios.post(
            "/api/venue",
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);
    };

    const companiesAutoComplete: SearchableIdProxyData[] = companies?.map(
        (c) => ({
            display: c.name,
            value: c._id,
        })
    );

    return (
        <PageTemplate title={"Add a Venue"}>
            <FormContainer>
                <VenueForm
                    session={session}
                    handleData={handleSave}
                    companies={companiesAutoComplete}
                    persons={persons}
                />
            </FormContainer>
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });

    const companies = await serverSideFetch("/api/company", {
        userid: session?.userid,
    });

    const persons = await serverSideFetch("/api/person", {
        userid: session?.userid,
    });

    return {
        props: {
            session,
            companies,
            persons,
        },
    };
};
