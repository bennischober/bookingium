import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { BandForm } from "../../../components/Forms/BandForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { IBand } from "../../../models/band";
import { BandPageProps } from "../../../types";
import {
    serverSideFetch,
    toAutocomplete,
    toCombinedAutocomplete,
} from "../../../utils/appHandles";

export default function AddBandPage({
    session,
    persons,
    companies,
}: BandPageProps) {
    const handleSave = async (data: IBand) => {
        // post band data
        const ret = await axios.post(
            "/api/band",
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);
    };

    const personAC = toCombinedAutocomplete(
        persons,
        ["firstName", "lastName"],
        " "
    );
    const companyAC = toAutocomplete(companies, "name");

    return (
        <PageTemplate title={"Add a Band"}>
            <FormContainer>
                <BandForm
                    session={session}
                    handleData={handleSave}
                    persons={personAC}
                    companies={companyAC}
                />
            </FormContainer>
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });

    const persons = await serverSideFetch("/api/person", {
        userid: session?.userid,
    });
    const companies = await serverSideFetch("/api/company", {
        userid: session?.userid,
    });

    return {
        props: {
            session,
            persons,
            companies,
        },
    };
};
