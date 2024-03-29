import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { BandForm } from "../../../components/Forms/BandForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { IBand } from "../../../models/band";
import { ICompany } from "../../../models/company";
import { IPerson } from "../../../models/person";
import { BandPageProps } from "../../../types";
import { addData, serverSideFetch } from "../../../utils/appHandles";

export default function AddBandPage({
    session,
    persons,
    companies,
}: BandPageProps) {
    const handleSave = async (data: IBand) => {
        const res = await axios.post(
            "/api/band",
            { data: data },
            { params: { userid: session.userid } }
        );

        console.log(res.data, res.status);
    };

    return (
        <PageTemplate title={"Add a Band"}>
            <FormContainer>
                <BandForm
                    session={session}
                    handleData={handleSave}
                    persons={persons}
                    companies={companies}
                />
            </FormContainer>
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });

    const persons = await serverSideFetch<IPerson>("/api/person", {
        userid: session?.userid,
    });
    const companies = await serverSideFetch<ICompany>("/api/company", {
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
