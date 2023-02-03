import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { BandForm } from "../../../components/Forms/BandForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { IBand } from "../../../models/band";
import { BandPageProps } from "../../../types";
import { addData, serverSideFetch } from "../../../utils/appHandles";

export default function AddBandPage({
    session,
    persons,
    companies,
}: BandPageProps) {
    const handleSave = async (data: IBand) => {
        const res = await addData("api/band", data, session.userid);
        console.log(res);
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
