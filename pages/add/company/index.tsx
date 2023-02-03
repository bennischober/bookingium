import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { CompanyForm } from "../../../components/Forms/CompanyForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { ICompany } from "../../../models/company";
import { CompanyPageProps } from "../../../types";
import { serverSideFetch } from "../../../utils/appHandles";

export default function AddCompanyPage({ session, persons }: CompanyPageProps) {
    const handleSave = async (data: ICompany) => {
        const ret = await axios.post(
            "/api/company",
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);
    };

    return (
        <PageTemplate title={"Add a Copany"}>
            <FormContainer>
                <CompanyForm
                    session={session}
                    handleData={handleSave}
                    persons={persons}
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

    return {
        props: {
            session,
            persons,
        },
    };
};
