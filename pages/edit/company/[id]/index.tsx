import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { CompanyForm } from "../../../../components/Forms/CompanyForm";
import { FormContainer } from "../../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../../components/Layout/PageTemplate";
import { ICompany } from "../../../../models/company";
import { CompanyEditPageProps } from "../../../../types";
import { serverSideFetch } from "../../../../utils/appHandles";

export default function EditCompanyPage({
    session,
    company,
}: CompanyEditPageProps) {
    const handleSave = async (data: ICompany) => {
        const ret = await axios.put(
            `/api/company/${company.companyid}`,
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);

        // add refetch? or is this useless?
        // => change data, refetch and set state => rerender component
        // => to have real db data and not form data
    };

    return (
        <PageTemplate title={"Edit a Company"}>
            <FormContainer>
                <CompanyForm
                    session={session}
                    handleData={handleSave}
                    data={company}
                />
            </FormContainer>
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
    const id = ctx.query.id;

    const company = await serverSideFetch(`/api/company/${id}`, {
        userid: session?.userid,
    });

    return {
        props: {
            session,
            company,
        },
    };
};
